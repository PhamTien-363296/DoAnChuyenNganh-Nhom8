import '../viettruyen/Viettruyen.css';
import TextEditor from "../viettruyen/TextEditor";
import { useState, useEffect } from "react";
import axios from 'axios'; 
import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const SuaChuong = () => {
    const [text, setText] = useState(""); 
    const [chapterTitle, setChapterTitle] = useState("");
    const [thongBao, setThongBao] = useState("");
    const [formData, setFormData] = useState({
        tenChuong: '',
        noiDungChuong: '',
    });
    
    const navigate = useNavigate();

    const location = useLocation();
    const { idChuong } = location.state || {};

    console.log('ID:', idChuong);

    const replaceSpacesWithNbsp = (content) => {
        if (!content) return content;
        return content.replace(/ /g, '&nbsp;');
    };

    const handleTitleChange = (e) => {
        setChapterTitle(e.target.value); 
    };

    const handleViettruyen = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('/api/chuong/them', {
            tenChuong: chapterTitle,  
            noiDungChuong: text,     

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

    useEffect(() => {
        fetchChuong(idChuong)
    }, [idChuong]);

    const fetchChuong = async (idChuong) => {
        try {
            const response = await axios.get(`/api/chuong/laytheoid/${idChuong}`);
            const chuong = response.data;
            setFormData({
                tenChuong: chuong.tenChuong,
                noiDungChuong: chuong.noiDungChuong,
            });
            setText(chuong.noiDungChuong); 
        } catch (error) {
            console.error("Có lỗi xảy ra khi lấy chương:", error);
        }
    };

    return (
        <>
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
                    dangerouslySetInnerHTML={{ __html: replaceSpacesWithNbsp(text) || "<br />" }}
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
        </>
    );
};

export default SuaChuong;
