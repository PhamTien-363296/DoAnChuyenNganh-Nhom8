import './App.css'

import { Routes, Route } from 'react-router-dom';

import Trangchu from './pages/sidebar/Trangchu';
import Tintuc from './pages/sidebar/Tintuc';
import Tinnhan from './pages/sidebar/Tinnhan';
import Home from './pages/admin/Home';
import Baocao from './pages/admin/Baocao';
import Chat from './pages/admin/Chat';
import Account from './pages/admin/Account';


function App() {
  return (
    <Routes>
      {/* trangchinh */}
      <Route path="/" element={<Trangchu />} />
      <Route path="/tintuc" element={<Tintuc />} />
      <Route path="/tinnhan" element={<Tinnhan />} />


      {/* trang admin */}
      <Route path="/adminhome" element={<Home/>} />
      <Route path="/baocao" element={<Baocao/>} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="/account" element={<Account/>} />
    </Routes>
  )
}


export default App
