// UserDetails.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams(); // Получаем id из URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
      <Link to="/users">Back to Users</Link>
    </div>
  );
}

export default UserDetails;
