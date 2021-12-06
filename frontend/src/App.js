import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Tip from './screens/Tip';
import Budget from './screens/Budget';
import Profile from './screens/Profile';
import SingleTransaction from './screens/SingleTransaction';
import UpdateProfile from './screens/UpdateProfile';
import DeleteProfile from './screens/DeleteProfile';
import TransactionState from './context/transaction/TransactionState';
import UserState from './context/user/UserState';

function App() {
  return (
    <>
      <UserState>
        <TransactionState>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<SingleTransaction />} />
            <Route path="/tips" element={<Tip />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/profile/delete" element={<DeleteProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/:id" element={<SingleTransaction />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </TransactionState>
      </UserState>
    </>
  );
}

export default App;
