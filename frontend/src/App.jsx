import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
import Dangnhap from './pages/user/auth/Dangnhap/Dangnhap.jsx';
import Dangky from './pages/user/auth/Dangky/Dangky';
import Baiviet from './pages/user/taikhoan/baiviet/Baiviet';
import Tacpham from './pages/user/taikhoan/tacpham/TacPham';
import Lichsu from './pages/user/taikhoan/lichsu/LichSu';
import Yeuthich from './pages/user/taikhoan/yeuthich/YeuThich';
import Vitien from './pages/user/taikhoan/vitien/ViTien';
import Baocao from './pages/user/taikhoan/baocao/BaoCao';

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/auth/getme');
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <Routes>

      <Route path="/" element={authUser ? <Trangchu /> : <Navigate to="/dangky" />} />


      <Route path="/tintuc" element={<Tintuc />} />
      <Route path="/tinnhan" element={<Tinnhan />} />
      <Route path="/theloai" element={<Danhmuc />} />
      <Route path="/taikhoan/baiviet" element={<Baiviet />} />
      <Route path="/taikhoan/tacpham" element={<Tacpham />} />
      <Route path="/taikhoan/lichsu" element={<Lichsu />} />
      <Route path="/taikhoan/yeuthich" element={<Yeuthich />} />
      <Route path="/taikhoan/vitien" element={<Vitien />} />
      <Route path="/taikhoan/baocao" element={<Baocao />} />

      {/* Các trang truyện */}
      <Route path="/chitiettruyen" element={<Chitiettruyen />} />
      <Route path="/viettruyen" element={<Viettruyen />} />
      <Route path="/taotruyen" element={<Taotruyen />} />

      {/* Trang đăng nhập và đăng ký */}
      <Route path="/dangky" element={!authUser ? <Dangky /> : <Navigate to="/" />} />
      <Route path="/dangnhap"  element={!authUser ? <Dangnhap /> : <Navigate to="/" />} />

      {/* Trang quản trị */}
      <Route path="/adminhome" element={<Home />} />
      <Route path="/baocao" element={<Baocao />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
