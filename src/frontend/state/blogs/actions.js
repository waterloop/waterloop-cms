import * as actionTypes from '../action-types';

export const updateBlogInfo = (blogInfo) => ({
  type: actionTypes.GET_BLOG_INFO,
  payload: blogInfo,
});