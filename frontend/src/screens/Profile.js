import Meta from '../components/Meta';
import { useContext } from 'react';
import Header from '../components/Header';
import './Profile.css';
import { Link } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import { useNavigate } from 'react-router-dom';
import TransactionContext from '../context/transaction/TransactionContext';

function Profile() {
  const navigate = useNavigate();
  const { accessToken, logoutUser } = useContext(UserContext);
  const { resetTransaction } = useContext(TransactionContext);
  const logoutClick = () => {
    resetTransaction();
    logoutUser();
    console.log('Logged out and directed to login page');
    navigate('/login');
  };

  const deleteUser = () => {
    console.log('About to delete user with token', accessToken);
  };
  return (
    <>
      <Meta />
      <Header />
      <div className="profile">
        <Link to="/profile/update">
          <div>
            <p>Update Profile</p>
          </div>
        </Link>

        <button className="delete" onClick={() => deleteUser()}>
          <p>Delete Profile</p>
        </button>

        <button className="logout" onClick={() => logoutClick()}>
          <p>Logout</p>
        </button>
      </div>
    </>
  );
}

export default Profile;
