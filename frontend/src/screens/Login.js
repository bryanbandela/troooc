import Meta from '../components/Meta';
import Footer from '../components/Footer';
import './Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../context/user/UserContext';
import Loader from '../components/Loader';

function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { loginUser, accessToken, loading } = userContext;
  const redirect = '/home';
  useEffect(() => {
    console.log('This is the token in Login useEffect', accessToken);
    if (accessToken && accessToken !== null) {
      navigate(redirect);
      console.log('Directed to home');
    }
  }, [accessToken, navigate, redirect]);

  console.log('accessToken detail in Login page', accessToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };

    loginUser(newUser);
  };

  return (
    <>
      <Meta title="Login | troooc.com" />
      {loading && <Loader />}
      <h1 className="title_h1">
        Welcome back to tr<span className="o">ooo</span>c
      </h1>
      <p className="title_tag">
        The <span>expense tracker</span> app I wish I had when I went to
        university!
      </p>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-control">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span></span>
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
            Login
          </button>

          <p className="text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
