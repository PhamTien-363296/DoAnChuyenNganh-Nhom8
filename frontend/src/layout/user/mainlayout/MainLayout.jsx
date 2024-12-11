import Sidebar from '../../../components/user/sidebar/Sidebar';
import Searchmain from '../../../components/user/header/Header';
import Footer from '../../../components/user/footer/Footer';
import { useState } from "react";
import PropTypes from 'prop-types';
import './MainLayout.css'
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const [timKiem, setTimKiem] = useState('');
    const [dsGoiYTruyen, setdsGoiYTruyen] = useState([]);
    const [dsGoiYTacGia, setdsGoiYTacGia] = useState([]);
    const [dsGoiYCongDong, setdsGoiYCongDong] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?search=${timKiem}`);
            window.location.reload();
        }
    };

    return (
        <div className="container">
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

            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
