import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Users from './components/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        {/* <Route path="about" element={<UserDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
