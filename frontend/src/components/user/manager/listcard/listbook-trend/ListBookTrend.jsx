import TrendCard from "../../../common/cards/trendcard/TrendCard";

const books = [
    { 
        tieuDe: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", 
        tacGia: "Nguyễn Nhật Ánh", 
        soSao: 4.4, 
        chuong: 10, 
        trangThai: "Hoàn thành", 
        luotXem: "1.000.000", 
        moTa: "Một câu chuyện về tuổi thơ đầy ắp kỷ niệm của những đứa trẻ vùng quê nghèo...", 
        imgSrc: "https://placehold.co/160x250" 
    },
    { 
        tieuDe: "Mắt Biếc", 
        tacGia: "Nguyễn Nhật Ánh", 
        soSao: 4.7, 
        chuong: 12, 
        trangThai: "Đang viết", 
        luotXem: "850.000", 
        moTa: "Tình yêu đơn phương của chàng trai dành cho người bạn thời thơ ấu với biết bao đau khổ...", 
        imgSrc: "https://placehold.co/100x250" 
    }
];

function ListBookTrend() {
    return (
        <>
            {books.map((book, index) => (
                <TrendCard 
                    key={index}
                    tieuDe={book.tieuDe}
                    tacGia={book.tacGia}
                    soSao={book.soSao}
                    chuong={book.chuong}
                    trangThai={book.trangThai}
                    luotXem={book.luotXem}
                    moTa={book.moTa}
                    imgSrc={book.imgSrc}
                />
            ))}
        </>
    );
}

export default ListBookTrend;
