
import MainLayout from '../../../../layout/user/mainLayout/MainLayout';

import './Taotruyen.css';
import { useState } from "react";

const Taotruyen = () => {
  const [coverImage, setCoverImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setCoverImage(imageURL);
    }
  };

  return (
    <>
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

          <div className="form-container">
            <h2>Chi tiết</h2>
            <div className="form-group">
              <label>Tiêu đề</label>
              <input type="text" placeholder="Nhập tiêu đề..." />
            </div>
            <div className="form-group">
              <label>Mô tả</label>
              <textarea placeholder="Nhập mô tả..."></textarea>
            </div>
            <div className="form-group">
              <label>Loại</label>
              <select>
                <option>Chọn danh mục</option>
                <option>Thể loại 1</option>
                <option>Thể loại 2</option>
              </select>
            </div>
            <button className="next-button"><strong>Tiếp tục</strong></button>
          </div>

        </div>
      </div>
      </MainLayout>
    </>
  );
};

export default Taotruyen;
