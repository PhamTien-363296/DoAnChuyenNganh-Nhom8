import './App.css'

import { Routes, Route } from 'react-router-dom';

import Trangchu from './pages/sidebar/Trangchu';
import Tintuc from './pages/sidebar/Tintuc';
import Tinnhan from './pages/sidebar/Tinnhan';
import Home from './pages/admin/Home';
import Baocao from './pages/admin/Baocao';
import Chat from './pages/admin/Chat';
import Account from './pages/admin/Account';
import Dangky from './pages/auth/Dangky';
import Chitiettruyen from './pages/truyen/Chitiettruyen';
import Viettruyen from './pages/truyen/Viettruyen';
import Taotruyen from './pages/truyen/Taotruyen';
import Dangnhap from './pages/auth/Dangnhap';


function App() {
  return (
    <Routes>
      {/* trangchinh */}
      <Route path="/" element={<Trangchu />} />
      <Route path="/tintuc" element={<Tintuc />} />
      <Route path="/tinnhan" element={<Tinnhan />} />

      <Route path="/chitiettruyen" element={<Chitiettruyen />} />
      <Route path="/viettruyen" element={<Viettruyen />} />
      <Route path="/taotruyen" element={<Taotruyen />} />

      <Route path="/dangky" element={<Dangky/>} />
      <Route path="/dangnhap" element={<Dangnhap/>} />
      {/* trang admin */}
      <Route path="/adminhome" element={<Home/>} />
      <Route path="/baocao" element={<Baocao/>} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="/account" element={<Account/>} />
      
    </Routes>
  )
}


export default App
