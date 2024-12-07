import Nguoidung from "../models/nguoidung.model.js";

export const layLichSuDoc = async (req, res) => {
    const idND = req.nguoidung._id;

    try {
        const nguoiDung = await Nguoidung.findById(idND)
            .populate('lichSuND.truyenId')
            .populate('lichSuND.chuongId');

        if (!nguoiDung) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        const result = nguoiDung.lichSuND.map(item => {
            const truyen = item.truyenId;
            const chuong = item.chuongId;

            if (truyen && chuong) {
                return {
                    truyen: truyen,    
                    chuong: chuong,
                };
            }
        }).filter(item => item !== undefined);

        const uniqueResult = [...new Map(result.sort((a, b) => new Date(b.ngayCapNhat) - new Date(a.ngayCapNhat))
            .map(item => [item.truyen._id, item])).values()];

        res.status(200).json(uniqueResult);

    } catch (error) {
        console.error('Lỗi khi lấy lịch sử đọc:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};
