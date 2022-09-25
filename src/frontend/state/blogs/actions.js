import * as actionTypes from '../action-types';

export const updateBlogInfo = (blogInfo) => ({
  type: actionTypes.UPDATE_BLOG_INFO,
  payload: blogInfo,
});