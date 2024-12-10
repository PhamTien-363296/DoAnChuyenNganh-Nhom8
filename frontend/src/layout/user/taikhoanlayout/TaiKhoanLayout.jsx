import Sidebar from '../../../components/user/sidebar/Sidebar';
import Searchmain from '../../../components/user/header/Header';
import Navmain from '../../../components/user/navigation/Navigation'
import Footer from '../../../components/user/footer/Footer'

import PropTypes from 'prop-types';
import './TaiKhoanLayout.css'

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const TaiKhoanLayout = ({ children }) => {
    const [timKiem, setTimKiem] = useState('');
    const [dsGoiYTruyen, setdsGoiYTruyen] = useState([]);
    const [dsGoiYTacGia, setdsGoiYTacGia] = useState([]);
    const [dsGoiYCongDong, setdsGoiYCongDong] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && (dsGoiYTruyen.length > 0 || dsGoiYTacGia.length > 0)) {
            navigate(`/search?search=${timKiem}`);
            window.location.reload();
        }
    };
    
    return (
        <div className='container'> 
            <Sidebar />
            <Searchmain
                timKiem={timKiem}
                setTimKiem={setTimKiem} 
                setdsGoiYTruyen={setdsGoiYTruyen}
                setdsGoiYTacGia={setdsGoiYTacGia}
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
                    <div className="avata"><img src='https://placehold.co/150x150'/></div>
                        <div className="tennguoidung" style={{fontWeight:'bold', fontSize:'30px'}}><p style={{margin:'0'}}>Mintu</p></div>
                        <div className="nguoitheodoi">
                            <p>1005 Người theo dõi</p>
                            </div>
                            <div className="dangtheodoi">
                                <p>1005 Đang theo dõi</p>
                            </div>
                            <div className="slbaiviet">
                                <p>1005 Bài viết</p>
                            </div>
                        <div className="chinhsua">
                            <div className="button">Chỉnh sửa trang cá nhân</div>
                        </div>
                </div>

                <Navmain/>

                <div className="taikhoan-container">{children}</div>
            </div>
            <Footer/>
        </div>
    );
};

TaiKhoanLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TaiKhoanLayout;

