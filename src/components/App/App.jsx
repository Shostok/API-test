import { BrowserRouter, Route, Routes } from 'react-router';
import { Users } from '../Users/Users'
import { UserDetails } from '../UserDetails/UserDetails'
import styles from './App.module.css'

export function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

