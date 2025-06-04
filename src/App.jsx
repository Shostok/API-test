import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import UserDetails from './components/UserDetails';
import Users from './components/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
