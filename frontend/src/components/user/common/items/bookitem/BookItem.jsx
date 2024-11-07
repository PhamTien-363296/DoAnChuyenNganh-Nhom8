import './Style.css'
import { HiOutlineBookOpen, HiStar, HiOutlineEye } from "react-icons/hi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiOutlineFire } from "react-icons/hi";
import ListChuong from '../../../manager/listchuong/ListChuong';

function BookItem() {
    return (
        <div className="book-item">
            <div className="book-item-container">
                <div className='book-item-image'>
                    <img src='https://placehold.co/129x203'/>
                </div>
                <div className='book-item-noidung'>
                    <p style={{fontSize:'20px', fontWeight:'bold', margin:'0'}}>TÔI THẤY HOA VÀNG TRÊN CỎ XANH</p>
                    <p style={{fontSize:'13px', margin:'8px 0'}}>Cập nhật: 10/10/2024, 14:30</p>
                    <div className="book-item-noidung-thongtin">
                        <div className="book-item-view">
                            <HiOutlineEye />
                            <span>1.000.000</span>
                        </div>
                        <div className="book-item-chuong">
                            <HiOutlineBookOpen />
                            <span>10 Chương</span>
                        </div>
                        <div className="book-item-trangthai" style={{backgroundColor: 'rgba(0, 255, 68, 0.2)', color: '#066C21' }}>
                            <HiOutlineCheckCircle />
                            <span style={{marginLeft:'3px'}}>Hoàn thành</span>
                        </div>
                        <div className="book-item-danhgia">
                            <HiStar />
                            <span>4.1</span>
                        </div>
                    </div>
                    <p>Giới thiệu:</p>
                    <p className="book-item-gioithieu">
                        Một câu chuyện về tuổi thơ đầy ắp kỷ niệm của những đứa trẻ vùng quê nghèo...
                        Một câu chuyện về tuổi thơ đầy ắp kỷ niệm của những đứa trẻ vùng quê nghèo...
                        Một câu chuyện về tuổi thơ đầy ắp kỷ niệm của những đứa trẻ vùng quê nghèo...
                        Một câu chuyện về tuổi thơ đầy ắp kỷ niệm của những đứa trẻ vùng quê nghèo...
                        Một câu chuyện về tuổi thơ đầy ắp kỷ niệm của những đứa trẻ vùng quê nghèo...
                        Một câu chuyện về tuổi thơ đầy ắp kỷ niệm của những đứa trẻ vùng quê nghèo...
                    </p>
                    <hr />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{display:'flex', alignItems:'center'}}><HiOutlineFire/> <p style={{marginLeft:'5px'}}>HẠNG: 50</p></div>
                        <p>CÔNG KHAI</p>
                    </div>
                </div>
                <div className='book-item-thongtin'>
                    <div className='book-item-tieptucviet' style={{display:'flex', alignItems:'center'}}>Tiếp tục viết</div>
                    <div className='book-item-list-chuong'><ListChuong/></div>
                </div>
            </div>
        </div>
    )
}

export default BookItem