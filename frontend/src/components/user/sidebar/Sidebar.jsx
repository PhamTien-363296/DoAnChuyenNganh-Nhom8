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
    const [thongBao, setThongBao] = useState([]); // Chứa danh sách thông báo
    const [hienThiThongBao, setHienThiThongBao] = useState(false);
    const { setAuthUser } = useAuthContext();
    const location = useLocation();
    const queryClient = useQueryClient(); 

    // Hàm lấy danh sách thông báo từ API
    const layThongBao = async () => {
        try {
            const response = await axios.get('/api/nguoidung/lay/thongbao');
            console.log('Dữ liệu thông báo: ', response.data); // Log kiểm tra dữ liệu
            setThongBao(response.data.thongBao); // Gán dữ liệu mảng thông báo
        } catch (error) {
            console.error("Lỗi khi lấy thông báo:", error);
        }
    };

    // Hàm xử lý đăng xuất
    const handleDangXuat = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/logout');
            console.log(response.data); // Log kiểm tra dữ liệu đăng xuất
            queryClient.invalidateQueries('authUser');
            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
        }
    };

    // Xử lý mở/đóng giao diện thông báo
    const xulyThongBao = () => {
        setHienThiThongBao((prev) => !prev);
        if (!hienThiThongBao) {
            layThongBao(); // Lấy danh sách thông báo khi mở
        }
    };

    // Đóng giao diện thông báo khi click ngoài
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
                        {thongBao.length > 0 ? (
                            <div>
                                {thongBao.map((tb, index) => (
                                    <div key={index} className="notification-item">
                                        <p>
                                            <strong>{tb.loaiThongBao}</strong>: {tb.noiDungTB}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Không có thông báo nào</p>
                        )}
                    </div>
                )}
            </div>  
        </>
    );
}
