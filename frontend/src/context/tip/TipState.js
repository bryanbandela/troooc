import { useReducer } from 'react';
import axios from 'axios';
import TipContext from './TipContext';
import TipsReducer from './TipsReducer';
import {
  ADD_TIP,
  FAILED_TIP,
  REMOVE_LOADING,
  SET_LOADING,
} from './tipConstants';

const initialState = {
  tips: [],
  loading: false,
  singleTip: {},
};

const TipState = (props) => {
  const [state, dispatch] = useReducer(TipsReducer, initialState);

  //ADD TIP ACTION
  const addTip = async (tip, token) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('/api/tips', tip, config);
      console.log(
        'Adding a tip in DB (State)',
        data,
        'The successful tip in DB',
        data.tip
      );

      dispatch({
        type: ADD_TIP,
        payload: data.tip,
      });
    } catch (error) {
      dispatch({ type: FAILED_TIP });
      console.log('Error occured in state while adding tip', error);
    }
  };

  //Get all transactions
  const getAllTips = async (token) => {
    try {
      dispatch({ type: SET_LOADING });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.get('/api/tips/', config);

      const {
        data: { tips },
      } = data;
      dispatch({
        type: ADD_TIP,
        payload: tips,
      });
      console.log(
        'Tips data from State obtained from DB',
        data,
        'And the tips',
        tips
      );
      dispatch({ type: REMOVE_LOADING });
    } catch (error) {
      dispatch({ type: FAILED_TIP });
      console.log('Tipfetching Error in state', error);
    }
  };

  return (
    <TipContext.Provider
      value={{
        loading: state.loading,
        tips: state.tips,
        singleTip: state.singleTip,
        addTip,
        getAllTips,
      }}
    >
      {props.children}
    </TipContext.Provider>
  );
};

export default TipState;
