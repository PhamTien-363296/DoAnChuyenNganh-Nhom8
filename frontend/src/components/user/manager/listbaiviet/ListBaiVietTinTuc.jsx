import { useEffect, useState } from 'react';
import BaiVietItem from '../../common/items/baivietitem/BaiVietItem';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function ListBaiVietTinTuc() {
    const [baiviets, setBaiviets] = useState([]);
    const [loading, setLoading] = useState(true);

    const baiVietTatCa = async () => {
        try {
            const response = await Axios.get('/api/baiviet/tatca');
            if (response.data) {
                setBaiviets(response.data);
                setLoading(false);
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Lỗi khi đổ dữ liệu bài viết:", error);
            alert("Lỗi khi đổ dữ liệu bài viết: " + (error.response?.data?.message || error.message));
            setLoading(false);
        }
    };

    useEffect(() => {
        baiVietTatCa();


        const interval = setInterval(() => {
            baiVietTatCa();
        }, 7000);  


        return () => clearInterval(interval);
    }, []);


    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (baiviets.length === 0) {
        return <p>Không có bài viết nào.</p>;
    }

    return (
        <>
            {baiviets.map((baiviet, index) => (
                <Link
                    to={baiviet.path}
                    key={index}
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    <BaiVietItem
                        noiDungBV={baiviet.noiDungBV}
                        luotThichBV={baiviet.luotThichBV}
                        binhLuanBV={baiviet.binhLuanBV}
                        IdNguoiDung={baiviet.nguoiDungIdBV}  // Truyền IdNguoiDung
                        username={baiviet.nguoiDungIdBV.username}  // Truyền username
                        tenCD={baiviet.thuocCD ? baiviet.thuocCD.tenCD : null}
                        hinhAnh={baiviet.hinhAnhBV}
                        baiVietId={baiviet._id}
                        baiviet={baiviet}
                    />
                </Link>
            ))}
        </>
    );
}

export default ListBaiVietTinTuc;
