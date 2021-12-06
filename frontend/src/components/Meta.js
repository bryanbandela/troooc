import { Helmet } from 'react-helmet';

function Meta({ title, descriptions, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" description={descriptions} />
      <meta name="keywords" description={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: 'troooc | More than a tracker',
  description: 'Track your expenses and get tips',
  keywords: 'Expense tracker, advices, book recommendations',
};

export default Meta;
