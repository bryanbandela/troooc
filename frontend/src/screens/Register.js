import Meta from '../components/Meta';
import Footer from '../components/Footer';
import './Form.css';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import Loader from '../components/Loader';

function Register() {
  const navigate = useNavigate();
  const { registerUser, message, accessToken, loading } =
    useContext(UserContext);
  const redirect = '/home';
  useEffect(() => {
    console.log('Token in register form', accessToken);
    if (accessToken && accessToken !== undefined) {
      navigate(redirect);
    }
  }, [accessToken, navigate, redirect]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };

    registerUser(newUser);
  };

  return (
    <>
      <Meta title="Register | troooc.com" />
      {loading && <Loader />}
      <h1 className="title_h1">
        Welcome back to tr<span className="o">ooo</span>c
      </h1>
      <p className="title_tag">
        The <span>expense tracker</span> app I wish I had when I went to
        university!
      </p>
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-control">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="form-control">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span>{message && message}</span>
            <label>Email</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <span></span>
          <button type="submit" className="btn">
            Register
          </button>

          <p className="text">
            Have an account already? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
