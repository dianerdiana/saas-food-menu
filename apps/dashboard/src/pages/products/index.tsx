import { Link } from 'react-router-dom';

export default function ProductListPage() {
  return (
    <div>
      <h1>Product List Page</h1>
      <Link to={'/stores/create'}>Create Store</Link>
    </div>
  );
}
