import './Profile.css';
import Meta from '../components/Meta';
import Header from '../components/Header';
import './Profile.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function DeleteProfile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            ></input>
          </div>
          <div>
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Confirm Password"
              required
            ></input>
          </div>

          <button className="delete_btn">Confirm Delete</button>
        </form>
      </div>
    </>
  );
}

export default DeleteProfile;
