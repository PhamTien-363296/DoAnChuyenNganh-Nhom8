import  { useEffect, useState } from "react";
import Axios from "axios"; // Import axios for API call
import Navadmin from "../../components/admin/navigation/Navadmin";
import "../../assets/css/Adminhome.css";
import { HiUserGroup } from "react-icons/hi2";
import { HiBookOpen } from "react-icons/hi2";
import AreaChartComponent from "./AreaChart";

const Home = () => {
  const [nguoiDungMoi, setNguoiDungMoi] = useState(null);

 
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

  return (
    <>
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
                  <p>
                    <span>15</span> truyện được đăng tải
                  </p>
                  <p>
                    <span>32</span> truyện mới trong tháng
                  </p>
                  <p>
                    <span>27</span> bài viết trong tháng
                  </p>
                </div>
              </div>
              <div className="box-3">Lượt xem trong ngày</div>
            </div>
            <div className="box-main">
              <AreaChartComponent />
            </div>
          </div>
        </div>
      </Navadmin>
    </>
  );
};

export default Home;
