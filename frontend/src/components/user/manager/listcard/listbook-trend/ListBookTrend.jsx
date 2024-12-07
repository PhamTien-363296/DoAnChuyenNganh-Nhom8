import TrendCard from "../../../common/cards/trendcard/TrendCard";
import { useState, useEffect } from "react";
import axios from 'axios';

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

function ListBookTrend() {
    const [dsTruyen, setdsTruyen] = useState([]);
    const [batDau, setBatDau] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const soLuongTruyen = 2;

    useEffect(() => {
        const layTruyen = async () => {
            try {
                const response = await axios.get('/api/truyen/lay/trangchu/trending');
                
                const truyenData = response.data.truyenWithRatings.map(item => ({
                    ...item.truyen,
                    trungBinhSao: item.trungBinhSao
                }));
                
                setdsTruyen(truyenData);
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
                        idTruyen={book._id}
                        tieuDe={book.tenTruyen}
                        tacGia={book.tacGiaIdTruyen.username}
                        soSao={book.trungBinhSao}
                        chuong={book.idCacChuong.length}
                        trangThai={book.tinhTrangTruyen}
                        luotXem={book.luotXemTruyen}
                        moTa={book.moTaTruyen}
                        imgSrc={book.anhTruyen}
                        idCacChuong={book.idCacChuong}
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
