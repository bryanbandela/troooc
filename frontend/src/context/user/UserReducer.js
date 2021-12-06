import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from './userConstants';

const UserReducer = (
  state = { userInfo: {}, loading: false, accessToken: null },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        accessToken: action.payload.accessToken,
      };
    case USER_REGISTER_FAIL:
      return { message: 'Registration failed' };
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        accessToken: action.payload.accessToken,
      };
    case USER_LOGIN_FAIL:
      return { message: 'Failed to login' };

    default:
      return state;
  }
};

export default UserReducer;
