import './SingleTransaction.css';
import Meta from '../components/Meta';
import Header from '../components/Header';
import { useState, useContext } from 'react';
import TransactionContext from '../context/transaction/TransactionContext';
import { useParams } from 'react-router-dom';

function SingleTransaction() {
  const { id } = useParams();
  const { transactions } = useContext(TransactionContext);
  console.log('SingleTransaction page', transactions);

  const transaction = transactions.find((transac) => transac._id === id);

  console.log('Detail of transaction page', transaction);

  const { type, category, name, amount } = transaction;

  const [modifyType, setModifyType] = useState(type);
  const [modifyCategory, setModifyCategory] = useState(category);
  const [modifyName, setModifyName] = useState(name);
  const [modifyAmount, setModifyAmount] = useState(amount);

  return (
    <>
      <Meta />
      <Header />
      <div className="single_transaction">
        <form>
          <div>
            <label>Type</label>
            <input
              type="text"
              value={modifyType}
              onChange={(e) => setModifyType(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={modifyCategory}
              onChange={(e) => setModifyCategory(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={modifyName}
              onChange={(e) => setModifyName(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Amount</label>
            <input
              type="text"
              value={modifyAmount}
              onChange={(e) => setModifyAmount(e.target.value)}
              required
            ></input>
          </div>
          <button>Update</button>
        </form>
      </div>
    </>
  );
}

export default SingleTransaction;
