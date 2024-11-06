import { useState, useEffect } from "react"; 
import { Link, useLocation } from "react-router-dom";

// Import css
import './Sidebar.css'

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
    const location = useLocation(); // Lấy đường dẫn hiện tại

    const xulyThongBao = () => {
        setHienThiThongBao(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.thongbao_button') && 
            !event.target.closest('#Thongbao')) {
            setHienThiThongBao(false); 
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Hàm để kiểm tra xem đường dẫn hiện tại có phải là của liên kết không
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <>
            <nav className="Sidebar">
                <ul className="SidebarList">
                    <li className="SidebarRow">
                        <Link to="/" className={isActive("/")}>
                            <HiOutlineHome />
                        </Link>
                    </li>
                    <li className="SidebarRow">
                        <Link to="/tintuc" className={isActive("/tintuc")}>
                            <HiOutlineUserGroup />
                        </Link>
                    </li>
                    <li className="SidebarRow">
                        <div className="thongbao_button" onClick={xulyThongBao}>
                            <HiOutlineBell />
                        </div>
                    </li>
                    <li className="SidebarRow">
                        <Link to="/tinnhan" className={isActive("/tinnhan")}>
                            <HiOutlineChatBubbleOvalLeftEllipsis />
                        </Link>
                    </li>
                    <li className="SidebarRow LogoutRow">
                        <Link to="/dangnhap" className={isActive("/dangnhap")}>
                            <HiOutlineLogout />
                        </Link>
                    </li>
                </ul>
            </nav>

            <div>
                {hienThiThongBao && (
                    <div id="Thongbao">
                        <h2>Thông báo</h2>
                        <p>Đây là thông báo</p>
                    </div>
                )}
            </div>
        </>
    );
};
