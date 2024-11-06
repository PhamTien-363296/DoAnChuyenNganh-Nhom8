
import BaiVietItem from '../../common/items/baivietitem/BaiVietItem'
import { Link } from 'react-router-dom';

const baiviets = [
    {
        tenCongDong: "Tất cả",
        tenNguoiDung: "Người dùng 1",
        noiDungBV: "Đây là nội dung bài viết 1. Câu chuyện hấp dẫn về hành động.",
        luotThich: 120,
        binhLuan: 30,
    },
    {
        tenCongDong: "Hành động",
        tenNguoiDung: "Người dùng 2",
        noiDungBV: "Bài viết này kể về một cuộc phiêu lưu kịch tính đầy thử thách.",
        luotThich: 200,
        binhLuan: 50,
    },
    {
        tenCongDong: "Lãng mạn",
        tenNguoiDung: "Người dùng 3",
        noiDungBV: "Một câu chuyện tình yêu đầy cảm động giữa hai người trẻ.",
        luotThich: 180,
        binhLuan: 45,
    },
    {
        tenCongDong: "Kinh dị",
        tenNguoiDung: "Người dùng 4",
        noiDungBV: "Chuyện ma quái trong một ngôi nhà cổ đã bị bỏ hoang lâu năm.",
        luotThich: 150,
        binhLuan: 40,
    },
    {
        tenCongDong: "Huyền bí",
        tenNguoiDung: "Người dùng 5",
        noiDungBV: "Một câu chuyện về thế giới khác và những bí ẩn chưa được giải mã.",
        luotThich: 130,
        binhLuan: 35,
    },
    {
        tenCongDong: "Tâm lý",
        tenNguoiDung: "Người dùng 6",
        noiDungBV: "Bài viết khám phá sâu về tâm lý con người trong những tình huống căng thẳng.",
        luotThich: 160,
        binhLuan: 60,
    },
];

function ListBaiVietCongDong() {
    return (
        <>
            {baiviets.map((baiviet, index) => (
                <Link to={baiviet.path} key={index} style={{ textDecoration: 'none', color:'black'}}>
                    <BaiVietItem
                        tenCongDong={baiviet.tenCongDong}
                        tenNguoiDung={baiviet.tenNguoiDung}
                        noiDungBV={baiviet.noiDungBV}
                        luotThich={baiviet.luotThich}
                        binhLuan={baiviet.binhLuan}
                    />
                </Link>
            ))}
        </>
    )
}

export default ListBaiVietCongDong