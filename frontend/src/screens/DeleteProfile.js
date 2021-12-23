import './Profile.css';
import Meta from '../components/Meta';
import Header from '../components/Header';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../context/user/UserContext';
import jwtDecode from 'jwt-decode';

function DeleteProfile() {
  const navigate = useNavigate();
  const redirect = '/login';
  const {
    deleteUser,
    logoutUser,
    accessToken,
    userInfo: { username },
  } = useContext(UserContext);

  console.log('The username is', username);

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

  const [userName, setUserName] = useState('');
  const [confirmUserName, setConfirmUserName] = useState('');
  console.log('comparing', username, userName, confirmUserName);
  console.log(
    'comparing',
    typeof username,
    typeof userName,
    typeof confirmUserName
  );

  const deleteHandle = (e) => {
    e.preventDefault();
    if ((userName === confirmUserName) & (userName === username)) {
      deleteUser(accessToken);
      logoutUser();
      navigate('/');
    }
  };

  return (
    <>
      <Meta />
      <Header />
      <div className="profile">
        <Link className="return" to="/profile">
          Go back
        </Link>
        <form className="confirm_delete">
          <div>
            <input
              type="text"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Confirm username"
              value={confirmUserName}
              onChange={(e) => {
                setConfirmUserName(e.target.value);
              }}
              required
            ></input>
          </div>

          <button className="delete_btn" onClick={deleteHandle}>
            Confirm Delete
          </button>
        </form>
      </div>
    </>
  );
}

export default DeleteProfile;
