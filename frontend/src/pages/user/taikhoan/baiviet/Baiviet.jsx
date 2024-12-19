import { useState, useEffect, useRef } from 'react';
import TaiKhoanLayout from '../../../../layout/user/taikhoanlayout/TaiKhoanLayout';
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5"; 
import './style.css';
import ListBaiVietTaiKhoan from '../../../../components/user/manager/listbaiviet/ListBaiVietTaiKhoan';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import BookCard from '../../../../components/user/common/cards/bookcard/BookCard';

export default function Baiviet() {
    const [coverImage, setCoverImage] = useState(null); 
    const [formData, setFormData] = useState({
        noiDungBV: '',
        hinhAnhBV: ''
    });

    const [followers, setFollowers] = useState([]); // Lưu danh sách người theo dõi
    const [loading, setLoading] = useState(true); // Loading state cho danh sách người theo dõi
    const [danhSachTacPham, setDanhSachTacPham] = useState([]);

    const navigate = useNavigate();

    const imgRef = useRef(null); 
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Axios.get('/api/auth/getme');
                setAuthUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []); 


    // Hàm xử lý thay đổi ảnh
    const handleImageChange = (event) => {
        const file = event.target.files[0];  
        if (file) {
            const reader = new FileReader(); 
            reader.onloadend = () => {
                setCoverImage(reader.result);  
                setFormData((prevData) => ({
                    ...prevData,
                    hinhAnhBV: reader.result,  
                }));
            };
            reader.readAsDataURL(file);  
        }
    };

    // Hàm xóa ảnh đã chọn
    const handleRemoveImage = () => {
        setCoverImage(null); 
        setFormData((prevData) => ({
            ...prevData,
            hinhAnhBV: '', 
        }));
        if (imgRef.current) imgRef.current.value = null; 
    };

    // Hàm gửi dữ liệu bài viết
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await Axios.post('/api/baiviet/taobaiviet', formData);
            if (response.status === 201) {
                alert("Thêm thành công!");
                setFormData({ noiDungBV: '', hinhAnhBV: '' }); 
                setCoverImage(null); 
            } else {
                alert("Có lỗi xảy ra khi thêm bài viết, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi thêm bài viết:", error);
            alert("Lỗi khi thêm bài viết: " + (error.response?.data?.message || error.message));
        }
    };

    // Hàm mở chọn ảnh
    const handleIconClick = () => {
        if (imgRef.current) imgRef.current.click();
    };

    // Hàm lấy danh sách người theo dõi
    const nguoiTheoDoicuaToi = async () => {
        try {
            const response = await Axios.get('/api/nguoidung/lay/follower');
            // Kiểm tra dữ liệu trả về có phải là mảng không
            if (Array.isArray(response.data.followers)) {
                setFollowers(response.data.followers); // Lưu danh sách người theo dõi
                setLoading(false);
            } else {
                alert("Dữ liệu người theo dõi không hợp lệ.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Lỗi khi đổ dữ liệu bài viết:", error);
            alert("Lỗi khi đổ dữ liệu bài viết: " + (error.response?.data?.message || error.message));
            setLoading(false);
        }
    };

    const layDanhSachTacPham = async () => {
        try {
            const response = await Axios.get(`/api/truyen/laytheonguoidung`);
            setDanhSachTacPham(response.data || []);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tác phẩm", error);
            alert("Lỗi khi lấy danh sách tác phẩm: " + (error.response?.data?.message || error.message));
        }
    };

    // Lấy danh sách người theo dõi khi component mount
    useEffect(() => {
        nguoiTheoDoicuaToi();
        layDanhSachTacPham();

        const interval = setInterval(() => {
            nguoiTheoDoicuaToi();
        }, 7000);  

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <p>Đang tải...</p>;
    }
    
    return (
        <TaiKhoanLayout>
            <div className='bv-baiviet-container'>
                <div className='bv-noidung'>
                    <div className='bv-thembaiviet'>
                        <div className='bv-avata'>
                            <img src={authUser.anhDaiDienND || 'https://via.placeholder.com/50x50'} alt="Avatar" />
                        </div>
                        <div className='bv-camnghi'>
                            <textarea 
                                placeholder="Bạn đang nghĩ gì?" 
                                rows="4" 
                                className='text-input' 
                                value={formData.noiDungBV}
                                onChange={(e) => setFormData({...formData, noiDungBV: e.target.value})}
                            />
                            {coverImage && (
                                <div className='img-container'>
                                    <IoCloseSharp className='close-icon'
                                        onClick={handleRemoveImage}
                                    />
                                    <img src={coverImage} alt="Preview" />
                                </div>
                            )}
                        </div>
                        <div className='bv-themanh-icon'>
                            <input 
                                type="file"
                                id="file-input"
                                hidden
                                ref={imgRef} 
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            <HiOutlinePhotograph onClick={handleIconClick} className="cursor-pointer text-xl" />
                        </div>
                        <div className='bv-dang'>
                            <button onClick={handleSubmit}>Đăng</button>
                        </div>
                    </div>
                    <div className='bv-tieude'>BÀI VIẾT</div>
                    <div className='bv-list'><ListBaiVietTaiKhoan /></div>
                </div>

                <div className='bv-thongtin'>
                    <div className='bv-gioithieu'>
                        <p className='bv-tieude'>GIỚI THIỆU</p>
                        <p className='bv-noidung'>{authUser.moTaND}</p>
                    </div>
                    <div className='canhan-tacpham'>
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>TÁC PHẨM</p>
                            <div className='canhan-list-tacpham'>
                                <div className='listtacpham'>
                                    {Array.isArray(danhSachTacPham) && danhSachTacPham.length > 0 ? (
                                        danhSachTacPham.map((tacPham, index) => (
                                            <BookCard
                                                key={index}
                                                id={tacPham._id}
                                                tieuDe={tacPham.tenTruyen}
                                                soSao={tacPham.danhGia.trungBinhSao}
                                                trangThai={tacPham.tinhTrangTruyen}
                                                luotXem={tacPham.luotXemTruyen}
                                                imgSrc={tacPham.anhTruyen}
                                            />
                                        ))
                                    ) : (
                                        <p className="no-tacpham">Chưa có tác phẩm nào.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    <div className='bv-list-nguoitheodoi'>
                        <p className='bv-tieude'>NGƯỜI THEO DÕI</p>
                        <div className='bv-list'>
                            {Array.isArray(followers) && followers.length > 0 ? (
                                followers.map((follower) => (
                                    <div 
                                        key={follower?._id || Math.random()}
                                        className="follower-item"
                                        onClick={() => {
                                            if (follower?.username && follower?._id) {
                                                const urlTen = follower.username.trim().replace(/\s+/g, '-');
                                                navigate(`/${urlTen}`, { state: { idNguoiDung: follower._id } });
                                            }
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            src={follower?.anhDaiDienND || 'https://via.placeholder.com/50x50'} 
                                            alt={follower?.username || 'No name'}
                                            className="follower-avatar"
                                        />
                                        <span className="follower-name">{follower?.username || 'Ẩn danh'}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="no-followers">Chưa có người theo dõi nào.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </TaiKhoanLayout>
    );
}
