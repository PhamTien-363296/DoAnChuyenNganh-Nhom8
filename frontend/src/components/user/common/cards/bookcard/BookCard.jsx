import { HiOutlineCheckCircle , HiStar, HiOutlineEye, HiOutlinePencilAlt, HiOutlineMinusCircle } from "react-icons/hi";

import PropTypes from 'prop-types';
import './style.css'
import { useNavigate } from 'react-router-dom'; 

function BookCard(props) {
    const { id, tieuDe, soSao, trangThai, luotXem, imgSrc } = props;

    BookCard.propTypes = {
        id: PropTypes.string,
        tieuDe: PropTypes.string.isRequired,
        soSao: PropTypes.number.isRequired,
        trangThai: PropTypes.string.isRequired,
        luotXem: PropTypes.number.isRequired,
        imgSrc: PropTypes.string.isRequired,
    };
    
    const navigate = useNavigate();
    const chiTietTruyen = (tieuDe) => {
        const urlTieuDe = tieuDe.replace(/\s+/g, '-');
        navigate(`/chitiettruyen/${urlTieuDe}`, { state: { idTruyen: id } });
    };
    return (
        <div className="book-card" onClick={() => chiTietTruyen(tieuDe)}>
            <div className="book-card-container">
                <div className="book-card-thongtin">
                    {trangThai === "Hoàn thành" && (
                        <div className="trangthai" style={{backgroundColor: 'rgba(0, 255, 68, 0.2)', color: '#066C21' }}>
                            <HiOutlineCheckCircle />
                            <span style={{marginLeft:'3px'}}>{trangThai}</span>
                        </div>
                    )}
                    {trangThai === "Đang viết" && (
                        <div className="trangthai" style={{backgroundColor: 'rgba(38, 0, 255, 0.2)', color: '#140084' }}>
                            <HiOutlinePencilAlt />
                            <span style={{marginLeft:'3px'}}>{trangThai}</span>
                        </div>
                    )}
                    {trangThai === "Tạm dừng" && (
                        <div className="trangthai" style={{backgroundColor: 'rgba(255, 0, 0, 0.2)', color: '#7D0000' }}>
                            <HiOutlineMinusCircle />
                            <span style={{marginLeft:'3px'}}>{trangThai}</span>
                        </div>
                    )}
                    <div className="danhgia">
                        <HiStar/>
                        <span>{soSao}</span>
                    </div>
                </div>
            
                <div className="book-card-image-container">
                    <img src={imgSrc} alt={tieuDe} />
                </div>
                <p className="book-card-tieude">{tieuDe}</p>
                <div className="book-card-luotxem">
                    <HiOutlineEye/> 
                    <span>{luotXem}</span>
                </div>
            </div>
        </div>
    )
}


export default BookCard