import { Link } from 'react-router-dom';
import './Dangky.css';
import book from './book-bonen.png';
import axios from 'axios';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query'; 
import { useAuthContext } from '../../../../context/AuthContext';

const Dangky = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');
  const {setAuthUser} = useAuthContext()

  const queryClient = useQueryClient(); 

  const handleDangKy = async (e) => {
    e.preventDefault();


    if (!username || !email || !matKhau) {
      setThongBao('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', {
        username: username,
        email: email,
        matKhau: matKhau,
      });

      setThongBao('Đăng ký thành công!');

    
      queryClient.invalidateQueries({ queryKey: ['authUser'] });

      const data = response.data; 
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);

    } catch (error) {
      if (error.response) {
        console.error('Lỗi từ server:', error.response.data);
        setThongBao(error.response.data.message || 'Lỗi đăng ký. Vui lòng thử lại!');
      } else {
        console.error('Lỗi không xác định:', error.message);
        setThongBao('Lỗi không xác định. Vui lòng thử lại sau!');
      }
    }
  };

  return (
    <div className="dangky-container">
      <div className="dangky-left">
        <h2>Chào mừng bạn <br /> đến với <br /> Thế giới của <br /> những trang sách!</h2>
        <img src={book} className="books-image" />
      </div>
      <div className="dangky-right">
        <h2>Đăng ký ngay <br /> để bắt đầu đọc truyện</h2>
        <form className="signup-form" onSubmit={handleDangKy}>
          <input
            type="text"
            placeholder="Tên tài khoản"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
          />
          <button type="submit" className="submit-btn">Đăng ký</button>
        </form>
        {thongBao && <p>{thongBao}</p>}
        <Link className="tologin" to="/dangnhap">Bạn đã có tài khoản ?</Link>
      </div>
    </div>
  );
};

export default Dangky;
