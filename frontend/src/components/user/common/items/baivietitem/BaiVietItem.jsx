import { useState, useEffect } from 'react';
import { HiOutlineChat, HiOutlineHeart, HiHeart } from 'react-icons/hi';
import PropTypes from 'prop-types';
import './Style.css';
import Axios from 'axios';
import { IoTrashSharp } from "react-icons/io5";


function BaiVietItem({ noiDungBV, username, hinhAnh, baiVietId, baiviet, onDelete, tenCD,anhDaiDienND }) {
   
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(baiviet.cacluotThich.length);
    const [isDeleted, setIsDeleted] = useState(false);  
    const [isFollowed, setIsFollowed] = useState(false);  // Thêm state theo dõi
    
    // Kiểm tra trạng thái theo dõi khi tải lại trang
    useEffect(() => {
        const followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
        const userId = baiviet.nguoiDungIdBV._id; // ID người dùng mà bạn theo dõi
        if (followedUsers.includes(userId)) {
            setIsFollowed(true); 
        }
    }, [baiviet.nguoiDungIdBV._id]);

    
    const likeBaiViet = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post(`/api/baiviet/like/${baiVietId}`);
            console.log(response.data);

            setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
            setIsLiked(!isLiked);

            const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
            if (isLiked) {
                localStorage.setItem('likedPosts', JSON.stringify(likedPosts.filter(id => id !== baiVietId)));
            } else {
                localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, baiVietId]));
            }
        } catch (error) {
            console.error("Lỗi khi thích bài viết:", error);
            alert("Lỗi khi thích bài viết: " + (error.response?.data?.message || error.message));
        }
    };

    // Xử lý xóa bài viết
    const xoaBaiViet = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.delete(`/api/baiviet/xoabaiviet/${baiVietId}`);
            alert('Bài viết đã bị xóa!');
            console.log(response.data);
            
            setIsDeleted(true);
            if (onDelete) {
                onDelete(baiVietId);
            }

        } catch (error) {
            console.error("Lỗi khi xóa bài viết:", error);
            alert("Lỗi khi xóa bài viết: " + (error.response?.data?.message || error.message));
        }
    };

    // Xử lý theo dõi bài viết
    const theoDoiBaiViet = async (e) => {
        e.preventDefault();
        try {
            const userId = baiviet.nguoiDungIdBV._id; 
            const response = await Axios.post(`/api/nguoidung/follow/${userId}`);
            console.log(response.data);

            setIsFollowed(!isFollowed); // Toggle theo dõi

            // Cập nhật trạng thái theo dõi vào localStorage
            const followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
            if (isFollowed) {
                localStorage.setItem('followedUsers', JSON.stringify(followedUsers.filter(id => id !== userId)));
            } else {
                localStorage.setItem('followedUsers', JSON.stringify([...followedUsers, userId]));
            }
        } catch (error) {
            console.error("Lỗi khi theo dõi người dùng:", error);
            alert("Lỗi khi theo dõi người dùng: " + (error.response?.data?.message || error.message));
        }
    };

    if (isDeleted) {
        return null; 
    }

    return (
        <div className="baiviet-item">
            <div className="baiviet-item-container">
                <div className="baiviet-item-tieude">
                    <div className="baiviet-item-tieude-avata">
                        <img src={anhDaiDienND} alt="Avatar" style={{ borderRadius: '30px' }} />
                    </div>
                    <div className="baiviet-item-tieude-noidung">
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px'}}>
                            <p style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '8px' }}>
                                {username} 
                                {tenCD && <span style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '20px', color:'#785E54' }} >từ : [{tenCD}]</span>}
                            </p>
                            <button className="btn-follow" onClick={theoDoiBaiViet}>
                                         {isFollowed ? 'Bỏ theo dõi' : 'Theo dõi'}
                            </button>

                        </div>
                        <p style={{ fontSize: '15px', marginTop: '7px' }}>
                            {noiDungBV}
                        </p>
                    </div>
                </div>

                <div className="baiviet-item-image">
                    <img src={hinhAnh} alt="Content" />
                </div>

                <div className="baiviet-item-thongtin">
                    <div className="baiviet-item-thongtin-yeuthich">
                        <button onClick={likeBaiViet} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <p style={{ fontSize: '20px', margin: '0' }}>
                                {isLiked ? <HiHeart color="red" /> : <HiOutlineHeart />}
                            </p>
                        </button>
                        <p style={{ marginLeft: '3px', fontSize: '13px' }}>{likeCount} lượt thích</p>
                    </div>
                    <div className="baiviet-item-thongtin-cmt">
                        <p style={{ fontSize: '20px', margin: '0' }}><HiOutlineChat /></p>
                        <p style={{ marginLeft: '3px', fontSize: '13px' }}></p>
                    </div>

                    <div className="baiviet-item-thongtin-thungrac">
                        <button onClick={xoaBaiViet} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <IoTrashSharp color="gray" size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

BaiVietItem.propTypes = {
    noiDungBV: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    hinhAnh: PropTypes.string,
    baiVietId: PropTypes.string.isRequired,
    IdNguoiDung: PropTypes.object,
    baiviet: PropTypes.object,
    onDelete: PropTypes.func,  // Hàm callback để gọi khi xóa bài viết
    tenCD: PropTypes.string,   
    anhDaiDienND: PropTypes.string,   
};

export default BaiVietItem;
