import PropTypes from 'prop-types';
import './TacGiaItem.css'
import { useNavigate } from 'react-router-dom';

function TacGiaItem(props) {
    const { idTacGia, anhDaiDienND, username, slTheoDoi } = props;
    const navigate = useNavigate();

    const xemTrangCaNhan = () => {
        const urlTen = username.trim().replace(/\s+/g, '-');
        navigate(`/${urlTen}`, { state: { idNguoiDung: idTacGia } });
    };
    return (
        <div className="tacgia-item">
            <div className="tacgia-item-container">
                <div className="tacgia-item-avata">
                    <img src={anhDaiDienND || 'https://placehold.co/129x203'} alt={username}/>
                </div>
                <div className="tacgia-item-noidung">
                    <p className='tacgia-item-noidung-ten' onClick={xemTrangCaNhan}>{username}</p>
                    <div style={{display:'flex', alignItems:'center', marginTop:'5px'}}>
                        <p style={{fontSize:'15px', margin:'0'}}>{slTheoDoi || 0} người theo dõi</p>
                    </div>
                </div>
                <div className="tacgia-item-theodoi"> 
                    <button>Theo dõi</button>
                </div>

            </div>
        </div>
    )
}

TacGiaItem.propTypes = {
    idTacGia: PropTypes.string.isRequired,
    anhDaiDienND: PropTypes.string,
    username: PropTypes.string,
    slTheoDoi: PropTypes.number,
};

export default TacGiaItem