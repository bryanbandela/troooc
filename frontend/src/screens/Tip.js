import Meta from '../components/Meta';
import Header from '../components/Header';
import './Tip.css';
import SingleTip from '../components/SingleTip';
import { useState, useContext, useEffect } from 'react';
import TipContext from '../context/tip/TipContext';
import UserContext from '../context/user/UserContext';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Tip() {
  const navigate = useNavigate();
  const redirect = '/login';
  const { tips, loading, getAllTips, addTip } = useContext(TipContext);
  const {
    accessToken,
    logoutUser,
    userInfo: { username },
  } = useContext(UserContext);
  console.log('In Tip.js', tips);
  console.log('Checking the length of array', tips.length);

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

    console.log('Tips fetched in Tip screen');
    getAllTips(accessToken);
  }, []);

  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('I got clicked to add a tip');
    const tip = {
      title,
      body: answer,
      user: username,
    };

    addTip(tip, accessToken);

    setTitle('');
    setAnswer('');
  };
  return (
    <>
      {/* {loading && <Loader />} */}
      <Meta />
      <Header />
      <div className="tip">
        <div className="alltips">
          <h2>List of tips</h2>
          {tips.length > 0 ? (
            tips.map((tip) => {
              return (
                <SingleTip
                  title={tip.title}
                  paragraph={tip.body}
                  username={tip.user}
                  key={tip._id}
                />
              );
            })
          ) : (
            <p className="no_text">No tip to display</p>
          )}
        </div>
        <div className="submit_tip">
          <h2>Submit tip Items</h2>
          <form>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="eg: Best book on investment"
                required
              ></input>
            </div>
            <div>
              <label>Answer</label>
              <textarea
                rows="5"
                cols="30"
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                placeholder="eg: The Richest Man In Babylon"
                required
              ></textarea>
            </div>

            <button onClick={() => submitHandler}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Tip;
