import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import postingsReducer from './postings/reducer';

export default combineReducers({
  user: userReducer,
  postings: postingsReducer,
});
