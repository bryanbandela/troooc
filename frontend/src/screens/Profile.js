import Meta from '../components/Meta';
import Header from '../components/Header';
import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
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
        <Link to="/profile/delete">
          <div className="delete">
            <p>Delete Profile</p>
          </div>
        </Link>
        <Link to="/logout">
          <div className="logout">
            <p>Logout</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Profile;
