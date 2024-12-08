import { useAuthContext } from "../../../../../context/AuthContext";
import PropTypes from 'prop-types'; 
import "./Tin.css"

const Tin = ({ tin }) => {
  const { authUser } = useAuthContext(); 
  const tuToi = tin.nguoiGuiId === authUser._id;
  const classNameTin = tuToi ? 'chat-end' : 'chat-start'; 

  return (
    <div className={classNameTin}>
      {/* <div className="chat-image avatar">
        <img 
          className="w-10 rounded-full"
          alt="img"
          src="https://cdn9.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" // Default avatar if no image
        />
      </div> */}

      <div className="chat-bubble">
        {tuToi ? (
          <div className="chat-end">
            {tin.noiDungTN}
          </div>
        ) : (
          <div className="chat-start">
            {tin.noiDungTN}
          </div>
        )}
      </div>
    </div>
  );
};


Tin.propTypes = {
  tin: PropTypes.shape({
    nguoiGuiId: PropTypes.string.isRequired,
    noiDungTN: PropTypes.string.isRequired, 
  }).isRequired,
};

export default Tin;
