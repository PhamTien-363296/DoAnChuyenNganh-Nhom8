import PropTypes from 'prop-types';
import "./Hoithoai.css";
import useConversation from '../../../../../zustand/useConversation';
import { useSocketContext } from '../../../../../context/SocketContext';

const Hoithoai = ({ hoithoai,anh }) => {
  const { hoiThoaiDuocChon, setHoiThoaiDuocChon } = useConversation();
  const duocChon = hoiThoaiDuocChon?._id === hoithoai._id;
  const {NDOnline} = useSocketContext()
  const isOnline = NDOnline.includes(hoithoai._id)
  return (
    <>
      <div
        className="chat-item"
        style={{
          backgroundColor: duocChon ? "#ebd9bf" : "transparent",
          cursor: "pointer",
        }}
        onClick={() => setHoiThoaiDuocChon(hoithoai)} 
      >
        <div className="chat-avatar">
          <div className="avatar-img">
            <img
               src={anh || "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"} 
              alt="user avatar"
            /> 
            {isOnline && <span className="online-indicator"></span>}
          </div>
        </div>

        <div className="chat-details">
          <div className="chat-bar">
            <p className="chat-username">{hoithoai.username}</p>
          </div>
        </div>
      </div>

      <div className="chat-divider" />
    </>
  );
};

Hoithoai.propTypes = {
  hoithoai: PropTypes.shape({
    username: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  anh: PropTypes.string,
};

export default Hoithoai;
