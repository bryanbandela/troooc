import './SingleTip.css';

function SingleTip({ title, paragraph, username }) {
  return (
    <div className="single_tip">
      <h3>{title}</h3>
      <p>{paragraph} </p>
      <h6>By {username}</h6>
    </div>
  );
}

export default SingleTip;
