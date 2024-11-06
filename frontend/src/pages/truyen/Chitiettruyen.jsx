import './Chitiettruyen.css'

import {  FaEye, FaStar } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import Searchmain from '../../components/common/Searchmain';
import Sidebar from '../../components/common/Sidebar';



function Chitiettruyen() {
    return (
      <>
  <Sidebar/>
  <Searchmain/>
  <div className="main-content">
  <div className="padding-left">
  <div className="content-wrapper">
  
  
        <div className="left">
          <div className="image-container">
          <img src="https://placehold.co/260x360"/>
          </div>
        </div>
  
  
        <div className="right">
          <h1 className="story-name">Một lúc rảnh rỗi</h1>
          <div className="info">
              <div className="title-color">
                <IoMdPerson className="icon"/>
                <strong>Tác giả</strong> Admintramcam
              </div>
              <div className="title-color">
                <FaChartSimple className="icon" />
                <strong>Tình trạng</strong>
                <span className="status">
                  <strong><HiOutlinePencilSquare style={{ fontSize: '14px', marginRight: '5px'}} />Đang viết</strong>
                </span>
              </div>
              <div className="title-color">
                <FaTag className="icon"/>
                <strong>Thể loại</strong> Random
              </div>
              <div className="title-color">
                <FaEye className="icon" />
                <strong>Lượt xem</strong>12 
                <strong style={{ marginLeft: '20px'}}>Đánh giá</strong> 
                  <span className="rating"><FaStar style={{ fontSize:'12px'}} />4.1</span>
              </div>
              <div className="title-color">
                <FaBookOpen className="icon"/>
                <strong>10 chương</strong>
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
                    <p>Đắc nhân tâm của Dale Carnegie là quyển sách của mọi thời đại và một hiện tượng đáng kinh ngạc trong ngành xuất bản Hoa Kỳ. Trong suốt nhiều thập kỷ tiếp theo và cho đến tận bây giờ, tác phẩm này vẫn chiếm vị trí số một trong danh mục sách bán chạy nhất và trở thành một sự kiện có một không hai trong lịch sử ngành xuất bản thế giới và được đánh giá là một quyển sách có tầm ảnh hưởng nhất mọi thời đại.
                    Đây là cuốn sách độc nhất về thể loại self-help sở hữu một lượng lớn người hâm mộ. Ngoài ra cuốn sách có doanh số bán ra cao nhất được tờ báo “The New York Times” bình chọn trong nhiều năm. Cuốn sách này không còn là một tác phẩm về nghệ thuật đơn thuần nữa mà là một bước thay đổi lớn trong cuộc sống của mỗi người.</p>
          </div>
  
  
          <div className="section">
            <h2>Mục lục</h2>
            <div className="chapter">
              <div className="chapter-item">tiêu đề 1</div>
              <div className="chapter-item">tiêu đề 2</div>
              <div className="chapter-item">tiêu đề 3</div>
            </div>
          </div>
  
           <div className="section">
            <h2>Đánh giá</h2>
            <div className="review">
              <img className="review-avatar" src="https://placehold.co/50" alt="User avatar"/>
              <div className="review-content">
                <div className="review-header">
                  <span className="review-user">Killer_panda</span>
                  <span className="review-rating"><FaStar /> 5.0</span>
                  <span className="review-date">22-10-2023 10:52</span>
                </div>
                <p>Great book! I actually like it so much, and the seller is friendly by the way, always support the shop.</p>
              </div>
            </div>
            <div className="review">
              <img className="review-avatar" src="https://placehold.co/50" alt="User avatar"/>
              <div className="review-content">
                <div className="review-header">
                  <span className="review-user">Killer_panda</span>
                  <span className="review-rating"><FaStar /> 5.0</span>
                  <span className="review-date">22-10-2023 10:52</span>
                </div>
                <p>Great book! I actually like it so much, and the seller is friendly by the way, always support the shop.</p>
              </div>
            </div>
            </div>
  
  </div>
  </div>
  
     
          
      </>
    )
  }
  
  export default Chitiettruyen;
  