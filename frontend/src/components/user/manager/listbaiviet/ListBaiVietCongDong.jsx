import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { HiOutlinePhotograph } from 'react-icons/hi'; 
import { IoCloseSharp } from 'react-icons/io5'; 
import BaiVietItem from '../../common/items/baivietitem/BaiVietItem';
import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import "./ListBaiVietCongDong.css";

function ListBaiVietCongDong() {
  const location = useLocation();
  const { idCongDong } = location.state || {};
  const [baiviets, setBaiviets] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [coverImage, setCoverImage] = useState(null); 
  const [formData, setFormData] = useState({
    noiDungBV: '', 
    hinhAnhBV: '' 
  });
  const [congdong, setCongdong] = useState({
    tenCD: '',
    anhCD: '',
    soLuongTV: 0,
    gioiThieu: ''
  });

  const imgRef = useRef(null);

  // Lấy danh sách bài viết
  const baiVietTatCa = async () => {
    try {
      const response = await Axios.get(`/api/baiviet/lay/congdong/${idCongDong}`);
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setBaiviets(response.data);
      } else {
        setBaiviets([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi đổ dữ liệu bài viết:", error);
      alert("Lỗi khi đổ dữ liệu bài viết: " + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  // Lấy thông tin cộng đồng
  const layThongTinCongDong = async () => {
    try {
      const response = await Axios.get(`/api/nguoidung/lay/thongtin/congdong/${idCongDong}`);
      console.log(response.data);
      if (response.data) {
        setCongdong({
          tenCD: response.data.tenCD,
          anhCD: response.data.anhCD,
          soLuongThanhVien: response.data.soLuongThanhVien,
          moTaCD: response.data.moTaCD
        });
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin cộng đồng:", error);
      alert("Lỗi khi lấy thông tin cộng đồng: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    baiVietTatCa();
    layThongTinCongDong();

    const interval = setInterval(() => {
      baiVietTatCa();
    }, 7000);

    return () => clearInterval(interval);
  }, [idCongDong]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  // Xử lý thay đổi hình ảnh
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

  // Xử lý xóa hình ảnh
  const handleRemoveImage = () => {
    setCoverImage(null);
    setFormData((prevData) => ({
      ...prevData,
      hinhAnhBV: '',
    }));
    if (imgRef.current) imgRef.current.value = null;
  };

  // Xử lý gửi bài viết
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`/api/baiviet/taobaiviet/congdong/${idCongDong}`, formData);
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
    <MainLayout>
      <div className="congdong-anh">
        <img src={congdong.anhCD || "path/to/image.jpg"} alt="Ảnh cộng đồng" />
        <div className="congdong-anh-text">
          <p style={{fontSize:'35px', fontWeight:'bold'}}>{congdong.tenCD}</p>
          <p style={{fontSize:'20px', marginTop:'10px'}}>{congdong.soLuongThanhVien} thành viên</p>
        </div>
      </div>

      <div className='congdong-noidung'>
        <div className='congdong-baiviet'>
          <div className='congdong-thembaiviet'>
            <div className='congdong-avata'>
              <img src='https://placehold.co/129x203' alt="Avatar" />
            </div>
            <div className='congdong-camnghi'>
              <textarea
                placeholder="Bạn đang nghĩ gì?"
                rows="4"
                className='text-input'
                value={formData.noiDungBV}
                onChange={(e) => setFormData({ ...formData, noiDungBV: e.target.value })}
              />
              {coverImage && (
                <div className='img-container'>
                  <IoCloseSharp className='close-icon' onClick={handleRemoveImage} />
                  <img src={coverImage} alt="Preview" />
                </div>
              )}
            </div>
            <div className='congdong-themanh-icon'>
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
            <div className='congdong-dang'>
              <button onClick={handleSubmit} disabled={!formData.noiDungBV}>
                Đăng
              </button>
            </div>
          </div>
          <div className='congdong-list-baiviet'>
            {baiviets.length === 0 ? (
              <p>Cộng đồng này chưa có bài viết nào.</p>
            ) : (
              baiviets.map((baiviet, index) => (
                <Link
                  to={baiviet.path}
                  key={index}
                  style={{ textDecoration: 'none', color: '#49372F', marginTop:'15px' }}
                >
                  <BaiVietItem
                    noiDungBV={baiviet.noiDungBV}
                    luotThichBV={baiviet.cacluotThich.length}
                    binhLuanBV={baiviet.binhLuanBV}
                    IdNguoiDung={baiviet.nguoiDungIdBV}
                    username={baiviet.nguoiDungIdBV.username}
                    anhDaiDienND={baiviet.nguoiDungIdBV.anhDaiDienND} 
                    tenCD={baiviet.thuocCD ? baiviet.thuocCD.tenCD : null}
                    hinhAnh={baiviet.hinhAnhBV}
                    baiVietId={baiviet._id}
                    baiviet={baiviet}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
        <div className='congdong-thongtin'>
          <div className='congdong-gioithieu'>
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>GIỚI THIỆU</p>
            <p>{congdong.moTaCD}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ListBaiVietCongDong;
