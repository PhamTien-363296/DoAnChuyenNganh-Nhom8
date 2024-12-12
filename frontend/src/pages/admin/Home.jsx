import { useEffect, useState } from "react";
import Axios from "axios";
import Navadmin from "../../components/admin/navigation/Navadmin";
import "../../assets/css/Adminhome.css";
import { HiUserGroup, HiBookOpen } from "react-icons/hi2";
import AreaChartComponent from "./AreaChart";

const Home = () => {
  const [nguoiDungMoi, setNguoiDungMoi] = useState(null);
  const [thongKeTruyen, setThongKeTruyen] = useState(null);
  const [baiVietTrongThang, setBaiVietTrongThang] = useState(null);
  const [totalLuutView, setTotalLuutView] = useState(null);  // New state for total views

  useEffect(() => {
    const layNguoiDungMoi = async () => {
      try {
        const response = await Axios.get("/api/nguoidung/lay/moi");
        setNguoiDungMoi(response.data.nguoimoi);
      } catch (error) {
        console.error("Error fetching new users:", error);
      }
    };
    layNguoiDungMoi();
  }, []);

  useEffect(() => {
    const layThongKeTruyen = async () => {
      try {
        const response = await Axios.get("/api/truyen/thongke");
        setThongKeTruyen(response.data);
      } catch (error) {
        console.error("Error fetching story statistics:", error);
      }
    };
    layThongKeTruyen();
  }, []);

  useEffect(() => {
    const layBaiVietTrongThang = async () => {
      try {
        const response = await Axios.get("/api/baiviet/tong");
        setBaiVietTrongThang(response.data.tongSoBaiViet);
      } catch (error) {
        console.error("Error fetching monthly posts:", error);
      }
    };
    layBaiVietTrongThang();
  }, []);

  useEffect(() => {
    const layTongLuotXem = async () => {
      try {
        const response = await Axios.get("/api/truyen/tongluotxem");
        setTotalLuutView(response.data.totalViews);
      } catch (error) {
        console.error("Error fetching total views:", error);
      }
    };
    layTongLuotXem();
  }, []);

  return (
    <Navadmin>
      <div className="main-content">
        <div className="dashboard">
          <div className="boxes">
            <div className="box-1">
              <HiUserGroup style={{ color: "#D7B98E", fontSize: "50px" }} />
              <p style={{ color: "#482F02", fontSize: "20px" }}>
                {nguoiDungMoi !== null ? `${nguoiDungMoi} lượt đăng ký mới` : "Đang tải..."}
              </p>
            </div>

            <div className="box-2">
              <div className="box-2-left">
                <HiBookOpen className="book-icon" />
              </div>
              <div className="box-2-right">
                {thongKeTruyen ? (
                  <>
                    <p>
                      <span>{thongKeTruyen.tongSoTruyen}</span> truyện được đăng tải
                    </p>
                    <p>
                      <span>{thongKeTruyen.truyenMoiTrongThang}</span> truyện mới trong tháng
                    </p>
                    <p>
                      <span>{baiVietTrongThang !== null ? baiVietTrongThang : "Đang tải..."}</span> bài viết trong tháng
                    </p>
                  </>
                ) : (
                  <p>Đang tải...</p>
                )}
              </div>
            </div>

            <div className="box-3">
              Tổng lượt xem truyện
              <div className="content-box-3">{totalLuutView !== null ? totalLuutView : "Đang tải..."}</div>
            </div>
          </div>

          <div className="box-main">
            <AreaChartComponent />
          </div>
        </div>
      </div>
    </Navadmin>
  );
};

export default Home;
