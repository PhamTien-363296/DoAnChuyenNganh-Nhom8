import '../../assets/css/Navadmin.css'
import PropTypes from 'prop-types'; 
import { FaBell } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

function Navadmin({ children }) {


  return (
    <>
    <div className="background">
    <nav className="nav-admin">
        <div className='chao'>Chào,Tiên</div>
        <ul>
          <li><FaBell style={{ color: '#482F0B', fontSize: '25px' }} /></li>
          <li><MdAccountCircle style={{ color: '#482F0B', fontSize: '30px' }} /></li>
        </ul>
      </nav>

    <div className="nav-container">
            <div className="sidebar-admin">
              <ul>
                <li>
                  <Link to="/adminhome"><AiFillHome style={{ color: '#482F0B', fontSize: '32px' }} /></Link>
                </li>
                <li>
                  <Link to="/baocao"> <HiClipboardDocumentCheck style={{ color: '#482F0B', fontSize: '32px' }} /></Link>
                </li>
                <li>
                  <Link to="/chat"> <IoChatbubbleEllipsesSharp style={{ color: '#482F0B', fontSize: '32px' }} /></Link>
                </li>
                <li>
                  <Link to="/account"><MdAccountCircle style={{ color: '#482F0B', fontSize: '32px' }} /></Link>
                </li>
              </ul>
            </div>

            {children}

      </div>
    </div>
    </>
  )
}

Navadmin.propTypes = {
  children: PropTypes.node,
};

export default Navadmin;
