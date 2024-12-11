import PropTypes from 'prop-types';
import './style.css'
import { useNavigate } from 'react-router-dom';

function TacgiaCard(props) {
    const { id, tieuDe, imgSrc } = props;
    const navigate = useNavigate();
    
    return (
        <div className="tacgia-card" 
            onClick={() => {
                const urlTen = tieuDe.trim().replace(/\s+/g, '-');
                navigate(`/${urlTen}`, { state: { idNguoiDung: id } });
            }}  
        >
            <div className="tacgia-card-image-container">
                <img src={imgSrc || 'https://via.placeholder.com/50x50'} alt={tieuDe} />
            </div>
            <p className="tacgia-card-tieude">{tieuDe}</p>
        </div>
    )
}
TacgiaCard.propTypes = {
    id: PropTypes.string,
    tieuDe: PropTypes.string,
    imgSrc: PropTypes.string,
};

export default TacgiaCard