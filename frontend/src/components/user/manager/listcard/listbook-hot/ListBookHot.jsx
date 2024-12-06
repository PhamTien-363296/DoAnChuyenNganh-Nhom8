import BookCard from "../../../common/cards/bookcard/BookCard";
import { useState, useEffect } from "react";
import axios from 'axios';

function ListBookHot() {
    const [dsTruyen, setdsTruyen] = useState([]);

    useEffect(() => {
        const layTruyen = async () => {
            try {
                const response = await axios.get('/api/truyen/lay/trangchu/hot');
                console.log(response.data);
                setdsTruyen(response.data.truyen);
            } catch (error) {
                console.error("Có lỗi khi lấy truyện:", error);
            }
        };
    
        layTruyen();
    }, []);
    return (
        <>
            {dsTruyen.map((book, index) => (
                <BookCard 
                    key={index}
                    id={book._id}
                    tieuDe={book.tenTruyen}
                    soSao={book.soSao}
                    trangThai={book.tinhTrangTruyen}
                    luotXem={book.luotXemTruyen}
                    imgSrc={book.anhTruyen}
                />
            ))}
        </>
    );
}

export default ListBookHot;
