import './Transaction.css';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

function Transaction({ type, category, name, date, amount, id }) {
  return (
    <div className="transaction">
      <Link to={`/home/${id}`}>
        <div
          className="transaction_category"
          style={{
            backgroundColor:
              category === 'Beauty'
                ? 'pink'
                : category === 'Donation'
                ? 'grey'
                : category === 'Food'
                ? 'lightgreen'
                : category === 'Tax'
                ? 'lightblue'
                : category === 'Offering'
                ? 'salmon'
                : category === 'Transport'
                ? 'lime'
                : type === 'Income'
                ? 'gold'
                : 'black',
          }}
        >
          {category.toString()[0].toUpperCase()}
        </div>
        <div className="name_date">
          <div>
            <h4>
              {category} : {name}
            </h4>
            <p>{format(parseISO(date), 'yyyy-MM-dd')}</p>
          </div>
          <p
            className="expense"
            style={{
              color:
                type === 'Outcome' || type === 'withdrawal'
                  ? 'crimson'
                  : '#0fdd65',
            }}
          >
            {type === 'Outcome' ? '-' : ''}R{amount}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Transaction;
