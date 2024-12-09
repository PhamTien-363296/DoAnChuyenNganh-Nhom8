import { useEffect, useState } from 'react';
import BaiVietItem from '../../common/items/baivietitem/BaiVietItem';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import MainLayout from '../../../../layout/user/mainLayout/MainLayout';

function ListBaiVietCongDong() {
    const { id } = useParams(); // Lấy id từ URL params
    const [baiviets, setBaiviets] = useState([]);
    const [loading, setLoading] = useState(true);

    const baiVietTatCa = async () => {
        try {
            const response = await Axios.get(`/api/baiviet/lay/congdong/${id}`);
            console.log(response.data);
            if (Array.isArray(response.data)) {
                setBaiviets(response.data);
            } else {
                setBaiviets([]);  
            }
            setLoading(false);
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
    }, [id]);

    if (loading) {
        return <p>Đang tải...</p>;
    }

    return (
        <MainLayout>
            {/* Display the message if there are no posts */}
            {baiviets.length === 0 ? (
                <p>Cộng đồng này chưa có bài viết nào.</p>
            ) : (
                baiviets.map((baiviet, index) => (
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
                            hinhAnh={baiviet.hinhAnhBV}
                            baiVietId={baiviet._id}
                            baiviet={baiviet}
                        />
                    </Link>
                ))
            )}
        </MainLayout>
    );
}

export default ListBaiVietCongDong;
