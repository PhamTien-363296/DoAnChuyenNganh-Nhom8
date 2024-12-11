import PropTypes from 'prop-types';
import './CongDongItem.css'
import { useNavigate } from 'react-router-dom';

function CongDongItem(props) {
    const { idCongDong, tenCD, thanhVienCD, anhCD } = props;
    const navigate = useNavigate();

    const xemTrangCongDong = () => {
        const urlTen = tenCD.trim().replace(/\s+/g, '-');
        navigate(`/${urlTen}/tintuc`, { state: { idCongDong: idCongDong } });
    };
    return (
        <div className='congdong-tk-item'>
            <div className='congdong-tk-img'>
                <img src={anhCD || "https://placehold.co/40x40/FF69B4/FFFFFF"} alt={tenCD || 'Cộng đồng'} />
            </div>
            <div className='congdong-tk-thongtin'>
                <p 
                    className='congdong-tk-ten' 
                    style={{fontSize:'23px', fontWeight:'bold'}} onClick={xemTrangCongDong}>{tenCD || 'Tên cộng đồng'}</p>
                <p>{(thanhVienCD && thanhVienCD.length) || 0} thành viên</p>
            </div>
            <div className='congdong-tk-thamgia'>
                <button>Tham gia</button>
            </div>
        </div>
    )
}
CongDongItem.propTypes = {
    idCongDong: PropTypes.string.isRequired,
    tenCD: PropTypes.string,
    thanhVienCD:  PropTypes.array,
    anhCD: PropTypes.string,
};

export default CongDongItem