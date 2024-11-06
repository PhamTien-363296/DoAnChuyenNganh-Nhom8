import { HiOutlineHeart, HiOutlineBookOpen , HiOutlineBadgeCheck , HiStar , HiOutlineEye } from "react-icons/hi";
import { HiOutlineChevronLeft , HiOutlineChevronRight } from "react-icons/hi";
import {Link} from 'react-router-dom'

import Sidebar from '../../components/common/Sidebar'
import Searchmain from '../../components/common/Searchmain';
import '../../App.css'

export default function Trangchu() {
    return (
        <>
            <div className='container'> 
                <Sidebar />
                <div className='main'>
                    <Searchmain />
                    <div className='content'>
                        <div className="theloai">
                            <div className="theloai-tieude">
                                <p style={{ fontWeight: "bold" }}>Thể loại</p>
                                <p><a href="#">Xem thêm</a></p>
                            </div>
                            <div className="theloai-noidung">
                                <button><Link to="/theloai" style={{ textDecoration: 'none', color:'#49372F'}}>Tất cả</Link></button>
                                <button><Link to="/theloai" style={{ textDecoration: 'none', color:'#49372F'}}>Tất cả</Link></button>
                                <button><Link to="/theloai" style={{ textDecoration: 'none', color:'#49372F'}}>Tất cả</Link></button>
                                <button><Link to="/theloai" style={{ textDecoration: 'none', color:'#49372F'}}>Tất cả</Link></button>
                                <button><Link to="/theloai" style={{ textDecoration: 'none',color:'#49372F'}}>Tất cả</Link></button>
                                <button><Link to="/theloai" style={{ textDecoration: 'none',color:'#49372F' }}>Tất cả</Link></button>
                            </div>
                        </div>

                        <div className="trending">
                            <div className="button" style={{ marginRight: '10px' }}><HiOutlineChevronLeft /></div>
                            <div className="trending-listcard">
                                <a href="/truyen" style={{ textDecoration: 'none' }}>
                                    <div className="trending-card">
                                        <div className="trending-card-noidung">
                                            <div className="trending-card-noidung-Trending">
                                                <div className="Trending">Trending</div>
                                            </div>
                                            <h1 className="trending-card-noidung-tieude">TÔI THẤY HOA VÀNG TRÊN CỎ XANH</h1>
                                            <p className="trending-card-noidung-tacgia">Tác giả : Nguyễn Nhật Ánh</p>

                                            <div className="trending-card-noidung-thongtin">
                                                <div className="view">
                                                    <HiOutlineEye/>
                                                    <span>1.000.000</span>
                                                </div>
                                                <div className="chuong">
                                                    <HiOutlineBookOpen/>
                                                    <span>10 Chương</span>
                                                </div>
                                                <div className="trangthai">
                                                    <HiOutlineBadgeCheck/>
                                                    <span>Hoàn thành</span>
                                                </div>
                                                <div className="danhgia">
                                                    <HiStar/>
                                                    <span>4.4</span>
                                                </div>
                                            </div>
                                            <div className="trending-card-noidung-mota">
                                                <h2 className="tieude">Mô tả :</h2>
                                                <p className="mota">
                                                    Tôi Thấy Hoa Vàng Trên Cỏ Xanh là một câu chuyện về tuổi thơ đầy ắp kỷ niệm của những đứa trẻ vùng quê nghèo. 
                                                    Tác phẩm của Nguyễn Nhật Ánh đã chạm đến trái tim của hàng triệu độc giả với những câu chuyện giản dị, 
                                                    chân thật và đầy cảm xúc.
                                                </p>
                                            </div>
                                            <div className="trending-card-noidung-docngay">
                                                <button className="docngay">ĐỌC NGAY</button>
                                                <div className="yeuthich"><HiOutlineHeart /></div>
                                            </div>
                                        </div>

                                        <div className="trending-card-hinhanh">
                                            <img src="https://placehold.co/160x220" alt="Book cover of Tôi Thấy Hoa Vàng Trên Cỏ Xanh" className="rounded-lg shadow-lg"/>
                                        </div>
                                    </div>
                                </a>
                                <div className="trending-card">
                                    <div className="trending-card-noidung">
                                        <div className="trending-card-noidung-Trending">
                                            <div className="Trending">Trending</div>
                                        </div>
                                        <h1 className="trending-card-noidung-tieude">TÔI THẤY HOA VÀNG TRÊN CỎ XANH</h1>
                                        <p className="trending-card-noidung-tacgia">Tác giả : Nguyễn Nhật Ánh</p>

                                        <div className="trending-card-noidung-thongtin">
                                            <div className="view">
                                                <HiOutlineEye/>
                                                <span>1.000.000</span>
                                            </div>
                                            <div className="chuong">
                                                <HiOutlineBookOpen/>
                                                <span>10 Chương</span>
                                            </div>
                                            <div className="trangthai">
                                                <HiOutlineBadgeCheck/>
                                                <span>Hoàn thành</span>
                                            </div>
                                            <div className="danhgia">
                                                <HiStar/>
                                                <span>4.4</span>
                                            </div>
                                        </div>
                                        <div className="trending-card-noidung-mota">
                                            <h2 className="tieude">Mô tả :</h2>
                                            <p className="mota">
                                                Tôi Thấy Hoa Vàng Trên Cỏ Xanh là một câu chuyện về tuổi thơ đầy ắp kỷ niệm của những đứa trẻ vùng quê nghèo. 
                                                Tác phẩm của Nguyễn Nhật Ánh đã chạm đến trái tim của hàng triệu độc giả với những câu chuyện giản dị, 
                                                chân thật và đầy cảm xúc.
                                            </p>
                                        </div>
                                        <div className="trending-card-noidung-docngay">
                                            <button className="docngay">ĐỌC NGAY</button>
                                            <div className="yeuthich"><HiOutlineHeart /></div>
                                        </div>
                                    </div>

                                    <div className="trending-card-hinhanh">
                                        <img src="https://placehold.co/160x220"/>
                                    </div>
                                </div>
                            </div>
                            <div className="button" style={{ marginLeft: '10px' }}><HiOutlineChevronRight/></div>
                        </div>
                        <div className="hot">
                            <div className="hot-tieude">
                                <span className="tieude">Truyện HOT</span>
                                <a href="#">Xem tất cả</a>
                            </div>
                            <div className="hot-listcard">
                                <div className="hot-card">
                                    <div className="hot-card-container">
                                        <div className="hot-card-thongtin">
                                            <div className="trangthai">
                                                <HiOutlineBadgeCheck/>
                                                <span>Hoàn thành</span>
                                            </div>
                                            <div className="danhgia">
                                                <HiStar/>
                                                <span>4.4</span>
                                            </div>
                                        </div>
                                        <img src="https://placehold.co/129x203"/>
                                        <p className="hot-card-tieude">Tôi thấy hoa vàng trên cỏ xanh</p>
                                        <div className="hot-card-luotxem">
                                            <HiOutlineEye/> 
                                            <span>20.000</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="hot-card">
                                    <div className="hot-card-container">
                                        <div className="hot-card-thongtin">
                                            <div className="trangthai">
                                                <HiOutlineBadgeCheck/>
                                                <span>Hoàn thành</span>
                                            </div>
                                            <div className="danhgia">
                                                <HiStar/>
                                                <span>4.4</span>
                                            </div>
                                        </div>
                                        <img src="https://placehold.co/129x203"/>
                                        <p className="hot-card-tieude">Tôi thấy hoa vàng trên cỏ xanh</p>
                                        <div className="hot-card-luotxem">
                                            <HiOutlineEye/> 
                                            <span>20.000</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="hot-card">
                                    <div className="hot-card-container">
                                        <div className="hot-card-thongtin">
                                            <div className="danhgia">
                                                <HiStar/>
                                                <span>4.4</span>
                                            </div>
                                            <div className="trangthai">
                                                <HiOutlineBadgeCheck/>
                                                <span>Hoàn thành</span>
                                            </div>
                                        </div>
                                        <img src="https://placehold.co/129x203"/>
                                        <p className="hot-card-tieude">Tôi thấy hoa vàng trên cỏ xanh</p>
                                        <div className="hot-card-luotxem">
                                            <HiOutlineEye/> 
                                            <span>20.000</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="hot-card">
                                    <div className="hot-card-container">
                                        <div className="hot-card-thongtin">
                                            <div className="trangthai">
                                                <HiOutlineBadgeCheck/>
                                                <span>Hoàn thành</span>
                                            </div>
                                            <div className="danhgia">
                                                <HiStar/>
                                                <span>4.4</span>
                                            </div>
                                        </div>
                                        <img src="https://placehold.co/129x203"/>
                                        <p className="hot-card-tieude">Tôi thấy hoa vàng trên cỏ xanh</p>
                                        <div className="hot-card-luotxem">
                                            <HiOutlineEye/> 
                                            <span>20.000</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="hot-card">
                                    <div className="hot-card-container">
                                        <div className="hot-card-thongtin">
                                            <div className="trangthai">
                                                <HiOutlineBadgeCheck/>
                                                <span>Hoàn thành</span>
                                            </div>
                                            <div className="danhgia">
                                                <HiStar/>
                                                <span>4.4</span>
                                            </div>
                                        </div>
                                        <img src="https://placehold.co/129x203"/>
                                        <p className="hot-card-tieude">Tôi thấy hoa vàng trên cỏ xanh</p>
                                        <div className="hot-card-luotxem">
                                            <HiOutlineEye/> 
                                            <span>20.000</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="hot-card">
                                    <div className="hot-card-container">
                                        <div className="hot-card-thongtin">
                                            <div className="trangthai">
                                                <HiOutlineBadgeCheck/>
                                                <span>Hoàn thành</span>
                                            </div>
                                            <div className="danhgia">
                                                <HiStar/>
                                                <span>4.4</span>
                                            </div>
                                        </div>
                                        <img src="https://placehold.co/129x203"/>
                                        <p className="hot-card-tieude">Tôi thấy hoa vàng trên cỏ xanh</p>
                                        <div className="hot-card-luotxem">
                                            <HiOutlineEye/> 
                                            <span>20.000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="quangcao">

                        </div>

                        <div className="theloai-list">

                        </div>

                        <div className="tacgia">

                        </div>

                        <div className="hoanthanh">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

