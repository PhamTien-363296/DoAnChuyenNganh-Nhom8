import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import './Taotruyen.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

const Taotruyen = () => {
  const [coverImage, setCoverImage] = useState(null); 
  const { data: authUser } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/auth/getme');
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  const [formData, setFormData] = useState({
    tenTruyen: '',
    moTaTruyen: '',
    anhTruyen: '', 
    theLoaiIdTruyen: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
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

    fetchCategories();
  }, []);

  if (!authUser) {
    return <Navigate to="/dangnhap" />;
  }

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
      const response = await axios.post('/api/truyen/them', formData);
      if (response.status === 201) {
        alert("Thêm thành công!");
        setFormData({
          tenTruyen: '',
          moTaTruyen: '',
          anhTruyen: '',
          theLoaiIdTruyen: '',
        });
        setCoverImage(null);
      }
    } catch (error) {
      console.error("Lỗi khi thêm truyện:", error);
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

          <form onSubmit={handleSubmit} className="form-container">
            <h2>Chi tiết</h2>
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
            <button type="submit" className="next-button"><strong>Tiếp tục</strong></button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Taotruyen;
