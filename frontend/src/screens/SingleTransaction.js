import './SingleTransaction.css';
import Meta from '../components/Meta';
import Header from '../components/Header';
import { useState, useContext } from 'react';
import TransactionContext from '../context/transaction/TransactionContext';
import { useParams, useNavigate } from 'react-router-dom';

function SingleTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { transactions, updateTransaction, deleteTransaction } =
    useContext(TransactionContext);
  console.log('SingleTransaction page', transactions);

  const transaction = transactions.find((transac) => transac._id === id);

  console.log('Detail of transaction page', transaction);

  const { type, category, name, amount } = transaction;

  const [modifyType, setModifyType] = useState(type);
  const [modifyCategory, setModifyCategory] = useState(category);
  const [modifyName, setModifyName] = useState(name);
  const [modifyAmount, setModifyAmount] = useState(amount);
  const [toggle, setToggle] = useState(false);

  const deleteOrUpdate = (e) => {
    e.preventDefault();
    if (toggle) {
      deleteTransaction();
      navigate('/home');
    } else {
      updateTransaction();
      navigate(`/home/${id}`);
    }
  };

  return (
    <>
      <Meta />
      <Header />
      <div className="single_transaction">
        <button onClick={() => setToggle(!toggle)} className="toggle">
          Toggle to {toggle ? 'Delete' : 'Update'}
        </button>
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
          <button
            onClick={(e) => deleteOrUpdate(e)}
            style={{ backgroundColor: toggle ? 'red' : 'green' }}
          >
            {toggle ? 'Delete' : 'Update'}
          </button>
        </form>
      </div>
    </>
  );
}

export default SingleTransaction;
