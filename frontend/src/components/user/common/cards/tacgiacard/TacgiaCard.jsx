import PropTypes from 'prop-types';
import './style.css'

function TacgiaCard(props) {
    const { tieuDe, imgSrc } = props;

    TacgiaCard.propTypes = {
        tieuDe: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
    };
    
    return (
        <div className="tacgia-card">
            <div className="tacgia-card-image-container"> {/* Bọc img trong div này */}
                <img src={imgSrc} alt={tieuDe} />
            </div>
            <p className="tacgia-card-tieude">{tieuDe}</p>
        </div>
    )
}


export default TacgiaCard