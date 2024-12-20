import PropTypes from 'prop-types';
import './CongDongItem.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios'; 

function CongDongItem(props) {
    const { idCongDong, tenCD, thanhVienCD, anhCD } = props;
    const navigate = useNavigate();
    

    const [isJoined, setIsJoined] = useState(false);


    const checkIfJoined = async () => {
        try {
            const response = await Axios.get(`/api/nguoidung/thamgia/congdong/${idCongDong}`);
            setIsJoined(response.data.isJoined); 
        } catch (error) {
            console.error("Error checking join status:", error);
        }
    };

    useEffect(() => {
        checkIfJoined();  
    }, [idCongDong]);

    const xemTrangCongDong = () => {
        const urlTen = tenCD.trim().replace(/\s+/g, '-');
        navigate(`/${urlTen}/tintuc`, { state: { idCongDong: idCongDong } });
    };

    const toggleThamGia = async (e) => {
        e.preventDefault();
        try {
            if (isJoined) {
                await Axios.post(`/api/nguoidung/thamgia/roi/congdong/${idCongDong}`);
                setIsJoined(false); 
            } else {
                await Axios.post(`/api/nguoidung/thamgia/congdong/${idCongDong}`);
                setIsJoined(true); 
            }
        } catch (error) {
            console.error("Error toggling participation:", error);
            alert("Lỗi khi thay đổi trạng thái tham gia: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className='congdong-tk-item'>
            <div className='congdong-tk-img'>
                <img src={anhCD || "https://placehold.co/40x40/FF69B4/FFFFFF"} alt={tenCD || 'Cộng đồng'} />
            </div>
            <div className='congdong-tk-thongtin'>
                <p 
                    className='congdong-tk-ten' 
                    style={{fontSize:'23px', fontWeight:'bold'}} 
                    onClick={xemTrangCongDong}>
                    {tenCD || 'Tên cộng đồng'}
                </p>
                <p>{(thanhVienCD && thanhVienCD.length) || 0} thành viên</p>
            </div>
            <div className='congdong-tk-thamgia'>
                <button onClick={toggleThamGia}>
                    {isJoined ? 'Rời khỏi' : 'Tham gia'}
                </button>
            </div>
        </div>
    );
}

CongDongItem.propTypes = {
    idCongDong: PropTypes.string.isRequired,
    tenCD: PropTypes.string,
    thanhVienCD: PropTypes.array,
    anhCD: PropTypes.string,
};

export default CongDongItem;
