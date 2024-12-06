import { HiOutlineHeart, HiOutlineBookOpen, HiStar, HiOutlineEye } from "react-icons/hi";
import { HiOutlineCheckCircle, HiOutlinePencilAlt, HiOutlineMinusCircle } from "react-icons/hi";
import PropTypes from 'prop-types';
import './style.css'

function TrendCard(props) {
    const { tieuDe,tacGia, soSao, chuong, trangThai, luotXem, moTa, imgSrc } = props;

    TrendCard.propTypes = {
        tieuDe: PropTypes.string.isRequired,
        tacGia: PropTypes.string.isRequired,
        soSao: PropTypes.number.isRequired,
        chuong: PropTypes.number.isRequired,
        trangThai: PropTypes.string.isRequired,
        luotXem: PropTypes.number.isRequired,
        moTa: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
    };
    
    return (
        <div className="trending-card">
            <div className="trending-card-noidung">
                <div className="trending-card-noidung-Trending">
                    <div className="Trending">Trending</div>
                </div>
                <h1 className="trending-card-noidung-tieude">{tieuDe}</h1>
                <p className="trending-card-noidung-tacgia">Tác giả: {tacGia}</p>

                <div className="trending-card-noidung-thongtin">
                    <div className="view">
                        <HiOutlineEye />
                        <span>{luotXem}</span>
                    </div>
                    <div className="chuong">
                        <HiOutlineBookOpen />
                        <span>{chuong} Chương</span>
                    </div>
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
                        <HiStar />
                        <span>{soSao}</span>
                    </div>
                </div>
                <div className="trending-card-noidung-mota">
                    <h2 className="tieude">Mô tả:</h2>
                    <p className="mota">
                        {moTa}
                    </p>
                </div>
                <div className="trending-card-noidung-docngay">
                    <button className="docngay">ĐỌC NGAY</button>
                    <div className="yeuthich"><HiOutlineHeart /></div>
                </div>
            </div>

            <div className="trending-card-hinhanh">
                <img src={imgSrc} alt={tieuDe}/>
            </div>
        </div>
    )
}

export default TrendCard