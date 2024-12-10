import BookCard from "../../../common/cards/bookcard/BookCard";
import PropTypes from 'prop-types';

function ListBookDanhMuc({bookList}) {

    return (
        <>
            {bookList.length === 0 ? (
                <div>Không có sách nào trong danh mục này.</div>
            ) : (
                bookList.map((book, index) => (
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

ListBookDanhMuc.propTypes = {
    bookList: PropTypes.array,
};

export default ListBookDanhMuc;
