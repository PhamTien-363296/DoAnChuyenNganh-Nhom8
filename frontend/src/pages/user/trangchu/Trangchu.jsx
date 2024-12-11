
import { Link } from "react-router-dom";

import MainLayout from '../../../layout/user/mainLayout/MainLayout'
import ListBookHot from "../../../components/user/manager/listcard/listbook-hot/ListBookHot";
import ListBookTrend from "../../../components/user/manager/listcard/listbook-trend/ListBookTrend";
//import ListBookTheloai from "../../../components/user/manager/listcard/listbook-theloai/ListBookTheloai";
import ListBookHoanthanh from "../../../components/user/manager/listcard/listbook-hoanthanh/ListBookHoanthanh";
import ListTheloaiHome from "../../../components/user/manager/listtheloaihome/ListTheloaiHome";

//Css
import './Trangchu.css'
//import ListTacgia from "../../../components/user/manager/listcard/listtacgia/ListTacgia";

export default function Trangchu() {
    return (
        <MainLayout>
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
                    <Link className="xemtatca" to="/danhmuc">Xem thêm</Link>
                </div>

                <div className="hot-listcard">
                    <ListBookHot/>
                </div>
            </div>

            <div className="quangcao">

            </div>

            <div className="theloai-list">
                <div className="theloai-tieude">
                    <span className="tieude">Tiểu thuyết</span>
                    <Link className="xemtatca" to="/danhmuc">Xem thêm</Link>
                </div>

                <div className="theloai-listcard">
                </div>
            </div>

            <div className="tacgia-list">
                <div className="tacgia-tieude">
                    <span className="tieude" style={{margin:'auto'}}>TÁC GIẢ YÊU THÍCH</span>
                    <Link className="xemtatca" to="/danhmuc">Xem thêm</Link>
                </div>

                <div className="tacgia-listcard">
                </div>
            </div>

            <div className="hoanthanh-list">
                <div className="hoanthanh-tieude">
                    <span className="tieude">Truyện đã Hoàn thành</span>
                    <Link className="xemtatca" to="/danhmuc">Xem thêm</Link>
                </div>

                <div className="hoanthanh-listcard">
                    <ListBookHoanthanh/>
                </div>
            </div>

        </MainLayout>
    );
}
