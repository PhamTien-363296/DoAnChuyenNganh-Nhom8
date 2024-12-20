import './Style.css'
import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'; 

function ChuongItem(props) {
    const {stt,idChuong, tenChuong, trangThai, ngay } = props;

    ChuongItem.propTypes = {
        stt: PropTypes.number.isRequired,
        idChuong: PropTypes.string.isRequired,
        tenChuong: PropTypes.string.isRequired,
        trangThai: PropTypes.string.isRequired,
        ngay: PropTypes.instanceOf(Date).isRequired,
    };

    const navigate = useNavigate();
    const SuaChuongClick = () => {
        console.log('Sửa chương:', idChuong);

        navigate('/suachuong', { state: { idChuong: idChuong } });
    };

    return (
        <div className="chuong-book-item" onClick={SuaChuongClick} style={{cursor:'pointer'}}>
            <p className="chuong-book-item-tieude">Chương {stt}: {tenChuong}</p>
            <div className="chuong-book-item-thongtin">
                <p className="chuong-book-item-trangthai" style={{ textTransform: 'uppercase' }}>{trangThai}</p>
                <p className="chuong-book-item-trangthai">-</p>
                <p className="chuong-book-item-ngay">{moment(ngay).format('DD/MM/YYYY, HH:mm')}</p>
            </div>
        </div>
    )
}

export default ChuongItem