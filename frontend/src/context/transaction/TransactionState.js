import { useReducer } from 'react';
import axios from 'axios';
import TransactionContext from './TransactionContext';
import TransactionsReducer from './TransactionReducer';
import { useNavigate } from 'react-router-dom';
import {
  ADD_TRANSACTION,
  ADD_TRANSACTIONS,
  DELETE_TRANSACTION,
  FAILED_TRANSACTION,
  REMOVE_LOADING,
  RESET_TRANSACTION,
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

      const { data } = await axios.post(
        '/api/transactions',
        transaction,
        config
      );
      console.log(
        'Adding a transaction in DB (State)',
        data,
        'The successful transaction in DB',
        data.transaction
      );

      dispatch({
        type: ADD_TRANSACTION,
        payload: data.transaction,
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
      dispatch({ type: REMOVE_LOADING });
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
  const deleteTransaction = async (id, token) => {
    console.log('In state. The id & token', id, token);
    try {
      dispatch({ type: SET_LOADING });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.delete(`/api/transactions/${id}`, config);
      const {
        data: { message },
      } = data;
      dispatch({ type: DELETE_TRANSACTION, payload: id, message: message });
      console.log('Transaction deleted');
    } catch (error) {
      dispatch({ type: FAILED_TRANSACTION });
      console.log('Transaction failed to be deleted', error);
    }
  };

  //UPDATE TRANSACTION
  const updateTransaction = async (id, body, token) => {
    console.log('Transaction updated');
    try {
      dispatch({
        type: SET_LOADING,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = axios.patch(`/api/transactions/${id}`, body, config);

      console.log('Data updated from request in State', data);
    } catch (error) {
      dispatch({ type: FAILED_TRANSACTION });
      console.log('Transaction failed to update', error);
    }
  };

  const resetTransaction = () => {
    dispatch({ type: RESET_TRANSACTION });
  };

  return (
    <TransactionContext.Provider
      value={{
        loading: state.loading,
        transactions: state.transactions,
        singleTransaction: state.singleTransaction,
        addTransaction,
        getSingleTransaction,
        getAllTransactions,
        resetTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
