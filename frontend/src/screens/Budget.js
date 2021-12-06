import Meta from '../components/Meta';
import Header from '../components/Header';
import './Budget.css';
import SingleBudget from '../components/SingleBudget';
import { useState } from 'react';

function Budget() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <>
      <Meta />
      <Header />
      <div className="budget">
        <div className="allbudgets">
          <h2>List of budgets</h2>
          <SingleBudget />
          <SingleBudget />
        </div>
        <div className="submit_budget">
          <h2>Submit Budget Items</h2>
          <form>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="eg: Transport"
                required
              ></input>
            </div>
            <div>
              <label>Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                placeholder="eg: 3000"
                required
              ></input>
            </div>

            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Budget;
