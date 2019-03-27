import { combineReducers } from 'redux';
import authReducer from './authReducer';
import menuReducer from './menuReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  menu: menuReducer,
});

