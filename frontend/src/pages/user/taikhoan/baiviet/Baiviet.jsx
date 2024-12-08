import { useState, useRef } from 'react';
import TaiKhoanLayout from '../../../../layout/user/taikhoanlayout/TaiKhoanLayout';
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5"; 
import './style.css';
import ListBaiVietTaiKhoan from '../../../../components/user/manager/listbaiviet/ListBaiVietTaiKhoan';
import Axios from 'axios';

export default function Baiviet() {
    const [coverImage, setCoverImage] = useState(null); 
    const [formData, setFormData] = useState({
        noiDungBV: '',
        hinhAnhBV: ''
    });

    const imgRef = useRef(null); 

    const handleImageChange = (event) => {
        const file = event.target.files[0];  
        if (file) {
            const reader = new FileReader(); 
            reader.onloadend = () => {
                setCoverImage(reader.result);  
                setFormData((prevData) => ({
                    ...prevData,
                    hinhAnhBV: reader.result,  
                }));
            };
            reader.readAsDataURL(file);  
        }
    };

    const handleRemoveImage = () => {
        setCoverImage(null); 
        setFormData((prevData) => ({
            ...prevData,
            hinhAnhBV: '', 
        }));
        if (imgRef.current) imgRef.current.value = null; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await Axios.post('/api/baiviet/taobaiviet', formData);
            if (response.status === 201) {
                alert("Thêm thành công!");
                setFormData({ noiDungBV: '', hinhAnhBV: '' }); 
                setCoverImage(null); 
            } else {
                alert("Có lỗi xảy ra khi thêm bài viết, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi thêm bài viết:", error);
            alert("Lỗi khi thêm bài viết: " + (error.response?.data?.message || error.message));
        }
    };

    const handleIconClick = () => {
        if (imgRef.current) imgRef.current.click();
    };

    return (
        <TaiKhoanLayout>
            <div className='bv-baiviet-container'>
                <div className='bv-noidung'>
                    <div className='bv-thembaiviet'>
                        <div className='bv-avata'>
                            <img src='https://placehold.co/129x203' alt="Avatar" />
                        </div>
                        <div className='bv-camnghi'>
                            <textarea 
                                placeholder="Bạn đang nghĩ gì?" 
                                rows="4" 
                                className='text-input' 
                                value={formData.noiDungBV}
                                onChange={(e) => setFormData({...formData, noiDungBV: e.target.value})}
                            />
                            {coverImage && (
                                <div className='img-container'>
                                    <IoCloseSharp className='close-icon'
                                        onClick={handleRemoveImage}
                                    />
                                    <img src={coverImage} alt="Preview" />
                                </div>
                            )}
                        </div>
                        <div className='bv-themanh-icon'>
                            <input 
                                type="file"
                                id="file-input"
                                hidden
                                ref={imgRef} 
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            <HiOutlinePhotograph onClick={handleIconClick} className="cursor-pointer text-xl" />
                        </div>
                        <div className='bv-dang'>
                            <button onClick={handleSubmit}>Đăng</button>
                        </div>
                    </div>
                    <div className='bv-tieude'>BÀI VIẾT</div>
                    <div className='bv-list'><ListBaiVietTaiKhoan /></div>
                </div>

                <div className='bv-thongtin'>
                    <div className='bv-gioithieu'>
                        <p className='bv-tieude'>GIỚI THIỆU</p>
                        <p className='bv-noidung'>Xin chào</p>
                    </div>
                    <div className='bv-list-nguoitheodoi'>
                        <p className='bv-tieude'>NGƯỜI THEO DÕI</p>
                        <div className='bv-list'>danh sách</div>
                    </div>
                </div>
            </div>
        </TaiKhoanLayout>
    );
}
