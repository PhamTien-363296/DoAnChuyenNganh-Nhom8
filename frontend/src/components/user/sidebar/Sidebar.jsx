import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query'; 

import './Sidebar.css';

import { 
  HiOutlineHome, 
  HiOutlineUserGroup, 
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineBell
} from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuthContext } from "../../../context/AuthContext";

export default function Sidebar() {
    const [thongBao, setThongBao] = useState('');
    const [hienThiThongBao, setHienThiThongBao] = useState(false);
    const {setAuthUser} = useAuthContext()
    const location = useLocation();
    const queryClient = useQueryClient(); 

    const handleDangXuat = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/api/auth/logout');
          setThongBao('Đăng xuất thành công');
          console.log(response.data);

        
          queryClient.invalidateQueries('authUser');

          const data = response.data; 
          localStorage.removeItem("chat-user")
          setAuthUser(data);

        } catch (error) {
          if (error.response) {
            console.error('Lỗi từ server:', error.response.data);
            setThongBao(error.response.data.message || 'Lỗi đăng xuất. Vui lòng thử lại!');
          } else {
            console.error('Lỗi không xác định:', error.message);
            setThongBao('Lỗi không xác định. Vui lòng thử lại sau!');
          }
        }
    };

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
                        <div onClick={handleDangXuat}>
                            <HiOutlineLogout />
                        </div>
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
                {thongBao && <p className="thongBao">{thongBao}</p>}
            </div>
        </>
    );
}
