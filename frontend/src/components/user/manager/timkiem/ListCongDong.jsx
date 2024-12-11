import PropTypes from 'prop-types';
import CongDongItem from '../../common/items/congdongitem/CongDongItem';

function ListCongDong({ketQua = []}) {

    return (
        <>
            {ketQua.length === 0 ? (
                <div>Không có kết quả nào.</div>
            ) : (
                ketQua.map((congdong, index) => (
                    <CongDongItem
                    key={index}
                    idCongDong={congdong._id}
                    tenCD={congdong.tenCD}
                    thanhVienCD={congdong.thanhVienCD}
                    anhCD={congdong.anhCD}
                />
                ))
            )}
        </>
    );
}

ListCongDong.propTypes = {
    ketQua: PropTypes.array,
};

export default ListCongDong;
