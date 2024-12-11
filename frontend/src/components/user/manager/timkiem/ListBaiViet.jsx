import PropTypes from 'prop-types';
import BaiVietItem from '../../common/items/baivietitem/BaiVietItem';

function ListBaiViet({ketQua = []}) {

    return (
        <>
            {ketQua.length === 0 ? (
                <div>Không có kết quả nào.</div>
            ) : (
                ketQua.map((baiviet, index) => (
                    <BaiVietItem 
                        key={index}
                        noiDungBV={baiviet.noiDungBV}
                        luotThichBV={baiviet?.cacluotThich?.length}
                        binhLuanBV={baiviet.binhLuanBV}
                        nguoiDungIdBV={baiviet.nguoiDungIdBV}
                        username={baiviet?.nguoiDungIdBV?.username }
                        tenCD={baiviet.thuocCD ? baiviet.thuocCD.tenCD : null}
                        hinhAnh={baiviet.hinhAnhBV}
                        baiVietId={baiviet._id}
                        baiviet={baiviet}
                    />
                ))
            )}
        </>
    );
}

ListBaiViet.propTypes = {
    ketQua: PropTypes.array,
};


export default ListBaiViet;
