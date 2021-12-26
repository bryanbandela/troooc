import {
  ADD_BUDGET,
  ADD_BUDGETS,
  DELETE_BUDGET,
  REMOVE_LOADING,
  RESET_BUDGET,
  SET_LOADING,
} from './budgetConstants';

const BudgetReducer = (
  state = { budgets: [], loading: false, singleBudget: {} },
  action
) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case ADD_BUDGETS:
      return {
        ...state,
        budgets: action.payload,
      };

    case ADD_BUDGET:
      return {
        ...state,
        tips: [...state.budgets, action.payload],
      };
    case DELETE_BUDGET:
      return {
        ...state,
        message: action.message,
        budgets: [
          ...state.budgets.filter((budget) => budget._id !== action.payload),
        ],
      };
    case REMOVE_LOADING:
      return { ...state, loading: false };

    case RESET_BUDGET:
      return {
        budgets: [],
        loading: false,
        singleBudget: {},
      };
    default:
      return state;
  }
};

export default BudgetReducer;
