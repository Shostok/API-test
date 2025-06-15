import { Button } from '../Button/Button';

export const SearchBar = ({ onChange, placeholder }) => {
  return (
    <>
      <input
        onChange={e => console.log(e.target.value)}
        type="text"
        placeholder={placeholder}
      />
      <Button>Поиск</Button>
    </>
  );
};
