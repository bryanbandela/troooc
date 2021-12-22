import './SingleBudget.css';
import { FaRegTrashAlt } from 'react-icons/fa';

function BudgetDiv({ name, value, deleteBtn, id, token }) {
  console.log('Here is the id of the budget', id);
  return (
    <div className="single_budget">
      <p>
        {name}: <span>R{value}</span>
      </p>
      <button onClick={() => deleteBtn(id, token)}>
        <FaRegTrashAlt />
      </button>
    </div>
  );
}

export default BudgetDiv;
