import { Link } from 'react-router-dom';
import ListBookTacPham from '../../../../components/user/manager/listitem/listbook-tacpham/ListBookTacPham';
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
                    <div className='tp-themtruyen'>
                        <Link style={{textDecoration:'none', color:'#49372F'}} to={'/taotruyen'}>
                            <p>THÊM TRUYỆN</p>
                        </Link>
                    </div>
                </div>

                <div className='tp-danhsach'>
                    <ListBookTacPham/>
                </div>
            </div>
        </TaiKhoanLayout>
    )
}
