import { useState, useEffect } from 'react';
import { HiOutlineChat, HiOutlineHeart, HiHeart } from 'react-icons/hi';
import PropTypes from 'prop-types';
import './Style.css';
import Axios from 'axios';
import { IoTrashSharp } from "react-icons/io5";

function BaiVietItem({ noiDungBV, username, hinhAnh, baiVietId, baiviet, onDelete }) {
   
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(baiviet.cacluotThich.length);
    const [isDeleted, setIsDeleted] = useState(false);  

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        if (likedPosts.includes(baiVietId)) {
            setIsLiked(true);
        }
    }, [baiVietId]);

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

  
    if (isDeleted) {
        return null; 
    }

    return (
        <div className="baiviet-item">
            <div className="baiviet-item-container">
             
                <div className="baiviet-item-tieude">
                    <div className="baiviet-item-tieude-avata">
                        <img src='https://placehold.co/129x203' alt="Avatar" style={{ borderRadius: '30px' }} />
                    </div>
                    <div className="baiviet-item-tieude-noidung">
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                            <p style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '8px' }}>
                                {username}
                            </p>
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
    baiviet: PropTypes.object,
    onDelete: PropTypes.func,  // Hàm callback để gọi khi xóa bài viết
};

export default BaiVietItem;
