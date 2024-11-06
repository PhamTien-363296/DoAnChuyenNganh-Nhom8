import BookItem from '../../../../components/user/common/items/bookitem/BookItem';
import TaiKhoanLayout from '../../../../layout/user/taikhoanlayout/TaiKhoanLayout';
import './style.css'

export default function Tacpham() {
    return (
        <TaiKhoanLayout>
            <div className='tp-container'>
                <div className='tp-noidung'>
                    <div className='tp-tieude'>
                        <p>DANH SÁCH CÁC <strong>TÁC PHẨM</strong></p>
                    </div>
                    <div className='tp-themtruyen'><p>THÊM TRUYỆN</p></div>
                </div>

                <div className='tp-danhsach'>
                    <BookItem/>
                </div>
            </div>
        </TaiKhoanLayout>
    )
}
