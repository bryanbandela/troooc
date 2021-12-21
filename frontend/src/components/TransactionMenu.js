import './TransactionMenu.css';
import Transaction from './Transaction';
import AddTransaction from './AddTransaction';
import { useContext, useEffect } from 'react';
import TransactionContext from '../context/transaction/TransactionContext';
import UserContext from '../context/user/UserContext';
import Loader from './Loader';

function TransactionMenu() {
  const { transactions, getAllTransactions, loading } =
    useContext(TransactionContext);
  const { accessToken } = useContext(UserContext);
  console.log('In TransactionMenu', transactions);
  console.log('Checking the length of array', transactions.length);
  useEffect(() => {
    console.log('Transactions fetched in TransactionMenu');
    getAllTransactions(accessToken);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="transaction_menu">
        <div className="transactions">
          <h3>Transactions</h3>
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              return (
                <Transaction
                  key={transaction._id}
                  type={transaction.type}
                  category={transaction.category}
                  name={transaction.name}
                  amount={transaction.amount}
                  id={transaction._id}
                  date={transaction.createdAt}
                />
              );
            })
          ) : (
            <p className="no_text">No transaction done</p>
          )}
        </div>
        <div className="addTransaction">
          <h3>Add Transaction</h3>
          <AddTransaction />
        </div>
      </div>
    </>
  );
}

export default TransactionMenu;
