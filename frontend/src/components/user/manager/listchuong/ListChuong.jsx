import ChuongItem from '../../common/items/chuongitem/ChuongItem';

function ListChuong() {
    const chuongList = [
        { tenChuong: "Chương 1: Khởi đầu mới", trangThai: "CÔNG KHAI", ngay: "01/11/2024" },
        { tenChuong: "Chương 2: Cuộc phiêu lưu", trangThai: "CÔNG KHAI", ngay: "03/11/2024" },
        { tenChuong: "Chương 3: Những thử thách", trangThai: "RIÊNG TƯ", ngay: "05/11/2024" },
        { tenChuong: "Chương 4: Cái kết mở", trangThai: "RIÊNG TƯ", ngay: "07/11/2024" }
    ];

    return (
        <>
            {chuongList.map((chuong, index) => (
                <ChuongItem 
                    key={index}
                    tenChuong={chuong.tenChuong}
                    trangThai={chuong.trangThai}
                    ngay={chuong.ngay}
                />
            ))}
        </>
    );
}

export default ListChuong;
