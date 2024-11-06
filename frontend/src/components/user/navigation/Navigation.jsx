import { Link, useLocation } from "react-router-dom";
import './Navigation.css'

const Navmain = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="nav-taikhoan">
      <ul className="navlist">
        <li className="navrow">
          <Link to="/taikhoan/baiviet" className={isActive("/taikhoan/baiviet")}>Bài viết</Link>
        </li>
        <li className="navrow">
          <Link to="/taikhoan/tacpham" className={isActive("/taikhoan/tacpham")}>Tác phẩm</Link>
        </li>
        <li className="navrow">
          <Link to="/taikhoan/lichsu" className={isActive("/taikhoan/lichsu")}>Lịch sử</Link>
        </li>
        <li className="navrow">
          <Link to="/taikhoan/yeuthich" className={isActive("/taikhoan/yeuthich")}>Yêu thích</Link>
        </li>
        <li className="navrow">
          <Link to="/taikhoan/vitien" className={isActive("/taikhoan/vitien")}>Ví tiền</Link>
        </li>
        <li className="navrow">
          <Link to="/taikhoan/baocao" className={isActive("/taikhoan/baocao")}>Báo cáo</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navmain