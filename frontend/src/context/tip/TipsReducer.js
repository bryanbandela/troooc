import {
  DELETE_TIP,
  RESET_TIP,
  SET_LOADING,
  ADD_TIP,
  SHOW_TIPS,
  ADD_TIPS,
} from './tipConstants';

const TipsReducer = (
  state = {
    tips: [],
    loading: false,
    singleTip: {},
  },
  action
) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case ADD_TIPS:
      return {
        ...state,
        tips: action.payload,
        loading: false,
      };
    case ADD_TIP:
      return {
        ...state,
        tips: [...state.tips, action.payload],
        loading: false,
      };
    case SHOW_TIPS:
      return {
        ...state,
        tips: [...state.tips],
      };
    case DELETE_TIP:
      return {
        ...state,
        message: action.message,
        tips: [...state.tips.filter((tip) => tip._id !== action.payload)],
      };

    case RESET_TIP:
      return {
        tips: [],
        loading: false,
        singleTip: {},
      };
    default:
      return state;
  }
};

export default TipsReducer;
