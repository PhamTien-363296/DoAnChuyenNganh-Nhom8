import { Link } from 'react-router-dom';
import './Header.css'
import { HiMagnifyingGlass } from "react-icons/hi2";
import axios from 'axios';
import PropTypes from 'prop-types';

export default function Searchmain({ setTimKiem, setdsGoiYTruyen,setdsGoiYTacGia, setLoading, setError, handleKeyPress }) {

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setTimKiem(value);
        if (value.trim() === '') {
            setdsGoiYTruyen([]);
            setdsGoiYTacGia([]);
            setTimKiem('');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`/api/truyen/search/goiy?search=${value}`);
            setdsGoiYTruyen(response.data.goiYTruyen || []);
            setdsGoiYTacGia(response.data.goiYTacGia || []);
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
                    <img src="https://placehold.co/40x40/FF69B4/FFFFFF" style={{ borderRadius: '30px' }} />
                </Link>
            </div>
        </header>
    );
}

Searchmain.propTypes = {
    setTimKiem: PropTypes.func.isRequired,
    setdsGoiYTruyen: PropTypes.func.isRequired,
    setdsGoiYTacGia: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
};
