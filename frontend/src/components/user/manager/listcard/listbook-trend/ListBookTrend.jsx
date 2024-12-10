import TrendCard from "../../../common/cards/trendcard/TrendCard";
import { useState, useEffect } from "react";
import axios from 'axios';

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

function ListBookTrend() {
    const [dsTruyen, setdsTruyen] = useState([]);
    const [batDau, setBatDau] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState({});;

    const soLuongTruyen = 2;

    useEffect(() => {
        const layTruyen = async () => {
            try {
                const response = await axios.get('/api/truyen/lay/trangchu/trending');

                console.log(response.data);
                setdsTruyen(response.data.truyenLike);
                const favoriteStatus = {};
                response.data.truyenLike.forEach(book => {
                    favoriteStatus[book.truyen._id] = book.isFavorite;
                });
                setIsFavorite(favoriteStatus);
                setLoading(false);
            } catch (error) {
                console.error("Có lỗi khi lấy truyện:", error);
                setLoading(false);
            }
        };

        layTruyen();
    }, []);

    const handleNext = () => {
        if (batDau + soLuongTruyen < dsTruyen.length) {
            setBatDau(batDau + 1);
        }
    };

    const handlePrev = () => {
        if (batDau > 0) {
            setBatDau(batDau - 1);
        }
    };

    const toggleFavorite = async (idTruyen) => {
        try {
            const response = await axios.patch(`/api/nguoidung/capnhat/yeuthich/${idTruyen}`);
            setIsFavorite((prev) => ({
                ...prev,
                [idTruyen]: !prev[idTruyen],
            }));
            console.log(response.data.message);
        } catch (error) {
            console.error("Lỗi khi cập nhật yêu thích:", error.message);
        }
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const soLuongTruyenGiam = dsTruyen.slice(batDau, batDau + soLuongTruyen);

    return (
        <>
            <div
                className="trending-button"
                style={{ marginRight: '10px' }}
                onClick={handlePrev}
            >
                <HiOutlineChevronLeft />
            </div>
            <div className="trending-listcard">
                {soLuongTruyenGiam.map((book, index) => (
                    <TrendCard 
                        key={index}
                        idTruyen={book.truyen._id}
                        tieuDe={book.truyen.tenTruyen}
                        tacGia={book.truyen.tacGiaIdTruyen.username}
                        soSao={book.truyen.danhGia.trungBinhSao}
                        chuong={book.truyen.idCacChuong.length}
                        trangThai={book.truyen.tinhTrangTruyen}
                        luotXem={book.truyen.luotXemTruyen}
                        moTa={book.truyen.moTaTruyen}
                        imgSrc={book.truyen.anhTruyen}
                        idCacChuong={book.truyen.idCacChuong}
                        isFavorite={isFavorite[book.truyen._id] || false}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
            <div
                className="trending-button"
                style={{ marginLeft: '10px' }}
                onClick={handleNext}
            >
                <HiOutlineChevronRight />
            </div>
        </>
    );
}

export default ListBookTrend;
