
import PropTypes from 'prop-types';
import BookCard from '../../common/cards/bookcard/BookCard';

function ListTruyen({ketQua}) {

    return (
        <>
            {ketQua.length === 0 ? (
                <div>Không có kết quả nào.</div>
            ) : (
                ketQua.map((book, index) => (
                    <BookCard 
                        key={index}
                        id={book._id}
                        tieuDe={book.tenTruyen}
                        soSao='null'
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
};

export default ListTruyen;
