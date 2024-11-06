import BookCard from "../../../common/cards/bookcard/BookCard";

const books = [
    { tieuDe: "Bốn bề là biển", soSao: 4.8, trangThai: "Đang viết", luotXem: "15.500", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Người tình mùa đông", soSao: 4.7, trangThai: "Hoàn thành", luotXem: "18.300", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Cẩm Nang Nuôi Dạy Con", soSao: 4.6, trangThai: "Tạm dừng", luotXem: "22.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Đắc Nhân Tâm", soSao: 4.9, trangThai: "Hoàn thành", luotXem: "25.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Kẻ Lừa Đảo", soSao: 4.5, trangThai: "Đang viết", luotXem: "13.200", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Bảy Thói Quen Của Người Thành Đạt", soSao: 4.3, trangThai: "Tạm dừng", luotXem: "30.000", imgSrc: "https://placehold.co/129x203" },
];


function ListBookTheloai() {
    return (
        <>
            {books.map((book, index) => (
                <BookCard 
                    key={index}
                    tieuDe={book.tieuDe}
                    soSao={book.soSao}
                    trangThai={book.trangThai}
                    luotXem={book.luotXem}
                    imgSrc={book.imgSrc}
                />
            ))}
        </>
    );
}

export default ListBookTheloai;
