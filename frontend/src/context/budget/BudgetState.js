import { useReducer } from 'react';
import BudgetContext from './BudgetContext';
import axios from 'axios';
import BudgetReducer from './BudgetReducer';
import {
  ADD_BUDGET,
  ADD_BUDGETS,
  DELETE_BUDGET,
  FAILED_BUDGET,
  REMOVE_LOADING,
  SET_LOADING,
} from './budgetConstants';

const initialState = {
  budgets: [],
  loading: false,
  singleBudget: {},
};

const BudgetState = (props) => {
  const [state, dispatch] = useReducer(BudgetReducer, initialState);

  //ADD BUDGET
  const addBudget = async (budget, token) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('/api/budgets', budget, config);
      console.log(
        'Adding a budget in DB (State)',
        data,
        'The successful budget in DB',
        data.budget
      );
      if (data) {
        dispatch({
          type: ADD_BUDGET,
          payload: data.budget,
        });
        dispatch({ type: REMOVE_LOADING });
      }
    } catch (error) {
      dispatch({ type: FAILED_BUDGET });
      console.log('Error occured in state while adding budget', error);
    }
  };

  //GET ALL BUDGETS

  const getAllBudgets = async (token) => {
    try {
      dispatch({ type: SET_LOADING });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.get('/api/budgets/', config);

      const {
        data: { budgets },
      } = data;
      dispatch({
        type: ADD_BUDGETS,
        payload: budgets,
      });
      console.log(
        'Budgets data from State obtained from DB',
        data,
        'And the budgets',
        budgets
      );
      dispatch({ type: REMOVE_LOADING });
    } catch (error) {
      dispatch({ type: FAILED_BUDGET });
      console.log('Budget fetching Error in state', error);
    }
  };

  const deleteBudget = async (id, token) => {
    console.log('Budget about to be deleted');
    console.log('In state. The id & token', id, token);
    try {
      dispatch({ type: SET_LOADING });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.delete(`/api/budgets/${id}`, config);
      if (data) {
        dispatch({ type: DELETE_BUDGET, payload: id });
        console.log('Budget deleted');
        dispatch({ type: REMOVE_LOADING });
      }
    } catch (error) {
      dispatch({ type: FAILED_BUDGET });
      console.log('Budget failed to be deleted', error);
    }
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets: state.budgets,
        loading: state.loading,
        singleBudget: state.singleBudget,
        addBudget,
        getAllBudgets,
        deleteBudget,
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
};

export default BudgetState;
