import {
  ADD_TRANSACTION,
  ADD_TRANSACTIONS,
  FAILED_TRANSACTION,
  RESET_TRANSACTION,
  REMOVE_LOADING,
  SET_LOADING,
  SHOW_TRANSACTION,
  SHOW_TRANSACTIONS,
  DELETE_TRANSACTION,
} from './transactionConstants';

const TransactionsReducer = (
  state = {
    transactions: [],
    loading: false,
    singleTransaction: {},
    message: '',
  },
  action
) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        loading: false,
      };
    case ADD_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case SHOW_TRANSACTIONS:
      return {
        ...state,
        transactions: [...state.transactions],
      };
    case REMOVE_LOADING:
      return { ...state, loading: false };
    case DELETE_TRANSACTION:
      return {
        ...state,
        message: action.message,
        transactions: [
          ...state.transactions.filter(
            (transaction) => transaction._id !== action.payload
          ),
        ],
      };
    case SHOW_TRANSACTION:
      return { ...state, singleTransaction: action.payload };
    case FAILED_TRANSACTION:
      return {
        ...state,
        message: 'failed to get all transactions',
      };
    case RESET_TRANSACTION:
      return {
        transactions: [],
        loading: false,
        singleTransaction: {},
        message: '',
      };
    default:
      return state;
  }
};

export default TransactionsReducer;
