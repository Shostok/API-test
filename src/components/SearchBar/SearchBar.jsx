import { useState } from 'react';
import { Button } from '../Button/Button';

export const SearchBar = ({ onChange, placeholder, users }) => {
  const [value, setValue] = useState('');

  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(value.toLowerCase());
  });

  const handleSubmit = e => {
    e.preventDefault();
    onChange(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={e => setValue(e.target.value)}
          type="text"
          placeholder={placeholder}
          value={value}
        />
        <Button type="submit">Поиск</Button>
      </form>

      <div>
        {filteredUsers.map(user => (
          <div key={user.id}>
            {user.name} ({user.username})
          </div>
        ))}
      </div>
    </div>
  );
};
