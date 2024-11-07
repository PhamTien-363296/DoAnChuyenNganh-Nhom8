import './Style.css'
import PropTypes from 'prop-types';
import moment from 'moment';

function ChuongItem(props) {
    const {idChuong, tenChuong, trangThai, ngay } = props;

    ChuongItem.propTypes = {
        idChuong: PropTypes.string.isRequired,
        tenChuong: PropTypes.string.isRequired,
        trangThai: PropTypes.string.isRequired,
        ngay: PropTypes.instanceOf(Date).isRequired,
    };

    return (
        <div className="chuong-book-item">
            <p className="chuong-book-item-tieude">{idChuong}{tenChuong}</p>
            <div className="chuong-book-item-thongtin">
                <p className="chuong-book-item-trangthai" style={{ textTransform: 'uppercase' }}>{trangThai}</p>
                <p className="chuong-book-item-trangthai">-</p>
                <p className="chuong-book-item-ngay">{moment({ngay}).format('DD/MM/YYYY, HH:mm')}</p>
            </div>
        </div>
    )
}

export default ChuongItem