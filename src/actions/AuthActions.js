import axios from 'axios';
import { firebaseUrl } from '../const';
import { AUTH_USER, AUTH_ERROR, FETCH_USER } from './types';


const setAxiosHeader = () => {
  let authTokenStr = localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '';
  axios.defaults.headers.common['Authorization'] = `Bearer ${authTokenStr}`;
}

export const signInAction = (user, token, callback) => async dispatch => {
  try {

    localStorage.setItem('token', token); 

    setAxiosHeader();
    const res = await axios.get(`${firebaseUrl}fetchUserData`);

    dispatch({ type: AUTH_USER, payload: !!user });   
    dispatch({
      type: FETCH_USER,
      payload: {
        displayName: res.data.username ,
        email: res.data.email,
        photoURL: res.data.profile_picture,
        role: res.data.role
      }
    });

    callback();

  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err });
  }
};

export const signOutAction = callback => async dispatch => {
  localStorage.setItem('token', null);
  dispatch({ type: AUTH_USER, payload: false });
  dispatch({ type: FETCH_USER, payload: '' });
  callback();
};
