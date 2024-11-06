import { Link } from 'react-router-dom';

const theloais = [
    { name: "Tất cả", path: "/theloai" },
    { name: "Hành động", path: "/theloai" },
    { name: "Lãng mạn", path: "/theloai" },
    { name: "Kinh dị", path: "/theloai" },
    { name: "Huyền bí", path: "/theloai" },
    { name: "Tâm lý", path: "/theloai" },
    { name: "Phiêu lưu", path: "/theloai" },
    { name: "Gia đình", path: "/theloai" },
    { name: "Cổ tích", path: "/theloai" },
    { name: "Kịch tính", path: "/theloai" },
    { name: "Lịch sử", path: "/theloai" },
    { name: "Hoạt hình", path: "/theloai" },
];

function ListTheloaiHome() {
    return (
        <>
            {theloais.map((theloai, index) => (
                <Link to={theloai.path} key={index}>
                    <button>{theloai.name}</button>
                </Link>
            ))}
        </>
    );
}

export default ListTheloaiHome;
