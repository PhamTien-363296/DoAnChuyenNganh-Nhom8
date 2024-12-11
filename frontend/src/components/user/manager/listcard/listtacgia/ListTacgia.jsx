import TacgiaCard from "../../../common/cards/tacgiacard/TacgiaCard";
import { useState, useEffect } from "react";
import axios from 'axios';

function ListTacgia() {
    const [dsTg, setdsTg] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const layTacGia = async () => {
            try {
                const response = await axios.get('/api/truyen/lay/trangchu/tacgia');
                setdsTg(response.data.topTacGia);
                setLoading(false);
            } catch (error) {
                setError("Có lỗi khi lấy danh sách sách.", error);
                setLoading(false);
            }
        };
    
        layTacGia();
    }, []);

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <>
            {dsTg.map((tacgia, index) => (
                <TacgiaCard 
                    key={index}
                    id={tacgia.tacGiaInfo._id}
                    tieuDe={tacgia.tacGiaInfo.username}
                    imgSrc={tacgia.tacGiaInfo.anhDaiDienND || ''}
                />
            ))}
        </>
    );
}

export default ListTacgia;
