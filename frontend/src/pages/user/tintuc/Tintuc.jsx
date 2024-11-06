import ListBaiVietTinTuc from '../../../components/user/manager/listbaiviet/ListBaiVietTinTuc';
import MainLayout from '../../../layout/user/mainLayout/MainLayout';
import './Tintuc.css'

export default function Tintuc() {
    return (
        <MainLayout>
            <div className='tt-tintuc-container'>
                <div className='tt-noidung'>
                    <div className='tt-tieude'>TIN TỨC</div>
                    <div className='tt-list'><ListBaiVietTinTuc/></div>
                </div>

                <div className='tt-congdong'>
                    <div className='tt-tieude'>CỘNG ĐỒNG</div>
                    <div className='tt-list-congdong'>
                        xin chào
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
