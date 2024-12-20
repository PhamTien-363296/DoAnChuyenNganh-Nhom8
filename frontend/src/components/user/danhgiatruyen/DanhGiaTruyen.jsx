import { useState, useEffect } from 'react';
import RatingItem from "../common/items/ratingitem/RatingItem"; // Import component RatingItem
import './DanhGiaTruyen.css';
import PropTypes from 'prop-types';
import axios from 'axios';

function DanhGiaTruyen({ idTruyen }) {
    const [chonSao, setChonSao] = useState(0);
    const [comment, setComment] = useState('');
    const [ratingsList, setRatingsList] = useState([]);
    const [hasRated, setHasRated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const kiemTraDanhGia = async () => {
            try {
                const resKT = await axios.get(`/api/danhgia/kiemtra/${idTruyen}`);
                setHasRated(resKT.data.hasRated);
                setLoading(false);
            } catch (error) {
                setError("Có lỗi khi kiểm tra.", error);

                setLoading(false);
            }
        };

        kiemTraDanhGia();
    }, [idTruyen]);

    useEffect(() => {
        const layDanhGia = async () => {
            try {
                const resLay = await axios.get(`/api/danhgia/lay/${idTruyen}`);
                setRatingsList(resLay.data);
                setLoading(false);
            } catch (error) {
                setError("Có lỗi khi lấy đánh giá.", error);
                setLoading(false);
            }
        };

        layDanhGia();
    }, [idTruyen]);

    const handleSubmit = async () => {
        if (chonSao === 0 || comment === '') {
            alert('Vui lòng chọn số sao và nhập nội dung đánh giá.');
            return;
        }

        try {
            await axios.post(`/api/danhgia/them`, {
                truyenIdDG: idTruyen,
                soSaoDG: chonSao,
                noiDungDG: comment,
            });
            alert('Đánh giá đã được thêm thành công!');
            setChonSao(0);
            setComment('');
            window.location.reload();
        } catch (error) {
            setError("Có lỗi khi thêm đánh giá.", error);
            setLoading(false);
        }
    };

    DanhGiaTruyen.propTypes = {
        idTruyen: PropTypes.string.isRequired,
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="rating">
            {hasRated ? (
                <div className="thongbao-danhgia">
                    <p>Bạn đã đánh giá truyện này!</p>
                </div>
            ) : (
                <div className="add-rating">
                        <div className="star-buttons">
                            {[1, 2, 3, 4, 5].map((sao) => (
                                <button
                                    key={sao}
                                    onClick={() => setChonSao(sao)}
                                    className={`star ${sao <= chonSao ? "filled" : ""}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="cmt-rating"
                            rows="4"
                            placeholder="Nhập nhận xét của bạn..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    <button className="submit-button" onClick={handleSubmit}>
                        Gửi đánh giá
                    </button>
                </div>
            )}

            <div className="list-rating">
                {ratingsList.map((rating, index) => (
                    <RatingItem
                        key={index}
                        avatar={rating.nguoiDungIdDG.anhDaiDienND}
                        tenNguoiDung={rating.nguoiDungIdDG.username}
                        soSaoDG={rating.soSaoDG}
                        noiDungDG={rating.noiDungDG}
                        ngay={rating.createdAt}
                    />
                ))}
            </div>
        </div>
    );
}

export default DanhGiaTruyen;
