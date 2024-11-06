import TaiKhoanLayout from '../../../../layout/user/taikhoanlayout/TaiKhoanLayout';
import { HiOutlinePhotograph } from "react-icons/hi";

import './style.css';
import ListBaiVietTaiKhoan from '../../../../components/user/manager/listbaiviet/ListBaiVietTaiKhoan';
export default function Baiviet() {
    return (
        <TaiKhoanLayout>
            <div className='bv-baiviet-container'>
                <div className='bv-noidung'>
                    <div className='bv-thembaiviet'>
                        <div className='bv-avata'><img src='https://placehold.co/129x203' /></div>
                        <div className='bv-camnghi'>
                            <textarea placeholder="Bạn đang nghĩ gì?" rows="4" className='text-input'></textarea>
                        </div>
                        <div className='bv-themanh-icon'><HiOutlinePhotograph/></div>
                        <div className='bv-dang'>Đăng</div>
                    </div>
                    <div className='bv-tieude'>BÀI VIẾT</div>
                    <div className='bv-list'><ListBaiVietTaiKhoan/></div>
                </div>

                <div className='bv-thongtin'>
                    <div className='bv-gioithieu'>
                        <p className='bv-tieude'>GIỚI THIỆU</p>
                        <p className='bv-noidung'>Xin chào</p>
                    </div>
                    <div className='bv-list-nguoitheodoi'>
                        <p className='bv-tieude'>NGƯỜI THEO DÕI</p>
                        <div className='bv-list'>danh sách</div>
                    </div>
                </div>
            </div>
        </TaiKhoanLayout>
    )
}
