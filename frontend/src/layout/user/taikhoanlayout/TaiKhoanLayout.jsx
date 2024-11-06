import Sidebar from '../../../components/user/sidebar/Sidebar';
import Searchmain from '../../../components/user/header/Header';
import Navmain from '../../../components/user/navigation/Navigation'
import Footer from '../../../components/user/footer/Footer'

import PropTypes from 'prop-types';
import './TaiKhoanLayout.css'

const TaiKhoanLayout = ({ children }) => {
    return (
        <div className='container'> 
            <Sidebar />
            <Searchmain />
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

