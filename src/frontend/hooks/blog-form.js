import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useBlogInfo from '../hooks/blogs';
import api from '../api';

const useBlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [currentImageURL, setCurrentImageURL] = useState('');
  const [uploadedImageURL, setUploadedImageURL] = useState('');
  const [closed, setClosed] = useState(false);
  const [visibility, setVisibility] = useState('Public');
  const [category, setCategory] = useState('');
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const params = useParams();
  const { blogInfo } = useBlogInfo();

  useEffect(() => {
    if (blogInfo.posts?.length > 0) {
      (async () => {
        try {
          if (params.blogId) {
            const blogId = parseInt(params.blogId, 10);
            const blogToEdit = blogInfo.posts.find((blog) => blog.id === blogId); 
            if (blogToEdit) {
              setBlogTitle(blogToEdit.title); 
              setAuthor(blogToEdit.author);
              setSummary(blogToEdit.summary);
              setDate(blogToEdit.date);
              setContent(blogToEdit.content);
              setLink(blogToEdit.link);
              setCurrentImageURL(blogToEdit.image); // direct link to google storage
              setClosed(blogToEdit.closed);
              setVisibility(blogToEdit.visibility);
              setCategory(blogToEdit.category);
            }
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [blogInfo, params, setBlogTitle, setAuthor, setSummary, setDate, setContent, setLink, 
      setCurrentImageURL, setClosed, setVisibility, setCategory]);

  const imageUpload = useCallback(
    (imageUpload) => {
      setUploadedImageURL(imageUpload);
      setCurrentImageURL('');
    },
    [setUploadedImageURL],
  );

  const imageDelete = () => {
    setUploadedImageURL('');
    setCurrentImageURL('');
  } 

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeForm = useCallback(() => {
    history.push('/blog-posts');
  }, [history]);

  const allFieldsAreFilled = () => {
    let tmpErrors = []

    // define errors that will be sent to the user
    if (blogTitle === "") { tmpErrors.push("title cannot be blank") }
    if (author === "") { tmpErrors.push("author cannot be blank") }
    if (summary === "") { tmpErrors.push("summary cannot be blank") }
    else if (summary.length > 200){
      tmpErrors.push(`Summary must be between 1-200 characters, currently: ${summary.length}`)
    }
    if (link === "") { tmpErrors.push("link cannot be blank") }
    if (date === "") { tmpErrors.push("date cannot be blank") }
    if (category === "") {  tmpErrors.push("category cannot be blank") }

    if (currentImageURL === '' && uploadedImageURL === '') {
          tmpErrors.push( "One image is required")
        }

    const pattern = /^(([0-9])|([0-2][0-9])|([3][0-1]))-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;
    if (!pattern.test(date)){
      tmpErrors.push("date must be in day-month-year form (Ensure month starts with a capital)")
    }

    setErrors(tmpErrors);

    if (tmpErrors.length === 0) {
      return true; // checks passed
    }
    return false // checks failed
  }

  // Begin submitting form
  const saveForm = useCallback(async () => {
    // TODO: Still need to validate whether someone uploaded a file that already exists in google storage
    if(!allFieldsAreFilled()) return;

    try {
      let imageToUpload = "";
      if (uploadedImageURL !== '') {
        // Send new image to google storage
        const file = uploadedImageURL;

        const data = new FormData();
        data.append('files', file, file.name);

        const res = await api.formUpload(data);

        const imageUrls = res.data.data;
        if (imageUrls.length === 0) {
          throw new Error('Failed to upload image.');
        }
        imageToUpload = res.data.data[0];
      } else {
        imageToUpload = currentImageURL;
      }

      const blogData = {
        title: blogTitle,
        author,
        summary,
        date,
        content,
        link,
        closed,
        visibility,
        category,
        image: imageToUpload
      };

      // Send to DB
      if (allFieldsAreFilled()) {
        if (params.blogId) {
          // update an EXISTING blog (by id) with the new blogData we just defined
          const res = await api.blogs.editBlog(params.blogId, blogData);
          const data = await res.data
          console.log("Tried to edit blog, status: " , data)
        } else {
          // add a NEW blog (no id) with the new blogData we just defined
          const res = await api.blogs.addBlog(blogData);
          console.log("Tried to add a new blog, status: " , res.data)
        }
      }

      // onSuccess:
      closeForm();
    } catch (e) {
      console.log("could not edit / add blog")
      console.error(e);
      setErrors(["Upload Failed; Please Refresh And Try Again."]);
    }
  }, [ params, blogTitle, summary, date, content, closeForm, author, link, closed, visibility, category, uploadedImageURL, currentImageURL ]);

  const deleteForm = useCallback(async () => {
    if (params.blogId) {
      await api.blogs.deleteBlog(params.blogId);
    }
    closeForm();
  }, [params.blogId, closeForm]);

  return {
    blogTitle, setBlogTitle,
    author, setAuthor,
    summary, setSummary,
    date, setDate,
    content, setContent,
    link, setLink,
    uploadedImageURL,
    currentImageURL,
    closed, setClosed,
    visibility, setVisibility,
    category, setCategory,
    imagesToDelete, setImagesToDelete,
    errors,
    imageUpload,
    imageDelete,
    closeForm,
    saveForm,
    deleteForm,
    showModal,
    openModal,
    closeModal,
  };
};

export default useBlogForm;
