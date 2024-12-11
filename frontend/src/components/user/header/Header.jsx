import { Link } from 'react-router-dom';
import './Header.css'
import { HiMagnifyingGlass } from "react-icons/hi2";
import axios from 'axios';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../../context/AuthContext';

export default function Searchmain({ setTimKiem,setdsGoiYCongDong, setdsGoiYTruyen,setdsGoiYTacGia, setLoading, setError, handleKeyPress }) {

    const { authUser } = useAuthContext();

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setTimKiem(value);
        if (value.trim() === '') {
            setdsGoiYTruyen([]);
            setdsGoiYTacGia([]);
            setdsGoiYCongDong([]);
            setTimKiem('');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`/api/truyen/search/goiy?search=${value}`);
            setdsGoiYTruyen(response.data.goiYTruyen || []);
            setdsGoiYTacGia(response.data.goiYTacGia || []);
            setdsGoiYCongDong(response.data.goiYCongDong || [])
        } catch (error) {
            setError('Có lỗi khi tìm kiếm. Vui lòng thử lại.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="header-container">
            <div className="search-container">
                <HiMagnifyingGlass className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm..."
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
            </div>

            <div className="profile-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to="/taikhoan/baiviet">
                    <div className='profile-container-img'>
                        <img src={authUser.anhDaiDienND ||"https://placehold.co/20x10"} style={{ borderRadius: '30px' }} />
                    </div>
                </Link>
            </div>
        </header>
    );
}

Searchmain.propTypes = {
    setTimKiem: PropTypes.func,
    setdsGoiYTruyen: PropTypes.func,
    setdsGoiYTacGia: PropTypes.func,
    setdsGoiYCongDong: PropTypes.func,
    setLoading: PropTypes.func,
    setError: PropTypes.func,
    handleKeyPress: PropTypes.func,
};
