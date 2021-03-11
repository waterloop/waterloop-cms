import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import postingsReducer from './postings/reducer';
import teamsReducer from './teams/reducer';

export default combineReducers({
  user: userReducer,
  postings: postingsReducer,
  teams: teamsReducer,
});
