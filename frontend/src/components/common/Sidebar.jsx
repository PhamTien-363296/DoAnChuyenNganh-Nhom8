import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";

//Import css
import '../../assets/css/Sidebar.css'

// Import icon
import { 
  HiOutlineHome, 
  HiOutlineUserGroup, 
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineBell
} from "react-icons/hi2";

import { HiOutlineLogout } from "react-icons/hi";

export default function Sidebar() {
    const [hienThiThongBao, setHienThiThongBao] = useState(false);

    const xulyThongBao = () => {
        setHienThiThongBao(prev => !prev);
    };

    const handleClickOutside = (event) => {
        // Kiểm tra xem nhấp chuột có nằm ngoài thông báo hay không
        if (!event.target.closest('.thongbao_button') && 
            !event.target.closest('#Thongbao')) {
            setHienThiThongBao(false); 
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

  return (
    <>
      <nav className="Sidebar">
        <ul className="SidebarList">
          <li className="SidebarRow">
            <Link to="/"><HiOutlineHome /></Link>
          </li>
          <li className="SidebarRow">
            <Link to="/tintuc"><HiOutlineUserGroup /></Link>
          </li>
          <li className="SidebarRow">
            <div className="thongbao_button" onClick={xulyThongBao}>
              <HiOutlineBell />
            </div>
          </li>
          <li className="SidebarRow">
            <Link to="/tinnhan"><HiOutlineChatBubbleOvalLeftEllipsis /></Link>
          </li>
          <li className="SidebarRow LogoutRow">
            <Link to="/"><HiOutlineLogout /></Link>
          </li>
        </ul>
      </nav>

      <div>
        {hienThiThongBao && (
          <div 
            id="Thongbao">
            <h2>Thông báo</h2>
            <p>Đây là thông báo</p>
          </div>
        )}
      </div>
    </>
  );
};
