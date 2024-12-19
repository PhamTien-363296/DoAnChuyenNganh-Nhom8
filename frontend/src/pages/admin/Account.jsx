import { useState, useEffect } from "react";
import { FaUserAlt, FaEnvelope } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import axios from "axios";
import Navadmin from "../../components/admin/navigation/Navadmin";
import "./Account.css";

function Account() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
   email: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/auth/getme");
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email || "",
        });
      } catch (err) {
        console.error("Không thể lấy thông tin người dùng.", err);
      }
    };

    fetchUserData();
  }, []);

  // Handle form updates
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch("/api/nguoidung/update", formData);
      setUser(response.data.nguoidung);
      setIsEditing(false);
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Không thể cập nhật thông tin.", err);
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Navadmin>
      <div className="account-details">
        <div className="account-avatar">
          <MdAccountCircle style={{ fontSize: "100px" }} />
        </div>
        <h3>{user?.username || "Admin"}</h3>

        <div className="account-info">
          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <div className="account-container">
                <div className="account-item">
                  <FaUserAlt className="icon" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Tên người dùng"
                  />
                </div>
              </div>
              <div className="account-container">
                <div className="account-item">
                  <BiUser className="icon" />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
              </div>
              <button type="submit" className="save-button">Lưu</button>
            </form>
          ) : (
            <>
              <div className="account-container">
                <div className="account-item">
                  <FaUserAlt className="icon" /> {user?.username}
                </div>
                <div className="account-item1">
                  <BiUser className="icon" /> Quản trị viên
                </div>
              </div>
              <div className="account-container">
                <div className="account-item">
                  <FaEnvelope className="icon" /> {user?.email}
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Chỉnh sửa
              </button>
            </>
          )}
        </div>
      </div>
    </Navadmin>
  );
}

export default Account;
