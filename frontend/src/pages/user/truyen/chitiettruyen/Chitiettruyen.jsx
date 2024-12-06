import './Chitiettruyen.css'

import { FaEye, FaStar } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { HiOutlineCheckCircle, HiOutlinePencilAlt, HiOutlineMinusCircle } from "react-icons/hi";

import MainLayout from '../../../../layout/user/mainLayout/MainLayout';

function Chitiettruyen() {
  const location = useLocation();
  const { idTruyen } = location.state || {};

  console.log("id", idTruyen)
  const [truyen, setTruyen] = useState(null); // set default to null instead of array

  useEffect(() => {
    if (idTruyen) {
      layTruyen(idTruyen);
    }
  }, [idTruyen]);

  const layTruyen = async (id) => {
      try {
          const response = await axios.get(`/api/truyen/laytheoid/${id}`);
          const truyenData = response.data; 
          setTruyen(truyenData); 
      } catch (error) {
          console.error("Lỗi:", error);
      }
  };

  useEffect(() => {
    const updateLuotXem = async () => {
        try {
            await axios.patch(`/api/truyen/capnhat/luotxem/${idTruyen}`);
        } catch (error) {
            console.error("Có lỗi khi cập nhật lượt xem:", error);
        }
    };

    updateLuotXem();
  }, [idTruyen]);

  if (!truyen) return <div>Loading...</div>;

  return (
    <>
      <MainLayout>
        <div className="main-content">
          <div className="padding-left">
            <div className="content-wrapper">
              <div className="left">
                <div className="image-container">
                  <img src={truyen.anhTruyen || "https://placehold.co/260x360"} alt={truyen.tenTruyen}/>
                </div>
              </div>

              <div className="right">
                <h1 className="story-name">{truyen.tenTruyen}</h1>
                <div className="info">
                  <div className="title-color">
                    <IoMdPerson className="icon"/>
                    <strong>Tác giả</strong> {truyen?.tacGiaIdTruyen?.username || "Unknown"}
                  </div>

                  <div className="title-color">
                    <FaChartSimple className="icon" />
                    <strong>Tình trạng</strong>
                    <div className="book-card-thongtin">
                      {truyen?.tinhTrangTruyen === "Hoàn thành" && (
                          <div className="trangthai" style={{backgroundColor: 'rgba(0, 255, 68, 0.2)', color: '#066C21' }}>
                              <HiOutlineCheckCircle />
                              <span style={{marginLeft:'3px'}}>{truyen?.tinhTrangTruyen}</span>
                          </div>
                      )}
                      {truyen?.tinhTrangTruyen  === "Đang viết" && (
                          <div className="trangthai" style={{backgroundColor: 'rgba(38, 0, 255, 0.2)', color: '#140084' }}>
                              <HiOutlinePencilAlt />
                              <span style={{marginLeft:'3px'}}>{truyen?.tinhTrangTruyen}</span>
                          </div>
                      )}
                      {truyen?.tinhTrangTruyen  === "Tạm dừng" && (
                          <div className="trangthai" style={{backgroundColor: 'rgba(255, 0, 0, 0.2)', color: '#7D0000' }}>
                              <HiOutlineMinusCircle />
                              <span style={{marginLeft:'3px'}}>{truyen?.tinhTrangTruyen}</span>
                          </div>
                      )}
                  </div>
                  </div>

                  <div className="title-color">
                    <FaTag className="icon"/>
                    <strong>Thể loại</strong> {truyen?.theLoaiIdTruyen?.tieuDeTheLoai || "Random"}
                  </div>

                  <div className="title-color">
                    <FaEye className="icon" />
                    <strong>Lượt xem</strong> {truyen.luotXemTruyen || 0}
                    <strong style={{ marginLeft: '20px'}}>Đánh giá</strong>
                    <span className="rating"><FaStar style={{ fontSize:'12px'}} />{truyen.danhGia || 4.1}</span>
                  </div>

                  <div className="title-color">
                    <FaBookOpen className="icon"/>
                    <strong>{truyen.idCacChuong.length || 10} chương</strong>
                  </div>
                </div>

                <div className="button-boxes">
                  <button className="read-button"><strong>Đọc ngay</strong></button>
                  <button className="favorite-button"><IoIosHeartEmpty /></button>
                </div>
              </div>
            </div>

            <div className="description">
              <h3 className="title-color">Mô tả:</h3>
              <p>{truyen.moTaTruyen || "Mô tả không có sẵn."}</p>
            </div>

            <div className="section">
              <h2>Mục lục</h2>
              <div className="chapter">
                {truyen.chuong && truyen.chuong.map((chuong, index) => (
                  <div key={index} className="chapter-item">{chuong.tenChuong}</div>
                ))}
              </div>
            </div>

            <div className="section">
              <h2>Đánh giá</h2>
              {truyen.danhGia && truyen.danhGia.map((danhGia, index) => (
                <div key={index} className="review">
                  <img className="review-avatar" src={danhGia.avatar || "https://placehold.co/50"} alt="User avatar"/>
                  <div className="review-content">
                    <div className="review-header">
                      <span className="review-user">{danhGia.tenNguoiDung || "Người dùng"}</span>
                      <span className="review-rating"><FaStar /> {danhGia.danhGia}</span>
                      <span className="review-date">{danhGia.ngay || "Chưa có ngày"}</span>
                    </div>
                    <p>{danhGia.noiDung || "Chưa có đánh giá."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default Chitiettruyen;
