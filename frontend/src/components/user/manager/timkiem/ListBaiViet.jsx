import PropTypes from 'prop-types';
import TacGiaItem from '../../common/items/tacgiaitem/TacGiaItem';

function ListBaiViet({ketQua}) {

    return (
        <>
            {ketQua.length === 0 ? (
                <div>Không có kết quả nào.</div>
            ) : (
                ketQua.map((book, index) => (
                    <TacGiaItem 
                        key={index}
                        id={book._id}
                        tieuDe={book.tenTruyen}
                        soSao={book.trungBinhSao}
                        trangThai={book.tinhTrangTruyen}
                        luotXem={book.luotXemTruyen}
                        imgSrc={book.anhTruyen}
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
