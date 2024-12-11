import './Chitiettruyen.css'

import { FaEye } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaLock  } from "react-icons/fa";

import { IoMdPerson } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { HiOutlineCheckCircle, HiOutlinePencilAlt, HiOutlineMinusCircle } from "react-icons/hi";
import moment from 'moment';

import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import DanhGiaTruyen from '../../../../components/user/danhgiatruyen/DanhGiaTruyen';

function Chitiettruyen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { idTruyen } = location.state || {};

  const [truyen, setTruyen] = useState(null);
  const [trungBinhSao, setTrungBinhSao] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (idTruyen) {
      layTruyen(idTruyen);
    }
  }, [idTruyen]);

  const layTruyen = async (id) => {
      try {
          const response = await axios.get(`/api/truyen/laytheoid/${id}`);
          //console.log(response.data)
          const truyenData = response.data.truyen; 
          setTruyen(truyenData); 
          setTrungBinhSao(truyenData.danhGia.trungBinhSao);
          setIsFavorite(response.data.isFavorite);
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

  const DocNgay = () => {
    const tenTruyen = truyen.tenTruyen.trim().replace(/\s+/g, '-').toLowerCase();
    const chuongDauTien = truyen.idCacChuong[0];
    const tenChuong = chuongDauTien.tenChuong.trim().replace(/\s+/g, '-').toLowerCase();
    navigate(`/${tenTruyen}/${tenChuong}`, { state: { idChuong: chuongDauTien._id} });
  };

  const DocChuong = (id, ten) => {
    const tenTruyen = truyen.tenTruyen.trim().replace(/\s+/g, '-').toLowerCase();
    const tenChuong = ten.trim().replace(/\s+/g, '-').toLowerCase();
    navigate(`/${tenTruyen}/${tenChuong}`, { state: { idChuong: id} });
  };

  const toggleFavorite = async () => {
    try {
        const response = await axios.patch(`/api/nguoidung/capnhat/yeuthich/${idTruyen}`);
        setIsFavorite(!isFavorite);
        console.log(response.data.message);
    } catch (error) {
        console.error("Lỗi khi cập nhật yêu thích:", error.message);
    }
  };

  if (!truyen) return <div>Loading...</div>;

  return (
    <>
      <MainLayout>
        <div className="main-content">
          <div>
            <div className="content-wrapper">
              <div className="left">
                <div className="image-container-ctt">
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
                    <span className="rating-ct">
                      {[1,2,3,4,5].map((star) => {
                        if (star <= Math.floor(trungBinhSao)) {
                          return <FaStar key={star} size={30} className="sao" />;
                        } else if (star <= Math.ceil(trungBinhSao) && trungBinhSao % 1 !== 0) {
                          return <FaStarHalfAlt key={star} size={30} className="sao" />;
                        } else {
                          return <FaRegStar key={star} size={30} className="noSao" />;
                        }
                      })}
                    </span>
                  </div>

                  <div className="title-color">
                    <FaBookOpen className="icon"/>
                    <strong>{truyen.idCacChuong.length || 'Không có '} chương</strong>
                  </div>
                </div>

                <div className="button-boxes">
                  <button className="read-button" onClick={DocNgay}><strong>Đọc ngay</strong></button>
                  <button
                    className={`favorite-icon ${isFavorite ? "favorite" : ""}`}
                    onClick={toggleFavorite}
                  >
                      <IoIosHeartEmpty />
                  </button>
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
                  {truyen.idCacChuong && truyen.idCacChuong.map((chuong, index) => (
                      <div key={index} className={`chapter-item ${chuong.isRead ? 'read' : 'unread'}`} onClick={() => DocChuong(chuong._id, chuong.tenChuong)}>
                          <div style={{display:'flex'}}>
                            <p>{chuong.tenChuong}</p>
                            <p style={{marginLeft:'10px'}}>( Ngày đăng: {moment(chuong.createdAt).format('DD/MM/YYYY')} )</p>
                            <p>{chuong.isLocked && <FaLock style={{ marginLeft: '10px', color: '#f44336' }} />}</p>
                          </div>
                          {chuong.isRead ? <p>Đã đọc</p> : <p>Chưa đọc</p>}
                      </div>
                  ))}
              </div>
            </div>

            <div className="section">
              <h2>Đánh giá</h2>
              <DanhGiaTruyen idTruyen={idTruyen}/>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default Chitiettruyen;
