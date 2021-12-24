import { useReducer } from 'react';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from './userConstants';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import axios from 'axios';

const tokenfoFromStorage = localStorage.getItem('accessToken')
  ? JSON.parse(localStorage.getItem('accessToken'))
  : null;

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {};

const initialState = {
  accessToken: tokenfoFromStorage,
  userInfo: userInfoFromStorage,
  loading: false,
};

const UserState = (props) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  console.log('Checking State in State', state);

  async function registerUser({ username, email, password }) {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users/register',
        { username, email, password },
        config
      );
      console.log('success in State', data);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log('Data saved in local storage');
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL });
      console.log('Error in state', error);
    }
  }

  async function loginUser({ email, password }) {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );
      console.log('Data in userState', data);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log('Data saved in local storage');
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL });
      console.log('Error in state', error);
    }
  }

  function logoutUser() {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
  }

  async function updateUser(token, body) {
    console.log('User about to be updated');
    console.log('Token in State', token);
    console.log('Body in State', body);

    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = axios.patch(`/api/users/profile`, body, config);

      console.log('User updated from request in State', data);
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL });
      console.log('User failed to update', error);
    }
  }

  async function deleteUser(token) {
    console.log('User about to be deleted');

    try {
      dispatch({ type: USER_DELETE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const userDeleted = await axios.delete(`/api/users/profile`, config);

      if (userDeleted) {
        dispatch({ type: USER_DELETE_SUCCESS });
      }
    } catch (error) {
      dispatch({ type: USER_DELETE_FAIL });
    }
  }

  return (
    <UserContext.Provider
      value={{
        registerUser,
        updateUser,
        loginUser,
        logoutUser,
        deleteUser,
        loading: state.loading,
        userInfo: state.userInfo,
        accessToken: state.accessToken,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
