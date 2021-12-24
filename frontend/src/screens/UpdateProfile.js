import Meta from '../components/Meta';
import Header from '../components/Header';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from '../context/user/UserContext';

function UpdateProfile() {
  const navigate = useNavigate();
  const { updateUser, accessToken } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const body = {
      username: userName,
      email,
      password,
    };
    updateUser(accessToken, body);
    // navigate('/profile');
    console.log('redirected to home page');
  };
  return (
    <>
      <Meta />
      <Header />
      <div className="profile">
        <Link className="return" to="/profile">
          Go back
        </Link>
        <form>
          <div>
            <input
              type="text"
              placeholder="Enter new username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter new Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <button onClick={handleClick}>Update Profile</button>
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
