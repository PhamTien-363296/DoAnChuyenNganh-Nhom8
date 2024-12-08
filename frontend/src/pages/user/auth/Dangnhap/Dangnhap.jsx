import { useState } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query'; 
import './Dangnhap.css';
import { useAuthContext } from '../../../../context/AuthContext';

function Dangnhap() {
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');
  const {setAuthUser} = useAuthContext()

  const queryClient = useQueryClient(); 

  const handleDangNhap = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        email: email,
        matKhau: matKhau,
      });
      
  
      setThongBao('Đăng nhập thành công');
      console.log(response.data);

      const data = response.data; 
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);

  
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    } catch (error) {
      if (error.response) {
        console.error('Lỗi từ server:', error.response.data);
        setThongBao(error.response.data.message || 'Lỗi đăng nhập. Vui lòng thử lại!');
      } else {
        console.error('Lỗi không xác định:', error.message);
        setThongBao('Lỗi không xác định. Vui lòng thử lại sau!');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Chào mừng bạn đã quay lại</h2>
        <p>Thế giới của những trang sách!</p>
        <div className="bear-icon">🐻</div>
        <form onSubmit={handleDangNhap}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            required
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
          />
          <button type="submit">
            <span>&#10140;</span>
          </button>
        </form>
        {thongBao && <p className="thongBao">{thongBao}</p>}
      </div>
    </div>
  );
}

export default Dangnhap;
