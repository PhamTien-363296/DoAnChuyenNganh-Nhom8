import {  FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEuro, AiOutlineDollar } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import Navadmin from '../../components/admin/navigation/Navadmin';
import './Account.css'

function Account() {
  return (
    <>
<Navadmin>
<div className="account-details">
            <div className="account-avatar">
                <MdAccountCircle></MdAccountCircle>
            </div>
            <h3>Admin</h3>

            <div className="account-info">
                <div className="account-container">
                    <div className="account-item"><FaUserAlt className="icon" /> Nguyễn Văn Tèo</div>
                    <div className="account-item1"><BiUser className="icon" /> Quản trị viên 1</div>
                </div>

                <div className="account-container">
                    <div className="account-item"><FaEnvelope className="icon" /> teo123@gmail.com</div>
                    <div className="account-item1"><AiOutlineEuro className="icon" /> 1250</div>
                </div>

                <div className="account-container">
                    <div className="account-item"><AiOutlineDollar className="icon" /> 1002</div>
                    <div className="account-item1"><FaLock className="icon" /> ••••••</div>
                </div>
            </div>
            <button className="logout-button">Đăng xuất</button>
          </div>
</Navadmin>
    </>
  );
}


export default Account;