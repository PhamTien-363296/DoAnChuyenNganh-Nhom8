import './App.css'

import { Routes, Route } from 'react-router-dom';


import Home from './pages/admin/Home';
import Chat from './pages/admin/Chat';
import Account from './pages/admin/Account';
import Chitiettruyen from './pages/user/truyen/chitiettruyen/Chitiettruyen';
import Viettruyen from './pages/user/truyen/viettruyen/Viettruyen';
import Taotruyen from './pages/user/truyen/taotruyen/Taotruyen';

import Trangchu from './pages/user/trangchu/Trangchu';
import Tintuc from './pages/user/tintuc/Tintuc';
import Tinnhan from './pages/user/tinnhan/Tinnhan';
import Danhmuc from './pages/user/danhmuc/Danhmuc';
import Dangnhap from './pages/user/auth/Dangnhap/Dangnhap';
import Dangky from './pages/user/auth/Dangky/Dangky';
import Baiviet from './pages/user/taikhoan/baiviet/Baiviet';
import Tacpham from './pages/user/taikhoan/tacpham/TacPham';
import Lichsu from './pages/user/taikhoan/lichsu/LichSu';
import Yeuthich from './pages/user/taikhoan/yeuthich/YeuThich';
import Vitien from './pages/user/taikhoan/vitien/ViTien';
import Baocao from './pages/user/taikhoan/baocao/BaoCao';



function App() {
  return (
    <Routes>
      {/* trangchinh */}
      <Route path="/" element={<Trangchu />} />
      <Route path="/tintuc" element={<Tintuc />} />
      <Route path="/tinnhan" element={<Tinnhan />} />
      <Route path="/theloai" element={<Danhmuc />} />
      <Route path="/taikhoan/baiviet" element={<Baiviet/>} />
      <Route path="/taikhoan/tacpham" element={<Tacpham/>} />
      <Route path="/taikhoan/lichsu" element={<Lichsu/>} />
      <Route path="/taikhoan/yeuthich" element={<Yeuthich/>} />
      <Route path="/taikhoan/vitien" element={<Vitien/>} />
      <Route path="/taikhoan/baocao" element={<Baocao/>} />

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
