import BookCard from "../../../common/cards/bookcard/BookCard";
import { useState, useEffect } from "react";
import axios from 'axios';

function ListBookHoanthanh() {
    const [dsTruyen, setdsTruyen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const layTruyen = async () => {
            try {
                const response = await axios.get('/api/truyen/lay/trangchu/hoanthanh');
                const truyenData = response.data.truyenWithRatings.map(item => ({
                    ...item.truyen,
                    trungBinhSao: item.trungBinhSao
                }));
                setdsTruyen(truyenData);
                setLoading(false);
            } catch (error) {
                setError("Có lỗi khi lấy danh sách sách.", error);
                setLoading(false);
            }
        };
    
        layTruyen();
    }, []);

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {dsTruyen.map((book, index) => (
                <BookCard 
                    key={index}
                    id={book._id}
                    tieuDe={book.tenTruyen}
                    soSao={book.trungBinhSao}
                    trangThai={book.tinhTrangTruyen}
                    luotXem={book.luotXemTruyen}
                    imgSrc={book.anhTruyen}
                />
            ))}
        </>
    );
}

export default ListBookHoanthanh;
