import Meta from '../components/Meta';
import Header from '../components/Header';
import './Budget.css';
import SingleBudget from '../components/SingleBudget';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import BudgetContext from '../context/budget/BudgetContext';
import jwtDecode from 'jwt-decode';
import Loader from '../components/Loader';

function Budget() {
  const navigate = useNavigate();
  const redirect = '/login';
  const {
    accessToken,
    userInfo: { id },
    logoutUser,
  } = useContext(UserContext);
  const { budgets, getAllBudgets, addBudget, deleteBudget, loading } =
    useContext(BudgetContext);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

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

    getAllBudgets(accessToken);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const budget = {
      user: id,
      name,
      amount,
    };

    addBudget(budget, accessToken);
    setName('');
    setAmount('');
    getAllBudgets(accessToken); //if i remove this line it won't get all the budgets
  };

  return (
    <>
      <Meta />
      <Header />
      {loading && <Loader />}
      <div className="budget">
        <div className="allbudgets">
          <h2>List of budgets</h2>
          {budgets.length > 0 ? (
            budgets.map((budget) => {
              return (
                <SingleBudget
                  key={budget._id}
                  name={budget.name}
                  value={budget.amount}
                  deleteBtn={deleteBudget}
                  id={budget._id}
                  token={accessToken}
                />
              );
            })
          ) : (
            <p>No budget to display</p>
          )}
        </div>
        <div className="submit_budget">
          <h2>Submit Budget Items</h2>
          <form onSubmit={handleSubmit}>
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

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Budget;
