import PropTypes from 'prop-types';
import './TacGiaItem.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function TacGiaItem(props) {
    const { idTacGia, anhDaiDienND, username, slTheoDoi } = props;
    const [daTheoDoi, setDaTheoDoi] = useState(false); // Trạng thái theo dõi
    const navigate = useNavigate();

    // Kiểm tra trạng thái theo dõi ban đầu
    useEffect(() => {
        async function kiemTraTheoDoi() {
            try {
                const response = await Axios.get(`/api/nguoidung/lay/cotheodoi/${idTacGia}`);
                setDaTheoDoi(response.data.isFollowing); // Cập nhật trạng thái theo API
            } catch (error) {
                console.error('Lỗi khi kiểm tra trạng thái theo dõi:', error);
            }
        }
        kiemTraTheoDoi();
    }, [idTacGia]);

    const xemTrangCaNhan = () => {
        const urlTen = username.trim().replace(/\s+/g, '-');
        navigate(`/${urlTen}`, { state: { idNguoiDung: idTacGia } });
    };

    const toggleTheoDoi = async (e) => {
        e.preventDefault();
        try {
            if (daTheoDoi) {
                // Hủy theo dõi
                await Axios.post(`/api/nguoidung/unfollow/${idTacGia}`);
            } else {
                // Theo dõi
                await Axios.post(`/api/nguoidung/follow/${idTacGia}`);
            }
            setDaTheoDoi(!daTheoDoi); // Cập nhật trạng thái
        } catch (error) {
            console.error("Lỗi khi thay đổi trạng thái theo dõi:", error);
            alert("Lỗi khi thay đổi trạng thái theo dõi: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="tacgia-item">
            <div className="tacgia-item-container">
                <div className="tacgia-item-avata">
                    <img src={anhDaiDienND || 'https://placehold.co/129x203'} alt={username} />
                </div>
                <div className="tacgia-item-noidung">
                    <p className='tacgia-item-noidung-ten' onClick={xemTrangCaNhan}>{username}</p>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        <p style={{ fontSize: '15px', margin: '0' }}>{slTheoDoi || 0} người theo dõi</p>
                    </div>
                </div>
                <div className="tacgia-item-theodoi">
                    <button onClick={toggleTheoDoi}>
                        {daTheoDoi ? 'Đã theo dõi' : 'Theo dõi'}
                    </button>
                </div>
            </div>
        </div>
    );
}

TacGiaItem.propTypes = {
    idTacGia: PropTypes.string.isRequired,
    anhDaiDienND: PropTypes.string,
    username: PropTypes.string,
    slTheoDoi: PropTypes.number,
};

export default TacGiaItem;