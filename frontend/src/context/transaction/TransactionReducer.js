import {
  ADD_TRANSACTION,
  ADD_TRANSACTIONS,
  FAILED_TRANSACTION,
  SET_LOADING,
  SHOW_TRANSACTION,
  SHOW_TRANSACTIONS,
} from './transactionConstants';

const TransactionsReducer = (
  state = { transactions: [], loading: false, singleTransaction: {} },
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
        singleTransaction: {},
        transactions: action.payload,
        loading: false,
      };
    case SHOW_TRANSACTIONS:
      return {
        ...state,
        transactions: [...state.transactions],
        loading: false,
      };
    case SHOW_TRANSACTION:
      return { ...state, singleTransaction: action.payload, loading: false };
    case FAILED_TRANSACTION:
      return {
        ...state,
        message: 'failed',
      };
    default:
      return state;
  }
};

export default TransactionsReducer;
