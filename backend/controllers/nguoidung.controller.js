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

export const yeuThich = async (req, res) => {
    try {   
        const idTruyen = req.params.id; 
        const idND = req.nguoidung._id;
        const nguoiDung = await Nguoidung.findById(idND);
        if (!nguoiDung) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const index = nguoiDung.yeuThichND.indexOf(idTruyen);
        if (index === -1) {
            nguoiDung.yeuThichND.push(idTruyen);
        } else {
            nguoiDung.yeuThichND.splice(index, 1);
        }
        await nguoiDung.save();

        return res.status(200).json({
            message: index === -1 ? "Đã thêm vào danh sách yêu thích" : "Đã xóa khỏi danh sách yêu thích",
            yeuThichND: nguoiDung.yeuThichND,
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi yêu thích controller", error.message);
    }
};
