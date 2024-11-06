import BookCard from "../../../common/cards/bookcard/BookCard";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const books = [
    { tieuDe: "Bốn bề là biển", soSao: 4.8, trangThai: "Đang viết", luotXem: "15.500", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Người tình mùa đông", soSao: 4.7, trangThai: "Hoàn thành", luotXem: "18.300", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Cẩm Nang Nuôi Dạy Con", soSao: 4.6, trangThai: "Tạm dừng", luotXem: "22.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Đắc Nhân Tâm", soSao: 4.9, trangThai: "Hoàn thành", luotXem: "25.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Kẻ Lừa Đảo", soSao: 4.5, trangThai: "Đang viết", luotXem: "13.200", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Bảy Thói Quen Của Người Thành Đạt", soSao: 4.3, trangThai: "Tạm dừng", luotXem: "30.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Một Mảnh Đời", soSao: 4.2, trangThai: "Hoàn thành", luotXem: "19.500", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Sống Trong Thế Giới Thay Đổi", soSao: 4.6, trangThai: "Đang viết", luotXem: "12.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Nghệ Thuật Tinh Tế", soSao: 4.4, trangThai: "Hoàn thành", luotXem: "20.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Cảm Xúc Đời", soSao: 4.1, trangThai: "Tạm dừng", luotXem: "11.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Chuyện Tình Mùa Hè", soSao: 4.5, trangThai: "Hoàn thành", luotXem: "17.500", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Khúc Hát Hồn Quê", soSao: 4.7, trangThai: "Đang viết", luotXem: "23.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Hành Trình Khám Phá", soSao: 4.3, trangThai: "Tạm dừng", luotXem: "15.800", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Lý Thuyết Về Hạnh Phúc", soSao: 4.8, trangThai: "Hoàn thành", luotXem: "29.500", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Tâm Hồn Vô Tư", soSao: 4.2, trangThai: "Đang viết", luotXem: "14.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Làm Chủ Tâm Trí", soSao: 4.9, trangThai: "Hoàn thành", luotXem: "26.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Kỹ Năng Sống", soSao: 4.4, trangThai: "Tạm dừng", luotXem: "22.000", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Chinh Phục Bản Thân", soSao: 4.7, trangThai: "Đang viết", luotXem: "18.300", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Những Ngọn Lửa Bất Tận", soSao: 4.6, trangThai: "Hoàn thành", luotXem: "31.200", imgSrc: "https://placehold.co/129x203" },
    { tieuDe: "Tình Yêu Thời Thượng", soSao: 4.8, trangThai: "Đang viết", luotXem: "24.500", imgSrc: "https://placehold.co/129x203" },
];

function ListBookDanhMuc() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")) || 1; // Lấy trang từ URL, mặc định là 1
    const [currentPage, setCurrentPage] = useState(initialPage);
    const booksPerPage = 18; // Số lượng sách mỗi trang

    // Tính toán chỉ số của sách đầu và cuối cho trang hiện tại
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // Chuyển đổi sang mảng trang
    const totalPages = Math.ceil(books.length / booksPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`?page=${pageNumber}`); // Cập nhật URL với trang mới
    };

    useEffect(() => {
        setCurrentPage(initialPage); // Cập nhật state khi trang từ URL thay đổi
    }, [initialPage]);

    return (
        <>
            {currentBooks.map((book, index) => (
                <BookCard 
                    key={index}
                    tieuDe={book.tieuDe}
                    soSao={book.soSao}
                    trangThai={book.trangThai}
                    luotXem={book.luotXem}
                    imgSrc={book.imgSrc}
                />
            ))}
            <nav>
                <ul className="dieuhuong">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1} className="page-item">
                            <button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default ListBookDanhMuc;