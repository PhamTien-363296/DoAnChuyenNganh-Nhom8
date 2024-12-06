
import PropTypes from 'prop-types';
import "./RatingItem.css"
import moment from 'moment';
import { FaStar, FaRegStar } from "react-icons/fa";


function RatingItem(props) {
    const { avatar, tenNguoiDung, soSaoDG, noiDungDG, ngay} = props;

    RatingItem.propTypes = {
        avatar: PropTypes.string,
        tenNguoiDung: PropTypes.string,
        soSaoDG:  PropTypes.number,
        noiDungDG: PropTypes.string,
        ngay: PropTypes.string,
    };

    return (
        <div className="rating-item">
            <div className="rating-content">
                <div className="rating-avatar">
                    <img src={avatar || "https://placehold.co/50x50"} alt="User avatar"/>
                </div>
                <div className="rating-header">
                    <p className="rating-user">{tenNguoiDung || "Người dùng"}</p>
                    <div>
                        {[1,2,3,4,5].map((star) => {
                            if (star <= Math.floor(soSaoDG)) {
                                return <FaStar key={star} size={15} className="sao" />;
                            } else {
                                return <FaRegStar key={star} size={15} className="noSao" />;
                            }
                        })}
                    </div>
                    <p className="rating-date">{moment(ngay).format('DD/MM/YYYY, HH:mm') || "Chưa có ngày"}</p>
                </div>
            </div>
            <p className='rating-noidung'>{noiDungDG || "Chưa có đánh giá."}</p>
        </div>
    )
}

export default RatingItem