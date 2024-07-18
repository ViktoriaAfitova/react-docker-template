import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const getAllUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3002/users/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3002/users', { name, location });
      getAllUsers();
      setName('');
      setLocation('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='App'>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          required
        />
        <input
          type='text'
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder='Location'
          required
        />
        <button type='submit'>Add user</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
