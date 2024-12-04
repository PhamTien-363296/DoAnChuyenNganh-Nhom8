import BookItem from "../../../common/items/bookitem/BookItem"
import { useState, useEffect } from "react";
import axios from 'axios';

function ListBookTacPham() {
    const [books, setBook] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/truyen/laytheonguoidung');
                const bookName = response.data.map(book => ({
                    id: book._id,
                    tenTruyen: book.tenTruyen,
                    moTaTruyen: book.moTaTruyen,
                    anhTruyen: book.anhTruyen,
                    luotXemTruyen: book.luotXemTruyen,
                    tinhTrangTruyen: book.tinhTrangTruyen,
                    trangThaiTruyen: book.trangThaiTruyen,
                    updatedAt: book.updatedAt,
                }));
                setBook(bookName);
            } catch (error) {
                console.error("Lỗi:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            {books.map((book) => (
                <BookItem
                    key={book.id} 
                    idTruyen={book.id}
                    tenTruyen={book.tenTruyen} 
                    ngayCapNhat={new Date(book.updatedAt)} 
                    chuong="1" 
                    luotXem={book.luotXemTruyen}
                    tinhTrang={book.tinhTrangTruyen}
                    soSao="4.5" 
                    moTa={book.moTaTruyen}
                    trangThai={book.trangThaiTruyen}
                    imgSrc={book.anhTruyen}
                />
            ))}
        </>
    )
}

export default ListBookTacPham