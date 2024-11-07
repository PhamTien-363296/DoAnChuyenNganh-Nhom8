import './Style.css'
import PropTypes from 'prop-types';

function ChuongItem(props) {
    const { tenChuong, trangThai, ngay } = props;

    ChuongItem.propTypes = {
        tenChuong: PropTypes.string.isRequired,
        trangThai: PropTypes.string.isRequired,
        ngay: PropTypes.string.isRequired,
    };

    return (
        <div className="chuong-book-item">
            <p className="chuong-book-item-tieude">{tenChuong}</p>
            <div className="chuong-book-item-thongtin">
                <p className="chuong-book-item-trangthai">{trangThai}</p>
                <p className="chuong-book-item-trangthai">-</p>
                <p className="chuong-book-item-ngay">{ngay}</p>
            </div>
        </div>
    )
}

export default ChuongItem