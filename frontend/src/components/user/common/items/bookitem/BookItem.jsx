import './Style.css'
import { HiOutlineBookOpen, HiStar, HiOutlineEye } from "react-icons/hi";
import { HiOutlineCheckCircle , HiOutlinePencilAlt, HiOutlineMinusCircle } from "react-icons/hi";
import { HiOutlineFire } from "react-icons/hi";
import ListChuong from '../../../manager/listchuong/ListChuong';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'; 

function BookItem(props) {
    const { idTruyen, tenTruyen, ngayCapNhat, chuong, luotXem, tinhTrang, soSao, moTa, trangThai, imgSrc } = props;

    const navigate = useNavigate();

    BookItem.propTypes = {
        idTruyen: PropTypes.string.isRequired,
        tenTruyen: PropTypes.string.isRequired,
        ngayCapNhat:  PropTypes.instanceOf(Date).isRequired,
        chuong: PropTypes.string.isRequired,
        luotXem: PropTypes.number.isRequired,
        tinhTrang: PropTypes.string.isRequired,
        soSao: PropTypes.string.isRequired,
        moTa: PropTypes.string.isRequired,
        trangThai: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
    };

    const ChinhsuaClick = () => {
        navigate('/suatruyen', { state: { idTruyen: idTruyen } });
    };
    
    const ThemChuongClick = () => {
        navigate('/viettruyen', { state: { idTruyen: idTruyen } });
    };

    return (
        <div className="book-item">
            <div className="book-item-container">
                <div className='book-item-image'>
                    <img src={imgSrc}/>
                </div>
                <div className='book-item-noidung'>
                    <p style={{fontSize:'20px', fontWeight:'bold', margin:'0'}}>{tenTruyen}</p>
                    <p style={{fontSize:'13px', margin:'8px 0'}}>Cập nhật: {moment({ngayCapNhat}).format('DD/MM/YYYY, HH:mm')}</p>
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
                        <div className="book-item-danhgia">
                            <HiStar />
                            <span>{soSao}</span>
                        </div>
                    </div>
                    <p>Giới thiệu:</p>
                    <p className="book-item-gioithieu">
                        {moTa}
                    </p>
                    <hr />
                    <div>
                        {trangThai === "Công khai" && (
                            <p style={{ textTransform: 'uppercase', color:'#066C21', fontWeight:'bold', fontSize:'20px'}}>{trangThai}</p>
                        )}
                        {trangThai === "Riêng tư" && (
                            <p style={{ textTransform: 'uppercase', color:'#140084', fontWeight:'bold', fontSize:'20px'}}>{trangThai}</p>
                        )}
                    </div>
                </div>
                <div className='book-item-thongtin'>
                    <div className='book-item-luachon' style={{display:'flex', alignItems:'center'}}>
                        <div className='book-item-luachon-cs' onClick={ChinhsuaClick}>Chỉnh sửa</div>
                        <div className='book-item-luachon-tc' onClick={ThemChuongClick}>Thêm chương</div>
                    </div>
                    <div className='book-item-list-chuong'><ListChuong idTruyen={idTruyen}/></div>
                </div>
            </div>
        </div>
    )
}

export default BookItem