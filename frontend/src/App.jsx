import './App.css'

import { Routes, Route } from 'react-router-dom';

import Trangchu from './pages/sidebar/Trangchu';
import Tintuc from './pages/sidebar/Tintuc';
import Tinnhan from './pages/sidebar/Tinnhan';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Trangchu />} />
      <Route path="/tintuc" element={<Tintuc />} />
      <Route path="/tinnhan" element={<Tinnhan />} />
    </Routes>
  )
}

export default App
