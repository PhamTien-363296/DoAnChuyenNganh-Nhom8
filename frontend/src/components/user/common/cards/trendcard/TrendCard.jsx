import { HiOutlineHeart, HiOutlineBookOpen, HiStar, HiOutlineEye } from "react-icons/hi";
import { HiOutlineCheckCircle, HiOutlinePencilAlt, HiOutlineMinusCircle } from "react-icons/hi";
import PropTypes from 'prop-types';
import './style.css'
import { useNavigate } from 'react-router-dom'; 

function TrendCard(props) {
    const {idTruyen, tieuDe,tacGia, soSao, chuong, trangThai, luotXem, moTa, imgSrc, idCacChuong, isFavorite, toggleFavorite  } = props;

    TrendCard.propTypes = {
        idTruyen: PropTypes.string.isRequired,
        tieuDe: PropTypes.string.isRequired,
        tacGia: PropTypes.string.isRequired,
        soSao: PropTypes.string.isRequired,
        chuong: PropTypes.number.isRequired,
        trangThai: PropTypes.string.isRequired,
        luotXem: PropTypes.number.isRequired,
        moTa: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        idCacChuong: PropTypes.array.isRequired,
        isFavorite: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        toggleFavorite: PropTypes.func.isRequired,
    };
    const navigate = useNavigate();
    const ChiTietTruyen = (e) => {
        e.stopPropagation();
        const tenTruyen = tieuDe.trim().replace(/\s+/g, '-').toLowerCase();
        navigate(`/chitiettruyen/${tenTruyen}`, { state: { idTruyen: idTruyen } });
    };
    const DocNgay = (e) => {
        e.stopPropagation();
        const tenTruyen = tieuDe.trim().replace(/\s+/g, '-').toLowerCase();
        const chuongDauTien = idCacChuong[0];
        const tenChuong = chuongDauTien.tenChuong.trim().replace(/\s+/g, '-').toLowerCase();
        navigate(`/${tenTruyen}/${tenChuong}`, { state: { idChuong: chuongDauTien._id } });
    };

    return (
        <div className="trending-card" onClick={ChiTietTruyen}>
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
                    <button className="docngay" onClick={DocNgay}>ĐỌC NGAY</button>
                    <div className={`yeuthich ${isFavorite ? 'favorite' : ''}`} onClick={(e) => { e.stopPropagation(); toggleFavorite(idTruyen); }}>
                        <HiOutlineHeart />
                    </div>
                </div>
            </div>

            <div className="trending-card-hinhanh">
                <img src={imgSrc} alt={tieuDe}/>
            </div>
        </div>
    )
}

export default TrendCard