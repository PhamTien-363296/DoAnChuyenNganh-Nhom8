import { useState, useEffect } from "react";
import axios from 'axios';
import YeuThichItem from "../../common/items/yeuthichitem/YeuThichItem";

function ListYeuThich() {
    const [truyen, setTruyen] = useState([]);

    useEffect(() => {
        const layYeuThich= async () => {
            try {
                const response = await axios.get('/api/nguoidung/lay/yeuthich');
                console.log(response.data.yeuThichND);
                setTruyen(response.data.yeuThichND);
            } catch (error) {
                console.error("Lỗi:", error);
            };
        };
        layYeuThich();
    }, []);

    return (
        <>
            {truyen.map((book) => (
                <YeuThichItem
                    key={book._id} 
                    idTruyen={book._id}
                    tenTruyen={book.tenTruyen} 
                    chuong={book.idCacChuong.length} 
                    luotXem={book.luotXemTruyen}
                    tinhTrang={book.tinhTrangTruyen}
                    moTa={book.moTaTruyen}
                    imgSrc={book.anhTruyen}
                />
            ))}
        </>
    )
}

export default ListYeuThich