import './Dangnhap.css';

function Dangnhap() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Chào mừng bạn đã quay lại</h2>
        <p>Thế giới của những trang sách!</p>
        <div className="bear-icon">🐻</div>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Mật khẩu" required />
          <button type="submit">
            <span>&#10140;</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dangnhap;