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
                    lastRead: item.lastRead,
                };
            }
        }).filter(item => item !== undefined);

        const sortedResult = result.sort((a, b) => new Date(b.lastRead) - new Date(a.lastRead));

        const uniqueResult = [...new Map(sortedResult.map(item => [item.truyen._id, item])).values()];


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

export const layYeuThich = async (req, res) => {
    const idND = req.nguoidung._id;

    try {
        const nguoiDung = await Nguoidung.findById(idND).populate("yeuThichND");

        if (!nguoiDung) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        let yeuThichND = nguoiDung.yeuThichND;

        yeuThichND = yeuThichND.reverse();

        return res.status(200).json({
            yeuThichND,
        });
    } catch (error) {
        console.error('Lỗi khi lấy yêu thích:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};



export const layNguoiDungTN = async (req, res) => {
	try {
		const nguoidung = req.nguoidung._id;

		const nguoidungdaloc = await Nguoidung.find({ _id: { $ne: nguoidung } }).select("-matKhau");

		res.status(200).json(nguoidungdaloc);
	} catch (error) {
		console.error("Lỗi layNguoiDungTN controller: ", error.message);
		res.status(500).json({ error: "Lỗi 500" });
	}
};