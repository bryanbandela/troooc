import Meta from '../components/Meta';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Balance from '../components/Balance';
import TransactionMenu from '../components/TransactionMenu';
import UserContext from '../context/user/UserContext';
import TransactionContext from '../context/transaction/TransactionContext';

function Home() {
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);
  const { getAllTransactions } = useContext(TransactionContext);
  const redirect = '/login';

  useEffect(() => {
    getAllTransactions(accessToken);
  }, []);

  useEffect(() => {
    console.log('Token in home page', accessToken);
    if (!accessToken) {
      navigate(redirect);
    }
  }, [accessToken, navigate, redirect]);

  return (
    <>
      <Meta />
      <Header />
      <Balance />
      <TransactionMenu />
    </>
  );
}

export default Home;
