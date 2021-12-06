import './SingleBudget.css';

function BudgetDiv({ key, value }) {
  return (
    <div className="single_budget">
      <p>
        {key}: <span>R{value}</span>
      </p>
    </div>
  );
}

export default BudgetDiv;
