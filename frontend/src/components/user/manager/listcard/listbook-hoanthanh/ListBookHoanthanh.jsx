import BookCard from "../../../common/cards/bookcard/BookCard";

const books = [
    { tieuDe: "Tôi thấy hoa vàng trên cỏ xanh", soSao: 4.4, trangThai: "Hoàn thành", luotXem: "20.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Sống trong chính mình", soSao: 4.5, trangThai: "Hoàn thành", luotXem: "15.000", imgSrc: "https://placehold.co/130x203" },
    { tieuDe: "Cô gái đến từ hôm qua", soSao: 4.8, trangThai: "Hoàn thành", luotXem: "25.000", imgSrc: "https://placehold.co/131x203" },
    { tieuDe: "Tạm dừng hành trình", soSao: 3.7, trangThai: "Hoàn thành", luotXem: "10.000", imgSrc: "https://placehold.co/132x203" },
    { tieuDe: "Khi hơi thở hóa thang thuốc", soSao: 4.6, trangThai: "Hoàn thành", luotXem: "30.000", imgSrc: "https://placehold.co/133x203" },
    { tieuDe: "Đi qua mùa hạ", soSao: 4.0, trangThai: "Hoàn thành", luotXem: "18.000", imgSrc: "https://placehold.co/134x203" },
];

function ListBookHoanthanh() {
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

export default ListBookHoanthanh;
