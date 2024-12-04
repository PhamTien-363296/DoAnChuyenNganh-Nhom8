import BookCard from "../../../common/cards/bookcard/BookCard";
import { useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function ListBookDanhMuc() {
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { theloaiId } = location.state || {};

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                console.log("theloaiId", theloaiId )
                let response;
                if (theloaiId !== 'all') {
                    response = await axios.get(`/api/truyen/laytheotheloai/${theloaiId}`);
                } else {
                    response = await axios.get(`/api/truyen/`);
                }
                console.log("Dữ liệu trả về từ API:", response.data);
                setBookList(response.data);
                setLoading(false);
            } catch (error) {
                setError("Có lỗi khi lấy danh sách sách.", error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, [theloaiId]);

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                        soSao={5}
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
    theloaiId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ListBookDanhMuc;
