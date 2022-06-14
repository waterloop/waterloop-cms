import { useEffect } from 'react';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import * as blogInfoActions from '../state/blogs/actions';
import * as blogInfoSelectors from '../state/blogs/selectors';

const useBlogInfo = () => {
  const dispatch = useDispatch();
  const blogInfo = useSelector(blogInfoSelectors.allBlogInfo);
  useEffect(() => {
    (async () => {
      try {
        const blogInfoResponse = await api.blogs.getBlogs();

        const newBlogInfo = blogInfoResponse.data;

        dispatch(blogInfoActions.updateBlogInfo(newBlogInfo));
        
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  return {
    blogInfo
  };
};

export default useBlogInfo;
