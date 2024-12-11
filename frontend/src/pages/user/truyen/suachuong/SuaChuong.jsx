import '../viettruyen/Viettruyen.css';
import { useState, useEffect } from "react";
import axios from 'axios'; 
import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './SuaChuong.css'
const SuaChuong = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { idChuong } = location.state || {};

    const [thongBao, setThongBao] = useState("");
    const [formData, setFormData] = useState({
        tenChuong: '',
        noiDungChuong: '',
        xuDeMoChuong: 0,
        trangThaiChuong: '',
    });

    const handleViettruyen = async (e) => {
        e.preventDefault();

        try {
            const response2 = await axios.patch(`/api/chuong/sua/${idChuong}`, formData); 
            setThongBao('Sửa chương thành công!');
            navigate('/taikhoan/tacpham'); 
            console.log(response2.data);
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            setThongBao(error.response?.data?.message || 'Lỗi xuất bản. Vui lòng thử lại!');
        }
    };

    useEffect(() => {
        if (idChuong) {
            fetchChuong(idChuong);
        }
    }, [idChuong]);

    const fetchChuong = async (idChuong) => {
        try {
            const response = await axios.get(`/api/chuong/laytheoid/${idChuong}`);
            setFormData({
                tenChuong: response.data.chuong.tenChuong,
                noiDungChuong: response.data.chuong.noiDungChuong,
                xuDeMoChuong: response.data.chuong.xuDeMoChuong,
                trangThaiChuong: response.data.chuong.trangThaiChuong,
            });
        } catch (error) {
            console.error("Có lỗi xảy ra khi lấy chương:", error);
        }
    };

    const xulyXoa = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa chương này?");
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`/api/chuong/${idChuong}`);
            if (response.status === 200) {
                alert("Xóa thành công!");
                navigate('/taikhoan/tacpham');
            } else {
                alert("Có lỗi xảy ra khi xóa chương, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa chương:", error);
            alert("Lỗi khi xóa chương: " + (error.response?.data?.message || error.message));
        }
    }; 


    return (
        <MainLayout>
            <div className="sua-chuong-container">
                <div className="form-container-ch">
                    <input
                        type="text"
                        value={formData.tenChuong} 
                        onChange={(e) => setFormData({ ...formData, tenChuong: e.target.value })}
                        placeholder="Nhập tên chương"
                        className="input-field-ch"
                    />
                    <div
                        className="noidung-chuong-ch"
                        dangerouslySetInnerHTML={{ __html: formData.noiDungChuong }}
                        contentEditable
                        onInput={(e) => setFormData({ ...formData, noiDungChuong: e.target.innerHTML })}
                    />
                </div>

                <div className="form-group-ch">
                    <label style={{fontWeight:'bold', fontSize:'17px'}}>Trạng thái chương:</label>
                    <div className="radio-group-ch">
                        <div className='form-group-ch-item'>
                            <label>Riêng tư</label>
                            <input
                                type="radio"
                                name="trangThaiChuong"
                                value="Riêng tư"
                                checked={formData.trangThaiChuong === "Riêng tư"}
                                onChange={(e) => setFormData({ ...formData, trangThaiChuong: e.target.value })}
                            />
                        </div>
                        <div className='form-group-ch-item'>
                            <label>Công khai</label>
                            <input
                                type="radio"
                                name="trangThaiChuong"
                                value="Công khai"
                                checked={formData.trangThaiChuong === "Công khai"}
                                onChange={(e) => setFormData({ ...formData, trangThaiChuong: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group-ch">
                    <label style={{fontWeight:'bold', fontSize:'17px'}}>Bạn có muốn khóa?</label>
                    <input
                        type="number"
                        value={formData.xuDeMoChuong} 
                        onChange={(e) => setFormData({ ...formData, xuDeMoChuong: e.target.value })}
                        placeholder="Nhập số xu"
                        className="form-group-ch-item"
                    />
                </div>

                <button className="submit-btn-ch" onClick={handleViettruyen}>Cập nhật</button>
                <div className='xoatruyen_button' style={{cursor:'pointer', fontWeight:'500'}} onClick={() => xulyXoa()}>XÓA CHƯƠNG</div>

                {thongBao && <div className="notification-ch">{thongBao}</div>}
            </div>
        </MainLayout>
    );
};

export default SuaChuong;
