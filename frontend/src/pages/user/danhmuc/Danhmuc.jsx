import MainLayout from '../../../layout/user/mainLayout/MainLayout';
import ListTheloai from "../../../components/user/manager/listtheloai/ListTheloai";

import './Danhmuc.css'
import ListBookDanhMuc from '../../../components/user/manager/listcard/listbook-danhmuc/ListBookDanhMuc';

export default function Danhmuc() {
    return (
        <MainLayout>
            <div className="danhmuc-theloai">
                <div className="danhmuc-tieude">
                    <p style={{ fontWeight: "bold" }}>Thể loại</p>
                </div>
                <div className="danhmuc-noidung">
                    <ListTheloai/>
                </div>
            </div>

            <div className='listsach'>
                <ListBookDanhMuc/>
            </div>
        </MainLayout>
    )
}
