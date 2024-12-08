import './Style.css'
import { HiOutlineBookOpen, HiOutlineEye } from "react-icons/hi";
import { HiOutlineCheckCircle , HiOutlinePencilAlt, HiOutlineMinusCircle } from "react-icons/hi";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; 

function YeuThichItem(props) {
    const { idTruyen, tenTruyen, chuong, luotXem, tinhTrang, moTa, imgSrc} = props;

    const navigate = useNavigate();

    YeuThichItem.propTypes = {
        idTruyen: PropTypes.string.isRequired,
        tenTruyen: PropTypes.string.isRequired,
        chuong: PropTypes.number.isRequired,
        luotXem: PropTypes.number.isRequired,
        tinhTrang: PropTypes.string.isRequired,
        moTa: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
    };

    const Xem = () => {
        const urlTieuDe = tenTruyen.replace(/\s+/g, '-');
        navigate(`/chitiettruyen/${urlTieuDe}`, { state: { idTruyen: idTruyen } });    
    };

    return (
        <div className="yt-item" onClick={Xem}>
            <div className="yt-item-container">
                <div className='yt-item-image'>
                    <img src={imgSrc}/>
                </div>
                <div className='yt-item-noidung'>
                    <p style={{fontSize:'20px', fontWeight:'bold', margin:'0', marginBottom:'10px'}}>{tenTruyen}</p>
                    <div className="book-item-noidung-thongtin">
                        <div className="book-item-view">
                            <HiOutlineEye />
                            <span>{luotXem}</span>
                        </div>
                        <div className="book-item-chuong">
                            <HiOutlineBookOpen />
                            <span>{chuong} Chương</span>
                        </div>
                        <div className="book-item-thongtin">
                            {tinhTrang === "Hoàn thành" && (
                                <div className='trangthai' style={{backgroundColor: 'rgba(0, 255, 68, 0.2)', color: '#066C21'}}>
                                    <HiOutlineCheckCircle />
                                    <span style={{marginLeft:'3px'}}>{tinhTrang}</span>
                                </div>
                            )}
                            {tinhTrang === "Đang viết" && (
                                <div className='trangthai' style={{backgroundColor: 'rgba(38, 0, 255, 0.2)', color: '#140084' }}>
                                    <HiOutlinePencilAlt />
                                    <span style={{marginLeft:'3px'}}>{tinhTrang}</span>
                                </div>
                            )}
                            {tinhTrang === "Tạm dừng" && (
                                <div className='trangthai' style={{backgroundColor: 'rgba(255, 0, 0, 0.2)', color: '#7D0000' }}>
                                    <HiOutlineMinusCircle />
                                    <span style={{marginLeft:'3px'}}>{tinhTrang}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <p>Giới thiệu:</p>
                    <p className="book-item-gioithieu">
                        {moTa}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default YeuThichItem