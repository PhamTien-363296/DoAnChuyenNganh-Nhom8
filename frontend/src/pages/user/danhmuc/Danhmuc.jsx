import MainLayout from '../../../layout/user/mainLayout/MainLayout';
import ListTheloai from "../../../components/user/manager/listtheloai/ListTheLoai";
import './Danhmuc.css';
import ListBookDanhMuc from '../../../components/user/manager/listcard/listbook-danhmuc/ListBookDanhMuc';
import { useLocation } from 'react-router-dom';

export default function Danhmuc() {
    const location = useLocation();
    const theloaiId = location.state?.theloaiId;

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
                <ListBookDanhMuc theloaiId={theloaiId} />
            </div>
        </MainLayout>
    );
}
