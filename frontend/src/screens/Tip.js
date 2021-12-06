import Meta from '../components/Meta';
import Header from '../components/Header';
import './Tip.css';
import SingleTip from '../components/SingleTip';
import { useState } from 'react';

function Tip() {
  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');
  return (
    <>
      <Meta />
      <Header />
      <div className="tip">
        <div className="alltips">
          <h2>List of tips</h2>
          <SingleTip />
          <SingleTip />
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

            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Tip;
