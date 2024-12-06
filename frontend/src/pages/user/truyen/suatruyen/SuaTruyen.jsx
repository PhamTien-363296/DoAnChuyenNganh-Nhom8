import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import './style.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation  } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SuaTruyen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { idTruyen } = location.state || {};

    console.log('ID:', idTruyen);
    const [coverImage, setCoverImage] = useState(null); 
    const [formData, setFormData] = useState({
        tenTruyen: '',
        moTaTruyen: '',
        anhTruyen: '', 
        theLoaiIdTruyen: '',
        tinhTrangTruyen: '',
        trangThaiTruyen: '',
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchTruyen(idTruyen);
        fetchTheloai();
    }, [idTruyen]);

    const fetchTheloai = async () => {
        try {
            const response = await axios.get('/api/theloai');
            const categoryNames = response.data.map(category => ({
                id: category._id,
                name: category.tieuDeTheLoai,
            }));
            setCategories(categoryNames); 
        } catch (error) {
            console.error("Có lỗi xảy ra khi lấy thể loại:", error);
        }
    };

    const fetchTruyen = async (idTruyen) => {
        try {
            const response = await axios.get(`/api/truyen/laytheoid/${idTruyen}`);
            const truyen = response.data;
            setFormData({
                tenTruyen: truyen.tenTruyen,
                moTaTruyen: truyen.moTaTruyen,
                anhTruyen: truyen.anhTruyen,
                theLoaiIdTruyen: truyen.theLoaiIdTruyen,
                tinhTrangTruyen: truyen.tinhTrangTruyen,
                trangThaiTruyen: truyen.trangThaiTruyen,
            });
            setCoverImage(truyen.anhTruyen); 
        } catch (error) {
            console.error("Có lỗi xảy ra khi lấy truyện:", error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];  
        if (file) {
        const reader = new FileReader(); 
        reader.onloadend = () => {
            setCoverImage(reader.result);  
            setFormData((prevData) => ({
            ...prevData,
            anhTruyen: reader.result,  
            }));
        };
        reader.readAsDataURL(file);  
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`/api/truyen/sua/${idTruyen}`, formData);
    
            if (response.status === 200 || response.status === 204) {
                alert("Cập nhật thành công!");
                setFormData({
                    tenTruyen: '',
                    moTaTruyen: '',
                    anhTruyen: '',
                    theLoaiIdTruyen: '',
                    tinhTrangTruyen: '',
                    trangThaiTruyen: '',
                });
                setCoverImage(null);
                navigate('/taikhoan/tacpham');
            } else {
                alert("Có lỗi xảy ra khi cập nhật truyện.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật truyện:", error);
            alert("Có lỗi xảy ra khi cập nhật truyện.");
        }
    };

    const xulyXoa = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thể loại này?");
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`/api/truyen/${idTruyen}`);
            if (response.status === 200) {
                toast.success("Xóa thành công!", { duration: 2000 });
                navigate('/taikhoan/tacpham');
            } else {
                alert("Có lỗi xảy ra khi xóa thể loại, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa thể loại:", error);
            alert("Lỗi khi xóa thể loại: " + (error.response?.data?.message || error.message));
        }
    }; 

    return (
        <MainLayout>
            <div className="padding-left">
                <div className="main-container"> 
                    <div
                        className="cover-container"
                        onClick={() => document.getElementById("coverImg").click()}
                    >
                        <img src={coverImage || ''} alt="Selected Cover" />
                        <input
                            type="file"
                            id="coverImg"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="form-container">
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h2>Chi tiết</h2>
                            <div className='xoatruyen_button' style={{cursor:'pointer', fontWeight:'500'}} onClick={() => xulyXoa()}>XÓA TRUYỆN</div>
                        </div>
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input
                                type="text"
                                placeholder="Nhập tiêu đề..."
                                name="tenTruyen"
                                value={formData.tenTruyen}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mô tả</label>
                            <textarea
                                placeholder="Nhập mô tả..."
                                name="moTaTruyen"
                                value={formData.moTaTruyen}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Loại</label>
                            <select
                                name="theLoaiIdTruyen"
                                value={formData.theLoaiIdTruyen}
                                onChange={handleChange}
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tình trạng</label>
                            <select
                                name="tinhTrangTruyen"
                                value={formData.tinhTrangTruyen}
                                onChange={handleChange}
                            >
                                <option value="Đang viết">Đang viết</option>                     
                                <option value="Hoàn thành">Hoàn thành</option>
                                <option value="Tạm dừng">Tạm dừng</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Đăng tải</label>
                            <label>
                                <input
                                    type="radio"
                                    name="trangThaiTruyen"
                                    value="Riêng tư"
                                    checked={formData.trangThaiTruyen === "Riêng tư"}
                                    onChange={handleChange}
                                />
                                Riêng tư
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="trangThaiTruyen"
                                    value="Công khai"
                                    checked={formData.trangThaiTruyen === "Công khai"}
                                    onChange={handleChange}
                                />
                                Công khai
                            </label>
                        </div>
                        <button type="submit" className="next-button"><strong>Tiếp tục</strong></button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default SuaTruyen;
