import { useState, useEffect } from "react";
import axios from 'axios';
import LichSuItem from "../../common/items/lichsuitem/LichSuItem";

function ListLichSu() {
    const [truyen, setTruyen] = useState([]);

    useEffect(() => {
        const layLichSu = async () => {
            try {
                const response = await axios.get('/api/nguoidung/lay/lichsu');
                setTruyen(response.data);
            } catch (error) {
                console.error("Lỗi:", error);
            };
        };
        layLichSu();
    }, []);

    return (
        <>
            {truyen.map((book) => (
                <LichSuItem
                    key={book.truyen._id} 
                    idTruyen={book.truyen._id}
                    tenTruyen={book.truyen.tenTruyen} 
                    chuong={book.truyen.idCacChuong.length} 
                    luotXem={book.truyen.luotXemTruyen}
                    tinhTrang={book.truyen.tinhTrangTruyen}
                    moTa={book.truyen.moTaTruyen}
                    imgSrc={book.truyen.anhTruyen}
                    tenChuong={book.chuong.tenChuong}
                    idChuong={book.chuong._id}
                />
            ))}
        </>
    )
}

export default ListLichSu