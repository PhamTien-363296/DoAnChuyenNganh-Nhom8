import { FiSend } from "react-icons/fi";
import './BinhLuanChuong.css'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";

function BinhLuanChuong({idChuong}) {
    const [comment, setComment] = useState('');
    const [ratingsList, setRatingsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleComments, setVisibleComments] = useState(2);

    BinhLuanChuong.propTypes = {
        idChuong: PropTypes.string.isRequired,
    };

    useEffect(() => {
        const layDanhGia = async () => {
            try {
                const resLay = await axios.get(`/api/chuong/lay/binhluan/${idChuong}`);
                console.log(resLay.data);
                setRatingsList(resLay.data);
                setLoading(false);
            } catch (error) {
                setError("Có lỗi khi lấy bình luận.", error);
                setLoading(false);
            }
        };

        layDanhGia();
    }, [idChuong]);

    const handleSubmit = async () => {
        if (comment === '') {
            alert('Vui lòng nhập nội dung bình luận.');
            return;
        }

        try {
            await axios.post(`/api/chuong/them/binhluan`, {
                chuongId: idChuong,
                noiDungBinhLuanChuong: comment,
            });
            alert('Bình luận đã được thêm thành công!');
            setComment('');
            window.location.reload();
        } catch (error) {
            setError("Có lỗi khi thêm bình luận.", error);
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        setVisibleComments(prev => prev + 2);
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="ct-add-cmt">
                <input
                    className="ct-add-cmt-input"
                    placeholder="Viết bình luận ..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                >
                </input>
                <button className="ct-add-cmt-button" onClick={handleSubmit}><FiSend/></button>
            </div>
            <div className="ct-list-cmt">
            {ratingsList.slice(0, visibleComments).map((rating, index) => (
                <div className="ct-cmt-item" key={index}>
                    <div className="ct-cmt-img">
                        <img src={rating.nguoiDungIdChuong.anhDaiDienND || "https://placehold.co/50x50"} alt="User avatar"/>
                    </div>
                    <div className="ct-cmt-tt">
                        <p style={{fontSize:'17px', fontWeight: 'bold'}}>{rating.nguoiDungIdChuong.username} </p>
                        <p style={{fontSize:'15px'}}>{rating.noiDungBinhLuanChuong}</p>
                        <p style={{fontSize:'10px'}}>{moment(rating.ngayBinhLuan).fromNow()}</p>
                    </div>
                </div>
            ))}
            </div>
            {ratingsList.length > visibleComments && (
                <button className="xem-them-btn" onClick={handleLoadMore}>
                    Xem thêm
                </button>
            )}
        </>
    )
}

export default BinhLuanChuong