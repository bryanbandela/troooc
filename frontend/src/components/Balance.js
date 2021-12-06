import './Balance.css';
import { useContext } from 'react';
import TransactionContext from '../context/transaction/TransactionContext';

function Balance() {
  const { transactions } = useContext(TransactionContext);
  const reducer = (prevVal, currentVal) => prevVal + currentVal;
  const positive =
    transactions.length > 0
      ? transactions
          .filter(
            (transaction) =>
              transaction.type === 'Income' || transaction.type === 'Salary'
          )
          .map((transaction) => transaction.amount)
          .reduce(reducer, 0)
      : 0;
  const negative =
    transactions.length > 0
      ? transactions
          .filter(
            (transaction) =>
              transaction.type === 'Outcome' ||
              transaction.type === 'withdrawal'
          )
          .map((transaction) => transaction.amount)
          .reduce(reducer, 0)
      : 0;
  const balance = positive - negative;

  return (
    <div className="balance_sheet">
      <div className="balance">
        <p>Your available balance</p>
        <h1>ZAR {balance}</h1>
      </div>
      <div className="data">
        <div className="income">
          <p>Income</p>
          <h3>R{positive}</h3>
        </div>
        <div className="outcome">
          <p>Outcome</p>
          <h3>-R{negative}</h3>
        </div>
      </div>
    </div>
  );
}

export default Balance;
