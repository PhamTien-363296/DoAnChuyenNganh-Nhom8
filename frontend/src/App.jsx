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
import Dangnhap from './pages/user/auth/Dangnhap/Dangnhap';
import Dangky from './pages/user/auth/Dangky/Dangky';
import Baiviet from './pages/user/taikhoan/baiviet/Baiviet';
import Tacpham from './pages/user/taikhoan/tacpham/Tacpham';
import Lichsu from './pages/user/taikhoan/lichsu/LichSu';
import Yeuthich from './pages/user/taikhoan/yeuthich/YeuThich';
import Vitien from './pages/user/taikhoan/vitien/ViTien';
import Theloai from './pages/admin/theloai/Theloai';
import AdminBaocao from './pages/admin/Baocao';
import SuaTruyen from './pages/user/truyen/suatruyen/SuaTruyen';
import SuaChuong from './pages/user/truyen/suachuong/SuaChuong';
import ChiTietChuong from './pages/user/truyen/chitietchuong/ChiTietChuong';
import TimKiem from './pages/user/timkiem/TimKiem';
import NapXu from './pages/user/taikhoan/napxu/NapXu';
import NapXuThongBao from './pages/user/taikhoan/napxuthongbao/NapXuThongBao';
import ListBaiVietCongDong from './components/user/manager/listbaiviet/ListBaiVietCongDong';
import Trangcanhan from './pages/user/trangcanhan/TrangCaNhan';

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
      <Route path="/" element={authUser ? (authUser.roleND === 'admin' ? <Home /> : <Trangchu />) : <Navigate to="/dangky" />} />
      <Route path="/tintuc" element={<Tintuc />} />
      <Route path="/tinnhan" element={<Tinnhan />} />
      <Route path="/theloai/:tenTheLoai" element={<Danhmuc />} />
      <Route path="/taikhoan/baiviet" element={<Baiviet />} />
      <Route path="/taikhoan/tacpham" element={<Tacpham />} />
      <Route path="/:ten/tintuc" element={<ListBaiVietCongDong/>} />
      <Route path="/taikhoan/lichsu" element={<Lichsu />} />
      <Route path="/taikhoan/yeuthich" element={<Yeuthich />} />
      <Route path="/taikhoan/vitien" element={<Vitien />} />
      <Route path="/search" element={<TimKiem/>} />
      <Route path="/:tenNguoiDung/napxu" element={<NapXu/>} />
      <Route path="/payment-result" element={<NapXuThongBao />} />

      {/* Các trang truyện */}
      <Route path="/chitiettruyen/:tieude" element={<Chitiettruyen />} />
      <Route path="/viettruyen" element={<Viettruyen />} />
      <Route path="/taotruyen" element={<Taotruyen authUser={authUser} />} />
      <Route path="/suatruyen" element={<SuaTruyen />} />
      <Route path="/suachuong" element={<SuaChuong />} />
      <Route path="/:tenTruyen/:tenChuong" element={<ChiTietChuong />} />

      {/* Trang đăng nhập và đăng ký */}
      <Route path="/dangky" element={!authUser ? <Dangky /> : <Navigate to="/" />} />
      <Route path="/dangnhap"  element={!authUser ? <Dangnhap /> : <Navigate to="/" />} />
      <Route path="/:ten" element={<Trangcanhan />} />

      {/* Trang quản trị */}
      <Route path="/adminhome" element={<Home />} />
      <Route path="/adminbaocao" element={<AdminBaocao/>} />
      <Route path="/quanly/theloai" element={<Theloai/>} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
