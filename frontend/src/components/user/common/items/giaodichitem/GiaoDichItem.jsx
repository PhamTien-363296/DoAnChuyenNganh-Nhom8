import PropTypes from 'prop-types';
import moment from 'moment';

function GiaoDichItem(props) {
    const { loaiGiaoDich, createdAt, noiDungGD, dongTien, soLuongXuGD } = props;

    return (
        <div className="giaodich-item">
            <p style={{ fontWeight: 'bold' }}>
                {loaiGiaoDich === 'NapXu' 
                    ? 'NẠP XU' 
                    : loaiGiaoDich === 'MuaChuong' 
                    ? 'MUA CHƯƠNG' 
                    : loaiGiaoDich === 'HoaHong' 
                    ? 'HOA HỒNG' 
                    : loaiGiaoDich === 'DiemDanh' 
                    ? 'ĐIỂM DANH' 
                    : ''}
            </p>
            <p>{moment(createdAt).format('DD/MM/YYYY, HH:mm')}</p>
            <p>{noiDungGD}</p>
            <p style={{margin: 'auto', fontWeight: 'bold'}}>
                {dongTien === 'Cộng' ? `+ ${soLuongXuGD}` : `- ${soLuongXuGD}`} XU
            </p>
        </div>
    )
}

GiaoDichItem.propTypes = {
    loaiGiaoDich: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    noiDungGD: PropTypes.string.isRequired,
    dongTien: PropTypes.string.isRequired,
    soLuongXuGD: PropTypes.number.isRequired,
};

export default GiaoDichItem