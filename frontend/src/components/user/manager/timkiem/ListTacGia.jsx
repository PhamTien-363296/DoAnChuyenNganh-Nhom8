import PropTypes from 'prop-types';
import TacGiaItem from '../../common/items/tacgiaitem/TacGiaItem';

function ListTacGia({ketQua = []}) {

    return (
        <>
            {ketQua.length === 0 ? (
                <div>Không có kết quả nào.</div>
            ) : (
                ketQua.map((tg, index) => (
                    <TacGiaItem 
                        key={index}
                        idTacGia={tg._id}
                        anhDaiDienND={tg?.anhDaiDienND}
                        username={tg?.username || 'Tên người dùng'}
                        slTheoDoi={tg?.nguoiTheoDoiND?.length}
                    />
                ))
            )}
        </>
    );
}

ListTacGia.propTypes = {
    ketQua: PropTypes.array,
};

export default ListTacGia;