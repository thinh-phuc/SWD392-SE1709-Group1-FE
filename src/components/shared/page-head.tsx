import { Helmet } from 'react-helmet-async';

export default function PageHead({ title = 'Quản trị' }) {
  return (
    <Helmet>
      <title> {title} </title>
    </Helmet>
  );
}
