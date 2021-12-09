import Meta from '../components/Meta';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Balance from '../components/Balance';
import TransactionMenu from '../components/TransactionMenu';
import UserContext from '../context/user/UserContext';
import jwtDecode from 'jwt-decode';

function Home() {
  const navigate = useNavigate();
  const { accessToken, logoutUser } = useContext(UserContext);
  const redirect = '/login';

  const checkToken = () => {
    let token = localStorage.getItem('accessToken');
    const { exp } = jwtDecode(token);
    console.log('exp is in Home page', exp);
    const expirationTime = exp * 1000 - 60000;
    console.log('Checking calc for expiration', expirationTime);
    console.log('what is Date.now', Date.now());

    if (Date.now() >= expirationTime) {
      localStorage.clear();
      console.log('Token has expired');
      logoutUser();
      navigate('/login');
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate(redirect);
    }

    checkToken();

    //Come back to see how to check an expiry token
    //No need for depency in useEffect
  });

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
