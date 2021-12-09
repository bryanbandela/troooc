import { useReducer } from 'react';
import axios from 'axios';
import TransactionContext from './TransactionContext';
import TransactionsReducer from './TransactionReducer';
import {
  ADD_TRANSACTION,
  ADD_TRANSACTIONS,
  FAILED_TRANSACTION,
  SET_LOADING,
  SHOW_TRANSACTION,
} from './transactionConstants';

//local storage data will be placed above here for initial state
const initialState = {
  loading: false,
  transactions: [],
  singleTransaction: {},
  message: null,
};

const TransactionState = (props) => {
  const [state, dispatch] = useReducer(TransactionsReducer, initialState);

  //ADD TRANSACTION ACTION
  const addTransaction = async (transaction, token) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.post('/api/transactions', transaction, config);
      console.log('Adding a transaction in DB (State)', data);

      dispatch({
        type: ADD_TRANSACTION,
        payload: transaction,
      });
    } catch (error) {
      dispatch({ type: FAILED_TRANSACTION });
      console.log('Error occured in state while adding transaction', error);
    }
  };

  //Get all transactions
  const getAllTransactions = async (token) => {
    try {
      dispatch({ type: SET_LOADING });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.get('/api/transactions/', config);
      console.log('Checking data in frontend State', data);
      const {
        data: { transactions },
      } = data;
      dispatch({
        type: ADD_TRANSACTIONS,
        payload: transactions,
      });
      console.log(
        'Transactions data from State obtained from DB',
        data,
        'And the transactions',
        transactions
      );
    } catch (error) {
      dispatch({ type: FAILED_TRANSACTION });
      console.log('Transaction fetching Error in state', error);
    }
  };

  const getSingleTransaction = (id) => {
    dispatch({
      type: SET_LOADING,
    });

    dispatch({
      type: SHOW_TRANSACTION,
      payload: id,
    });
  };
  //DELETE TRANSACTION

  return (
    <TransactionContext.Provider
      value={{
        loading: state.loading,
        transactions: state.transactions,
        singleTransaction: state.singleTransaction,
        addTransaction,
        getSingleTransaction,
        getAllTransactions,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
