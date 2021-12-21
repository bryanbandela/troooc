import Meta from '../components/Meta';
import Header from '../components/Header';
import './Tip.css';
import SingleTip from '../components/SingleTip';
import { useState, useContext, useEffect } from 'react';
import TipContext from '../context/tip/TipContext';
import UserContext from '../context/user/UserContext';
import Loader from '../components/Loader';

function Tip() {
  const { tips, loading, getAllTips, addTip } = useContext(TipContext);
  const { accessToken } = useContext(UserContext);
  console.log('In TransactionMenu', tips);
  console.log('Checking the length of array', tips.length);
  useEffect(() => {
    console.log('Tips fetched in Tip screen');
    getAllTips(accessToken);
  }, []);

  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const tip = {
      title,
      answer,
    };

    addTip(tip, accessToken);
  };
  return (
    <>
      {loading && <Loader />}
      <Meta />
      <Header />
      <div className="tip">
        <div className="alltips">
          <h2>List of tips</h2>
          {tips.length > 0 ? (
            tips.map((tip) => {
              return <SingleTip key={tip._id} />;
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
