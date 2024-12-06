import '../viettruyen/Viettruyen.css';
import TextEditor from "./TextEditor";
import { useState, useEffect } from "react";
import axios from 'axios'; 
import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const SuaChuong = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { idChuong } = location.state || {}; // Lấy id chương từ URL hoặc trạng thái

    const [text, setText] = useState("");  // Lưu nội dung chương (HTML)
    const [chapterTitle, setChapterTitle] = useState(""); // Tên chương
    const [thongBao, setThongBao] = useState(""); // Thông báo
    const [formData, setFormData] = useState({
        tenChuong: '',
        noiDungChuong: '',
    });

    // Cập nhật nội dung khi người dùng thay đổi
    const handleTitleChange = (e) => {
        setChapterTitle(e.target.value); 
    };

    const handleViettruyen = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/chuong/them', {
                tenChuong: chapterTitle,  
                noiDungChuong: text, // Dữ liệu chính thức sẽ lấy từ Quill (text)
            });

            setThongBao('Sửa chương thành công!');
            navigate('/taikhoan/tacpham'); // Sau khi sửa, chuyển hướng
            console.log(response.data);
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            setThongBao(error.response?.data?.message || 'Lỗi xuất bản. Vui lòng thử lại!');
        }
    };

    // Lấy dữ liệu chương từ API
    useEffect(() => {
        if (idChuong) {
            fetchChuong(idChuong);
        }
    }, [idChuong]);

    const fetchChuong = async (idChuong) => {
        try {
            const response = await axios.get(`/api/chuong/laytheoid/${idChuong}`);
            const chuong = response.data;
            setFormData({
                tenChuong: chuong.tenChuong,
                noiDungChuong: chuong.noiDungChuong,
            });
            setText(chuong.noiDungChuong);  // Cập nhật nội dung chương
        } catch (error) {
            console.error("Có lỗi xảy ra khi lấy chương:", error);
        }
    };

    return (
        <MainLayout>
            <div className="all">
                <div className="block">
                    <input
                        type="text"
                        value={formData.tenChuong}
                        onChange={handleTitleChange}
                        placeholder="Nhập tên chương"
                        className="chapter-title-input"
                    />
                    <div className="block-1"
                        style={{
                            width: '100%',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                        }}
                        dangerouslySetInnerHTML={{ __html: text || "<br />" }}  // Hiển thị nội dung cũ từ Quill
                    />
                    <div className="block-2">
                        <form>
                            <TextEditor setText={setText} value={text} />
                        </form>
                    </div>
                </div>
                <button className="create-story" onClick={handleViettruyen}>Xuất bản</button>
                {thongBao && <div className="thong-bao">{thongBao}</div>}
            </div>
        </MainLayout>
    );
};

export default SuaChuong;
