import MainLayout from '../../../layout/user/mainLayout/MainLayout'
import './Trangcanhan.css'
function Trangcanhan() {
    return (
        <MainLayout>
            <div className='canhan-content'>
                <div className="canhan">
                    <div className="avata"><img src='https://placehold.co/150x150'/></div>
                        <div className="tennguoidung" style={{fontWeight:'bold', fontSize:'30px'}}><p style={{margin:'0'}}>Mintu</p></div>
                        <div className="nguoitheodoi">
                            <p>1005 Người theo dõi</p>
                        </div>
                        <div className="dangtheodoi">
                            <p>1005 Đang theo dõi</p>
                        </div>
                        <div className="slbaiviet">
                            <p>1005 Bài viết</p>
                        </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Trangcanhan