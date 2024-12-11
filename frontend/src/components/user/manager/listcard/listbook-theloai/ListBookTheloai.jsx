import BookCard from "../../../common/cards/bookcard/BookCard";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListBookTheloai() {
    const [dsTruyen, setdsTruyen] = useState([]);
    const [theloai, setTheLoai] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const layTruyen = async () => {
            try {
                const response = await axios.get('/api/truyen/lay/trangchu/theloai');
                setdsTruyen(response.data.topBooks);
                if (response.data.topBooks.length > 0) {
                    const theLoaiData = response.data.topBooks[0].theLoaiIdTruyen;
                    setTheLoai(theLoaiData ? theLoaiData : '');
                }
                setLoading(false);
            } catch (error) {
                setError("Có lỗi khi lấy danh sách sách.", error);
                setLoading(false);
            }
        };
    
        layTruyen();
    }, []);

    const handleCategoryClick = () => {
        const formattedName = theloai.tieuDeTheLoai.replace(/\s+/g, '-').toLowerCase();
        const theloaiId = theloai._id;
        navigate(`/theloai/${formattedName}?loc=phobien&trang=1&sao=tatca&tinhtrang=tatca`, { state: { theloaiId } });
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <>
            <div className="theloai-tieude">
                <span className="tieude">{theloai.tieuDeTheLoai}</span>
                <p className="xemtatca" onClick={handleCategoryClick} style={{margin:'0', cursor:'pointer'}}>Xem thêm</p>
            </div>

            <div className="theloai-listcard">
                {dsTruyen.map((book, index) => (
                    <BookCard 
                        key={index}
                        id={book._id}
                        tieuDe={book.tenTruyen}
                        soSao={book.danhGia.trungBinhSao}
                        trangThai={book.tinhTrangTruyen}
                        luotXem={book.luotXemTruyen}
                        imgSrc={book.anhTruyen}
                    />
                ))}
            </div>
        </>
    );
}

export default ListBookTheloai;
