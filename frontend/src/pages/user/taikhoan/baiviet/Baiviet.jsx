import { useState, useEffect, useRef } from 'react';
import TaiKhoanLayout from '../../../../layout/user/taikhoanlayout/TaiKhoanLayout';
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5"; 
import './style.css';
import ListBaiVietTaiKhoan from '../../../../components/user/manager/listbaiviet/ListBaiVietTaiKhoan';
import { useAuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Baiviet() {
    const [coverImage, setCoverImage] = useState(null); 
    const [formData, setFormData] = useState({
        noiDungBV: '',
        hinhAnhBV: ''
    });

    const [followers, setFollowers] = useState([]); // Lưu danh sách người theo dõi
    const [loading, setLoading] = useState(true); // Loading state cho danh sách người theo dõi

    const navigate = useNavigate();

    const imgRef = useRef(null); 
    const { authUser } = useAuthContext();

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

    // Lấy danh sách người theo dõi khi component mount
    useEffect(() => {
        nguoiTheoDoicuaToi();

        const interval = setInterval(() => {
            nguoiTheoDoicuaToi();
        }, 7000);  

        return () => clearInterval(interval);
    }, []);

    // Hiển thị khi đang tải hoặc không có người theo dõi
    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (followers.length === 0) {
        return <p>Không có người theo dõi nào.</p>;
    }
    
    return (
        <TaiKhoanLayout>
            <div className='bv-baiviet-container'>
                <div className='bv-noidung'>
                    <div className='bv-thembaiviet'>
                        <div className='bv-avata'>
                            <img src={authUser.anhDaiDienND} alt="Avatar" />
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
                        <p className='bv-noidung'>Xin chào</p>
                    </div>
                    <div className='bv-list-nguoitheodoi'>
                        <p className='bv-tieude'>NGƯỜI THEO DÕI</p>
                        <div className='bv-list'>
                            {followers.map((follower) => (
                                <div 
                                key={follower._id}
                                className="follower-item"
                                onClick={() => {
                                    const urlTen = follower.username.trim().replace(/\s+/g, '-');
                                    navigate(`/${urlTen}`, { state: { idNguoiDung: follower._id } });
                                }}                                
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={follower.anhDaiDienND || 'https://via.placeholder.com/50x50'} 
                                    alt={follower.username}
                                    className="follower-avatar"
                                />
                                <span className="follower-name">{follower.username}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </TaiKhoanLayout>
    );
}
