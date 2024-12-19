import './Navadmin.css';
import PropTypes from 'prop-types'; 
import { AiFillHome } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { HiBookmarkAlt } from "react-icons/hi";
import { RiLogoutBoxFill } from "react-icons/ri";
import axios from 'axios'; // Nhớ import axios
import { useQueryClient } from '@tanstack/react-query'; // Nếu dùng react-query

function Navadmin({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Khởi tạo queryClient nếu dùng react-query

  const handleDangXuat = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/auth/logout');
        console.log(response.data);

        // Xóa cache dữ liệu user
        queryClient.invalidateQueries('authUser'); 
        // Điều hướng về trang đăng ký
        navigate('/dangky'); 
    } catch (error) {
        if (error.response) {
            console.error('Lỗi từ server:', error.response.data);
        } else {
            console.error('Lỗi không xác định:', error.message);
        }
    }
  };

  return (
    <>
      <div className="background">
        <nav className="nav-admin">
          <div className='chao'></div>
        </nav>

        <div className="nav-container">
          <div className="sidebar-admin">
            <ul>
              <li>
                <Link to="/adminhome">
                  <AiFillHome style={{ color: '#482F0B', fontSize: '32px' }} />
                </Link>
              </li>
              <li>
                <Link to="/quanly/theloai">
                  <HiBookmarkAlt style={{ color: '#482F0B', fontSize: '32px' }} />
                </Link>
              </li>
              <li>
                <Link to="/account">
                  <MdAccountCircle style={{ color: '#482F0B', fontSize: '32px' }} />
                </Link>
              </li>
              <li>
                <button
                  onClick={handleDangXuat}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    cursor: 'pointer'
                  }}
                >
                  <RiLogoutBoxFill style={{ color: '#482F0B', fontSize: '32px' }} />
                </button>
              </li>
            </ul>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

Navadmin.propTypes = {
  children: PropTypes.node,
};

export default Navadmin;
