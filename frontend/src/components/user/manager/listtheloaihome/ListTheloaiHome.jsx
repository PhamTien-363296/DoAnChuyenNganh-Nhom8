import { Link } from 'react-router-dom';

const theloais = [
    { name: "Tất cả", path: "/theloai" },
    { name: "Hành động", path: "/theloai" },
    { name: "Lãng mạn", path: "/theloai" },
    { name: "Kinh dị", path: "/theloa" },
    { name: "Khoa học viễn tưởng", path: "/theloai" },
    { name: "Huyền bí", path: "/theloai" },
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
