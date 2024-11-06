import './Dangky.css';
import book from './book-bonen.png'

const Dangky = () => {
  return (
    <div className="dangky-container">
      <div className="dangky-left">
        <h2>Chào mừng bạn <br /> đến với <br /> Thế giới của <br /> những trang sách!</h2>
        <img src={book}  className="books-image" />
      </div>
      <div className="dangky-right">
        <h2>Đăng ký ngay <br /> để bắt đầu đọc truyện</h2>
        <form className="signup-form">
          <input type="text" placeholder="Tên tài khoản" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mật khẩu" />
          <button type="submit" className="submit-btn">Đăng ký</button>
        </form>
      </div>
    </div>
  );
};

export default Dangky;
