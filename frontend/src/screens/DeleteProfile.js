import './Profile.css';
import Meta from '../components/Meta';
import Header from '../components/Header';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserContext from '../context/user/UserContext';

function DeleteProfile() {
  const navigate = useNavigate();
  const {
    deleteUser,
    accessToken,
    userInfo: { id },
  } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [confirmUsername, setConfirmUsername] = useState('');

  const deleteHandle = (e) => {
    e.preventDefault();
    if (username === confirmUsername) {
      deleteUser(id, accessToken);
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
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Confirm username"
              value={confirmUsername}
              onChange={(e) => {
                setConfirmUsername(e.target.value);
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
