import './Viettruyen.css';
import TextEditor from "./TextEditor";
import { useState } from "react";
import axios from 'axios'; 
import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import "quill/dist/quill.snow.css";

const Viettruyen = () => {
  const [text, setText] = useState(""); 
  const [chapterTitle, setChapterTitle] = useState("");
  const [thongBao, setThongBao] = useState("");
  
  const navigate = useNavigate();

  const location = useLocation();
  const { idTruyen } = location.state || {}; // Access the passed `id`

  console.log('ID:', idTruyen);

  const handleTitleChange = (e) => {
    setChapterTitle(e.target.value); 
  };

  const handleViettruyen = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/chuong/them', {
        tenChuong: chapterTitle,  
        noiDungChuong: text,     
        truyenIdChuong: idTruyen,
      });

      setThongBao('Xuất bản thành công!');
      navigate('/taikhoan/tacpham');
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Lỗi từ server:', error.response.data);
        setThongBao(error.response.data.message || 'Lỗi xuất bản. Vui lòng thử lại!');
      } else {
        console.error('Lỗi không xác định:', error.message);
        setThongBao('Lỗi không xác định. Vui lòng thử lại sau!');
      }
    }
  };

  return (
    <>
      <MainLayout>
        <div className="all">
          <div className="block">
            <input
              type="text"
              value={chapterTitle}
              onChange={handleTitleChange}
              placeholder="Nhập tên chương"
              className="chapter-title-input"
            />
            <div
              className="ql-editor text"
              dangerouslySetInnerHTML={{ __html: text || "<br />" }}
            />
            <div className="block-2">
              <form>
                <TextEditor setText={setText} />
              </form>
            </div>
            <button className="create-story" onClick={handleViettruyen}>Xuất bản</button>
            {thongBao && <div className="thong-bao">{thongBao}</div>}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Viettruyen;
