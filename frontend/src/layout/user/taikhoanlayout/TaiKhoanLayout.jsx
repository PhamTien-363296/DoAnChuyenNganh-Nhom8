import Sidebar from '../../../components/user/sidebar/Sidebar';
import Searchmain from '../../../components/user/header/Header';
import Navmain from '../../../components/user/navigation/Navigation'
import Footer from '../../../components/user/footer/Footer'
import axios from 'axios';
import PropTypes from 'prop-types';
import './TaiKhoanLayout.css'

import { useState ,useRef,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const TaiKhoanLayout = ({ children }) => {
    const [timKiem, setTimKiem] = useState('');
    const [dsGoiYTruyen, setdsGoiYTruyen] = useState([]);
    const [dsGoiYTacGia, setdsGoiYTacGia] = useState([]);
    const [dsGoiYCongDong, setdsGoiYCongDong] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        moTaND: "",
        anhDaiDienND: "",
    });
    const navigate = useNavigate(); 

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && (dsGoiYTruyen.length > 0 || dsGoiYTacGia.length > 0)) {
            navigate(`/search?search=${timKiem}`);
            window.location.reload();
        }
    };
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/auth/getme");
                setUser(response.data);
                setFormData({
                    username: response.data.username,
                    moTaND: response.data.moTaND || "",
                    
                });
                setCoverImage(response.data.anhDaiDienND || "");
            } catch (err) {
                console.error("Không thể lấy thông tin người dùng.", err);
            }
        };

        fetchUserData();
    }, []);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];  
        if (file) {
            const reader = new FileReader(); 
            reader.onloadend = async () => {
                setCoverImage(reader.result);  
                try {
                    const response = await axios.patch('/api/nguoidung/update', {
                        anhDaiDienND: reader.result, 
                    });
                    setUser(response.data.nguoidung);
                } catch (err) {
                    setError('Không thể cập nhật ảnh đại diện. Vui lòng thử lại.');
                    console.error(err);
                }
            };
            reader.readAsDataURL(file);  
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch("/api/nguoidung/update", formData);
            setUser(response.data.nguoidung);
            setIsEditing(false);
            alert("Cập nhật thông tin thành công!");
            window.location.reload();
        } catch (err) {
            console.error("Không thể cập nhật thông tin.", err);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='container'> 
            <Sidebar />
            <Searchmain
                timKiem={timKiem}
                setTimKiem={setTimKiem} 
                setdsGoiYTruyen={setdsGoiYTruyen}
                setdsGoiYTacGia={setdsGoiYTacGia}
                setdsGoiYCongDong={setdsGoiYCongDong}
                setLoading={setLoading}
                setError={setError}
                handleKeyPress={handleKeyPress}
            />
            {loading && <div className="header-tai">Đang tải...</div>}
            {error && <div className="header-loi">{error}</div>}

            {(dsGoiYTruyen.length > 0 || dsGoiYTacGia.length > 0) && (
                <div className="header-goiy">
                    <p className='goiy-tieude'>Gợi ý tác giả</p>
                    {dsGoiYTacGia.length > 0 ? (
                        <>
                            {dsGoiYTacGia.map((goiy) => (
                                <div key={goiy._id} className="header-goiy-list">
                                    {goiy.username}
                                </div>
                            ))}
                        </>
                    ) : (
                        <p className='goiy-thongbao'>Không có kết quả nào cho gợi ý tác giả</p>
                    )}
                    <p className='goiy-tieude'>Gợi ý truyện</p>
                    {dsGoiYTruyen.length > 0 ? (
                        <>
                            {dsGoiYTruyen.map((goiy) => (
                                <div 
                                key={goiy._id} 
                                className="header-goiy-list"
                                onClick={() => {
                                    const urlTenDV = goiy?.tenTruyen.replace(/\s+/g, '-');
                                    navigate(`/chitiettruyen/${urlTenDV}`, {
                                        state: { idTruyen: goiy?._id },
                                    });
                                    window.location.reload();
                                }}
                                >
                                    {goiy.tenTruyen}
                                </div>
                            ))}
                        </>
                        ) : (
                            <p className='goiy-thongbao'>Không có kết quả nào cho gợi ý truyện</p>
                        )}
                        <p className='goiy-tieude'>Gợi ý Cộng đồng</p>
                        {dsGoiYCongDong.length > 0 ? (
                        <>
                            {dsGoiYCongDong.map((goiy) => (
                                <div 
                                key={goiy._id} 
                                className="header-goiy-list"
                                >
                                    {goiy.tenCD}
                                </div>
                            ))}
                        </>
                        ) : (
                            <p className='goiy-thongbao'>Không có kết quả nào cho gợi ý cộng đồng</p>
                        )}
                </div>
            )}
            <div className='content'>
                <div className="taikhoan">
                    <div className="avata"  onClick={handleAvatarClick}>
                        <img src={coverImage || "https://placehold.co/150x150"} alt="Avatar" />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </div>
                        <div className="tennguoidung" style={{fontWeight:'bold', fontSize:'30px'}}><p style={{margin:'0'}}>{user?.username|| "Tên người dùng"}</p></div>
                        <div className="nguoitheodoi">
                            <p>{user?.theoDoiND?.length || 0} Người theo dõi</p>
                            </div>
                            <div className="dangtheodoi">
                                <p>{user?.nguoiTheoDoiND?.length || 0} Đang theo dõi</p>
                            </div>
                            <div className="slbaiviet">
                                <p>{user?.cacBaiVietND?.length || 0} Bài viết</p>
                            </div>
                        <div className="chinhsua">
                            <div className="button"
                                onClick={() => setIsEditing(true)}>
                                Chỉnh sửa trang cá nhân
                            </div>
                        </div>
                </div>

                <Navmain/>

                <div className="taikhoan-container">{children}</div>
            </div>
            <Footer/>
            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Chỉnh sửa thông tin</h2>
                        <form onSubmit={handleUpdate}>
                            <label>
                                Tên:
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Mô tả bản thân:
                                <textarea
                                    value={formData.moTaND}
                                    onChange={(e) =>
                                        setFormData({ ...formData, moTaND: e.target.value })
                                    }
                                ></textarea>
                            </label>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsEditing(false)} className='button-tk-baiviet'>
                                    Hủy
                                </button>
                                <button type="submit" className='button-tk-baiviet'>Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

TaiKhoanLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TaiKhoanLayout;

