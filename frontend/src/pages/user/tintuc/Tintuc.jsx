import { useState, useEffect } from 'react';
import ListBaiVietTinTuc from '../../../components/user/manager/listbaiviet/ListBaiVietTinTuc';
import MainLayout from '../../../layout/user/mainLayout/MainLayout';
import './Tintuc.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate

export default function Tintuc() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        tenCD: '',
        moTaCD: '',
        anhCD: '',
    });

    const [coverImage, setCoverImage] = useState(null);
    const [congdong, setCongDong] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Initializing navigate

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result);
                setFormData((prevData) => ({
                    ...prevData,
                    anhCD: reader.result,
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
            const response = await Axios.post('/api/nguoidung/tao/congdong', formData);
            if (response.status === 201) {
                alert('Thêm thành công!');
                setFormData({
                    tenCD: '',
                    moTaCD: '',
                    anhCD: '',
                });
                setCoverImage(null);
            }
        } catch (error) {
            console.error('Lỗi khi thêm cộng đồng:', error);
        }
    };

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const congDongDaThamGia = async () => {
        try {
            const response = await Axios.get('/api/nguoidung/lay/congdong/dathamgia');
            setCongDong(response.data.congdong || []);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu cộng đồng:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        congDongDaThamGia();

        const interval = setInterval(() => {
            congDongDaThamGia();
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <p>Đang tải...</p>;
    }

    const handleRemoveCongDong = async (id, event) => {
        event.stopPropagation(); // Prevent navigation when clicking "Remove"
        try {
            const response = await Axios.post(`api/nguoidung/thamgia/congdong/${id}`);
            if (response.status === 200) {
                alert("Đã bỏ tham gia cộng đồng!");
                setCongDong(congdong.filter(cd => cd._id !== id)); 
            }
        } catch (error) {
            console.error("Lỗi khi bỏ tham gia cộng đồng:", error);
            alert("Không thể bỏ tham gia, vui lòng thử lại.");
        }
    };

    return (
        <MainLayout>
            <div className='tt-tintuc-container'>
                <div className='tt-noidung'>
                    <div className='tt-tieude'>TIN TỨC</div>
                    <div className='tt-list'>
                        <ListBaiVietTinTuc />
                    </div>
                </div>

                <div className='tt-congdong'>
                    <div className='tt-tieude'>
                        CỘNG ĐỒNG
                        <button className='bt-taocongdong' onClick={toggleForm}>TẠO MỚI</button>
                    </div>

                    {isFormVisible && (
                        <div className="form-backdrop" onClick={toggleForm}>
                            <div className="form-container" onClick={(e) => e.stopPropagation()}>
                                <div
                                    className="image-placeholder"
                                    onClick={() => document.getElementById("coverImg").click()}
                                >
                                    {coverImage ? (
                                        <img src={coverImage} alt="Selected Cover" />
                                    ) : (
                                        <div className="custom-placeholder">Add a cover</div>
                                    )}
                                    <input
                                        type="file"
                                        id="coverImg"
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="form-fields">
                                    <input
                                        type="text"
                                        name="tenCD"
                                        value={formData.tenCD}
                                        placeholder="TÊN CỘNG ĐỒNG"
                                        onChange={handleChange}
                                    />
                                    <textarea
                                        name="moTaCD"
                                        value={formData.moTaCD}
                                        placeholder="MÔ TẢ"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="button-container">
                                    <button className='bt-create' onClick={handleSubmit}>TẠO</button>
                                    <button className='bt-close' onClick={toggleForm}>ĐÓNG</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='tt-list-congdong'>
                        {congdong.length > 0 ? (
                            congdong.map((cd) => (
                                <div key={cd._id} className="congdong-item"
<<<<<<< HEAD
                                     onClick={() => navigate(`/congdong/${cd._id}`)}>
=======
                                    onClick={() => navigate(`/congdong/${cd._id}`)}>
>>>>>>> a7c24f22e2db6c7d85438ec1d53b22f6493a9c33
                                    <img src={cd.anhCD} alt={cd.tenCD} />
                                    <div>
                                        <h3>{cd.tenCD}</h3>
                                    </div>
                                    <button 
                                        className="btn-remove"
                                        onClick={(event) => handleRemoveCongDong(cd._id, event)} // Pass event to stop propagation
                                    >
                                        X
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>Bạn chưa tham gia cộng đồng nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
