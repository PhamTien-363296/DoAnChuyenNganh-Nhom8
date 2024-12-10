import PropTypes from 'prop-types';
import './TacGiaItem.css'

function TacGiaItem(props) {
    const { idTacGia, anhDaiDienND, username, theoDoi, slTheoDoi } = props;

    TacGiaItem.propTypes = {
        idTacGia: PropTypes.string.isRequired,
        anhDaiDienND: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        theoDoi: PropTypes.string,
        slTheoDoi: PropTypes.number.isRequired,
    };
    return (
        <div className="tacgia-item">
            <div className="tacgia-item-container">
                <div className="tacgia-item-avata">
                    <img src={anhDaiDienND || 'https://placehold.co/129x203'} alt={username}/>
                </div>
                <div className="tacgia-item-noidung">
                    <p className='tacgia-item-noidung-ten'>{username}</p>
                    <div style={{display:'flex', alignItems:'center', marginTop:'5px'}}>
                        <p  style={{fontSize:'15px'}}>{theoDoi}nguoi</p>
                        <span className="theodoi-separator"> - </span>
                        <p style={{fontSize:'15px', margin:'0'}}>{slTheoDoi} người theo dõi</p>
                    </div>
                </div>
                <div className="tacgia-item-theodoi"> 
                    <button>Theo dõi</button>
                </div>

            </div>
        </div>
    )
}


export default TacGiaItem