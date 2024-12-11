import { useState, useEffect } from 'react';
import { useLocation  } from 'react-router-dom';
import MainLayout from '../../../layout/user/mainLayout/MainLayout';
import Axios from 'axios';
import './Trangcanhan.css';

function Trangcanhan() {
    const location = useLocation();
    const { idNguoiDung } = location.state || {};
    const [nguoiDung, setNguoiDung] = useState(null);
    const [danhSachTacPham, setDanhSachTacPham] = useState([]);
    const [danhSachBaiViet, setDanhSachBaiViet] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy thông tin người dùng
    const layNguoiDung = async () => {
        try {
            const response = await Axios.get(`/api/nguoidung/lay/${idNguoiDung}`);
            setNguoiDung(response.data.nguoidung || null);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu người dùng", error);
            alert("Lỗi khi lấy dữ liệu người dùng: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Lấy danh sách tác phẩm của người dùng
    const layDanhSachTacPham = async () => {
        try {
            const response = await Axios.get(`/api/truyen/truyentheonguoidung/${idNguoiDung}`);
            setDanhSachTacPham(response.data || []);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tác phẩm", error);
            alert("Lỗi khi lấy danh sách tác phẩm: " + (error.response?.data?.message || error.message));
        }
    };

    // Lấy danh sách bài viết của người dùng
    const layBaiVietCaNhan = async () => {
        try {
            const response = await Axios.get(`/api/baiviet/canhan/${idNguoiDung}`);
            setDanhSachBaiViet(response.data || []);
        } catch (error) {
            console.error("Lỗi khi lấy bài viết người dùng", error);
            alert("Lỗi khi lấy dữ liệu bài viết: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        layNguoiDung();
        layDanhSachTacPham();
        layBaiVietCaNhan();  // Gọi API lấy bài viết
    }, [idNguoiDung]);

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (!nguoiDung) {
        return <p>Không tìm thấy thông tin người dùng</p>;
    }

    return (
        <MainLayout>
            <div className='canhan-content'>
                <div className="canhan">
                    <div className="avata">
                        <img src={nguoiDung.anhDaiDienND || 'https://placehold.co/150x150'} alt="Avatar" />
                    </div>
                    <div className="tennguoidung" style={{ fontWeight: 'bold', fontSize: '30px' }}>
                        <p style={{ margin: '0' }}>{nguoiDung.username || "Không có tên"}</p>
                    </div>
                    <div className="nguoitheodoi">
                        <p>{nguoiDung.nguoiTheoDoiND.length || 0} Người theo dõi</p>
                    </div>
                    <div className="dangtheodoi">
                        <p>{nguoiDung.theoDoiND.length || 0} Đang theo dõi</p>
                    </div>
                    <div className="slbaiviet">
                        <p>{nguoiDung.cacBaiVietND.length || 0} Bài viết</p>
                    </div>
                </div>
                <div className='canhan-noidung'>
                    <div className='canhan-baiviet'>
                        <div className='canhan-baiviet-text'>
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>BÀI VIẾT</p>
                        </div>
                        <div className='canhan-list-baiviet'>
                            {danhSachBaiViet.map((baiviet, index) => (
                                <div key={index} className="baiviet-item">
                                    <div className="baiviet-item-container">
                                        <div className="baiviet-item-tieude">
                                            <div className="baiviet-item-tieude-avata">
                                                <img src={baiviet.nguoiDungIdBV?.anhDaiDienND || 'https://placehold.co/50x50'} alt="Avatar" style={{ borderRadius: '30px' }} />
                                            </div>
                                            <div className="baiviet-item-tieude-noidung">
                                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                                    <p style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '8px' }}>
                                                        {baiviet.nguoiDungIdBV?.username || "Unknown"}
                                                    </p>
                                                </div>
                                                <p style={{ fontSize: '15px', marginTop: '7px' }}>
                                                    {baiviet.noiDungBV}
                                                </p>
                                            </div>
                                        </div>
                                        {baiviet.hinhAnhBV && (
                                            <div className="baiviet-item-image">
                                                <img src={baiviet.hinhAnhBV} alt="Content" />
                                            </div>
                                        )}
                                        <div className="baiviet-item-thongtin">
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='canhan-thongtin'>
                        <div className='canhan-gioithieu'>
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>GIỚI THIỆU</p>
                            <p>{nguoiDung.moTaND || "Không có mô tả"}</p>
                        </div>
                        <div className='canhan-tacpham'>
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>TÁC PHẨM</p>
                            <div className='canhan-list-tacpham'>
                                {danhSachTacPham.map((tacPham, index) => (
                                    <div key={index} className='tacpham-item'>
                                        <p>{tacPham.tenTruyen}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='canhan-theodoi'>
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>NGƯỜI ĐANG THEO DÕI</p>
                            <div className='canhan-list-nguoidangtheodoi'>
                                {nguoiDung.theoDoiND.length > 0 ? (
                                    nguoiDung.theoDoiND.map((nguoi, index) => (
                                        <div key={index} className='nguoi-item'>
                                            <p>{nguoi.username}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có người đang theo dõi.</p>
                                )}
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Trangcanhan;
