import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useGeeseInfo from '../hooks/geese-info';
import api from '../api';
import moment from 'moment';

const useGooseForm = () => {
  const [gooseName, setGooseName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const params = useParams();
  const { geeseInfo } = useGeeseInfo();

  useEffect(() => {
    if (geeseInfo.length > 0) {
      (async () => {
        try {
          if (params.gooseId) {
            const gooseId = parseInt(params.gooseId, 10);
            const gooseInfo = geeseInfo.find((goose) => goose.id === gooseId);
            if (gooseInfo) {
              setGooseName(gooseInfo.name);
              setDescription(gooseInfo.description);
              const response = await api.geeseInfo.getGeeseImages(gooseId);
              setImageUrls(response.data);
            }
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [setGooseName, setDescription, setImageUrls, params, geeseInfo]);

  const imageUpload = useCallback(
    (image) => {
      // can't upload same image twice
      setImages((prevImages) => [...prevImages, image]);
    },
    [setImages],
  );

  const imageDelete = useCallback(
    (imageIndex) => {
      setImages((prevImages) =>
        prevImages.filter((_prevImage, index) => {
          return index !== imageIndex;
        }),
      );
    },
    [setImages],
  );

  const imageUrlDelete = useCallback(
    (imageIndex) => {
      setImagesToDelete((images) => [...images, imageUrls[imageIndex].id]);
      setImageUrls((prevImages) =>
        prevImages.filter((_prevImage, index) => {
          return index !== imageIndex;
        }),
      );
    },
    [setImagesToDelete, setImageUrls, imageUrls],
  );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeForm = useCallback(() => {
    history.push('/geese');
  }, [history]);

  const saveForm = useCallback(async () => {

    try {
      // image files added 
      const newlyAddedImages = images;
  
      // all image files uploaded 
      let newlyAddedImageUrls = [];
      
      if (newlyAddedImages.length > 0) {
        
          // when no new files are added
        //  if (newlyAddedImages.length <= 0){
        //   const imgArr = imageUrls.map((url) => url.imgDir)
        //   imageUrls2 = imgArr
        //   // console.log(imageUrls)
        //   console.log(imageUrls2)
        //   setImageUrls(imageUrls)
        //  }
         
        const data = new FormData();

        newlyAddedImages.forEach((file) => {
          data.append('files', file, file.name);
        });

        const res = await api.formUpload(data);

        // array of added image urls
        newlyAddedImageUrls = res.data.data;
      

        if (newlyAddedImageUrls.length === 0) {
          throw new Error('Failed to upload image.');
        }
      }
    
      const gooseInfo = {
        name: gooseName,
        description,
        updatedAt: Date.now(),
      };
      
      if (gooseName && description && (newlyAddedImageUrls.length > 0 || imageUrls.length > 0)) {
        if (params.gooseId) {
          await api.geeseInfo.updateGeeseInfo(params.gooseId, gooseInfo);
          await Promise.all(
            imagesToDelete.map((imageId) => {
              return api.geeseInfo.deleteGeeseImages(imageId);
            }),
          );

          // upload images if new files are added
          if (newlyAddedImages.length >0){
          await api.geeseInfo.addGeeseImages(
            newlyAddedImageUrls.map((image) => {
              return {
                gooseId: params.gooseId,
                imgDir: image,
              };
            }),
          );
          }
        } 
        else {
          const res = await api.geeseInfo.addGeeseInfo(gooseInfo);
          await api.geeseInfo.addGeeseImages(
            imageUrls.map((image) => {
              return {
                gooseId: res.data[0],
                imgDir: image,
              };
            }),
          );
        }
       
      } 

      else {
        throw new Error('Please fill all the required fields.');
      }
      // onSuccess:
      closeForm();
    } catch (e) {
      // TODO: Display "could not add/update" error to user as dialogue.
      // eslint-disable-next-line no-console
      
      console.error(e);
    }
  }, [images, params, gooseName, description, closeForm, imagesToDelete, imageUrls]);

  const deleteForm = useCallback(async () => {
    if (params.gooseId) {
      await api.geeseInfo.deleteGeeseInfo(params.gooseId);
    }
    closeForm();
  }, [params.gooseId, closeForm]);

  const getLastUpdated = useCallback(() => {
    const gooseInfo = geeseInfo.find((goose) => goose.id === parseInt(params.gooseId, 10));
    if (gooseInfo) {
      return moment.utc(gooseInfo.updatedAt).local().format('MMMM D, YYYY');
    }
    return '';
  }, [geeseInfo, params.gooseId]);

  return {
    gooseName,
    setGooseName,
    description,
    setDescription,
    images,
    setImages,
    imageUrls,
    setImageUrls,
    imagesToDelete,
    setImagesToDelete,
    getLastUpdated,
    imageUpload,
    imageDelete,
    imageUrlDelete,
    closeForm,
    saveForm,
    deleteForm,
    showModal,
    openModal,
    closeModal,
  };
};

export default useGooseForm;
