import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import postingsReducer from './postings/reducer';
import teamsReducer from './teams/reducer';
import sponsorsReducer from './sponsors/reducer';
import geeseInfoReducer from './geese-info/reducer';
import blogInfoReducer from './blogs/reducer';

export default combineReducers({
  user: userReducer,
  postings: postingsReducer,
  teams: teamsReducer,
  sponsors: sponsorsReducer,
  geeseInfo: geeseInfoReducer,
  blogInfo: blogInfoReducer
});
