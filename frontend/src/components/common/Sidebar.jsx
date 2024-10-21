import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [hienThiThongBao, setHienThiThongBao] = useState("");

  const xulyThongBao = () => {
    setHienThiThongBao("Hienthi");
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tintuc">Tin Tức</Link>
          </li>
          <li>
            <Link to="/" onClick={() => xulyThongBao()}>Thông Báo</Link>
          </li>
          <li>
            <Link to="/tinnhan">Tin Nhắn</Link>
          </li>
        </ul>
      </nav>

      <div>
        {hienThiThongBao === "Hienthi" && (
          <div id="Thongbao"  style={{ backgroundColor: 'lightyellow'}}>
            <h2>Thông báo</h2>
            <p>Đây là thông báo</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar