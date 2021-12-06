import './AddTransaction.css';
import { useContext, useState } from 'react';
import TransactionContext from '../context/transaction/TransactionContext';

function AddTransaction() {
  const { addTransaction } = useContext(TransactionContext);
  const [type, setType] = useState('Outcome');
  const [category, setCategory] = useState('Beauty');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [state, setState] = useState(false);

  const options =
    type === 'Outcome'
      ? [
          'Beauty',
          'Donation',
          'Extras',
          'Food',
          'Offering',
          'Others',
          'Tax',
          'Transport',
          'Saving',
        ]
      : ['Dividends', 'Freelance', 'Investment', 'Salary', 'Tax return'];
  const handleClick = () => {
    setState(!state);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      type,
      category,
      name,
      amount: Number(amount),
      date: new Date(),
    };

    addTransaction(newTransaction);

    setName('');
    setAmount('');
  };

  return (
    <>
      <div className="transactionForm">
        <div onClick={handleClick} className="click_to_add">
          Click to add/cancel
        </div>
        {state && (
          <form onSubmit={submitHandler}>
            <div>
              <label>Type</label>
              <select
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                {['Outcome', 'Income'].map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label>Category</label>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {options.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="eg: John's birthday"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                required
              ></input>
            </div>
            <div>
              <label>Amount</label>
              <input
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                value={amount}
                placeholder="R0"
                required
              ></input>
            </div>
            <button type="submit">Add Transaction</button>
            <div onClick={handleClick} className="cancel">
              Cancel
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default AddTransaction;
