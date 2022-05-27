import * as actionTypes from '../action-types';

export const updateBlogInfo = (blogInfo) => ({
  type: actionTypes.BLOG_INFO_GET_BLOG_INFO,
  payload: blogInfo,
});