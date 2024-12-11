
import image from '../../../assets/chaomung.png';
import ListBookHot from "../../../components/user/manager/listcard/listbook-hot/ListBookHot";
import ListBookTrend from "../../../components/user/manager/listcard/listbook-trend/ListBookTrend";
//import ListBookTheloai from "../../../components/user/manager/listcard/listbook-theloai/ListBookTheloai";
import ListBookHoanthanh from "../../../components/user/manager/listcard/listbook-hoanthanh/ListBookHoanthanh";
import ListTheloaiHome from "../../../components/user/manager/listtheloaihome/ListTheloaiHome";
import { useNavigate } from 'react-router-dom';

//Css
import './Trangchu.css'
import MainLayout from "../../../layout/user/mainlayout/MainLayout";
import ListBookTheloai from "../../../components/user/manager/listcard/listbook-theloai/ListBookTheloai";
import ListTacgia from '../../../components/user/manager/listcard/listtacgia/ListTacgia';

export default function Trangchu() {
    const navigate = useNavigate();

    const handleHotClick = () => {
        const theloaiId = 'all';
        navigate(`/theloai/tất-cả?loc=danhgia&trang=1&sao=tatca&tinhtrang=tatca`, { state: { theloaiId } });
    };

    const handleHoanThanhClick = () => {
        const theloaiId = 'all';
        navigate(`/theloai/tất-cả?loc=phobien&trang=1&sao=tatca&tinhtrang=hoanthanh`, { state: { theloaiId } });
    };
    return (
        <MainLayout>
            <div className="quangcao">
                <img src={image} alt="Ảnh chào mừng" />
            </div>
            <div className="theloai">
                <div className="dstheloai-tieude">
                    <p style={{ fontWeight: "bold" }}>Thể loại</p>
                </div>
                <div className="dstheloai-noidung">
                    <ListTheloaiHome/>
                </div>
            </div>

            <div className="trending-list">
                <ListBookTrend/>
            </div>

            <div className="hot-list">
                <div className="hot-tieude">
                    <span className="tieude">Truyện được đánh giá tốt</span>
                    <p className="xemtatca" onClick={handleHotClick} style={{margin:'0', cursor:'pointer'}}>Xem thêm</p>
                </div>

                <div className="hot-listcard">
                    <ListBookHot/>
                </div>
            </div>

            <div className="theloai-list">
                <ListBookTheloai/>
            </div>

            <div className="tacgia-list">
                <div className="tacgia-tieude">
                    <span className="tieude" style={{margin:'auto'}}>TÁC GIẢ YÊU THÍCH</span>
                </div>

                <div className="tacgia-listcard">
                    <ListTacgia/>
                </div>
            </div>

            <div className="hoanthanh-list">
                <div className="hoanthanh-tieude">
                    <span className="tieude">Truyện đã Hoàn thành</span>
                    <p className="xemtatca" onClick={handleHoanThanhClick} style={{margin:'0', cursor:'pointer'}}>Xem thêm</p>
                </div>

                <div className="hoanthanh-listcard">
                    <ListBookHoanthanh/>
                </div>
            </div>

        </MainLayout>
    );
}
