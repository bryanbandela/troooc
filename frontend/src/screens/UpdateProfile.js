import Meta from '../components/Meta';
import Header from '../components/Header';
import './Profile.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function UpdateProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button>Update Profile</button>
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
