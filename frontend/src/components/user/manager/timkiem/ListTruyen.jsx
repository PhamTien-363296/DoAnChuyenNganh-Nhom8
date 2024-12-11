
import PropTypes from 'prop-types';
import BookCard from '../../common/cards/bookcard/BookCard';

function ListTruyen({ketQua = [], soLuongHienThi}) {

    return (
        <>
            {ketQua.length === 0 ? (
                <div>Không có kết quả nào.</div>
            ) : (
                ketQua.slice(0, soLuongHienThi).map((book, index) => (
                    <BookCard 
                        key={index}
                        id={book._id}
                        tieuDe={book.tenTruyen}
                        soSao={book.danhGia.trungBinhSao}
                        trangThai={book.tinhTrangTruyen}
                        luotXem={book.luotXemTruyen}
                        imgSrc={book.anhTruyen}
                    />
                ))
            )}
        </>
    );
}

ListTruyen.propTypes = {
    ketQua: PropTypes.array,
    soLuongHienThi: PropTypes.number
};

export default ListTruyen;
