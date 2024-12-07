import Chuong from "../models/chuong.model.js";  
import Truyen from "../models/truyen.model.js";
import Nguoidung from "../models/nguoidung.model.js";

export const themChuong = async (req, res) => {
    try {
        const { tenChuong, noiDungChuong, truyenIdChuong } = req.body;

        if (!truyenIdChuong) {
            return res.status(400).json({ error: "TruyenIdChuong is required" });
        }

        const truyen = await Truyen.findById(truyenIdChuong);
        if (!truyen) return res.status(404).json({ message: "Không tìm thấy truyện của chương" });

        const chuongMoi = new Chuong({
            tenChuong,
            noiDungChuong,
            truyenIdChuong, 
        });

        await chuongMoi.save();

        truyen.idCacChuong.push(chuongMoi._id);
        await truyen.save();

        res.status(201).json(chuongMoi);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi themChuong controller", error);
    }
};

export const layChuong = async (req, res) => {
    const { id } = req.params;
    try {
        const chuong = await Chuong.find({ truyenIdChuong: id });
        res.status(200).json(chuong);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layChuong controller", error);
    }
};

export const layTheoId = async (req, res) => {
    const { id } = req.params;
    const idND = req.nguoidung._id;

    try {
        const chuong = await Chuong.findById({ _id: id });

        if (!chuong) {
            return res.status(404).json({ message: 'Chương không tồn tại' });
        }

        const truyenId = chuong.truyenIdChuong;

        const nguoiDung = await Nguoidung.findById(idND);
        if (!nguoiDung) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const lichSuHienTai = nguoiDung.lichSuND.find(
            (lichSu) => lichSu.truyenId.toString() === truyenId.toString() && lichSu.chuongId.toString() === id.toString()
        );

        if (lichSuHienTai) {
            lichSuHienTai.lastRead = new Date();
        } else {
            nguoiDung.lichSuND.push({
                truyenId,
                chuongId: id,
                lastRead: new Date(),
            });
        }

        await nguoiDung.save();
        res.status(200).json(chuong);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTheoId controller", error);
    }
};

export const suaChuong = async (req, res) => {
    const { tenChuong, noiDungChuong } = req.body;

    try {
        let chuong = await Chuong.findById(req.params.id);

        if (!chuong) return res.status(404).json({ message: "Không tìm thấy chương." });

        if (tenChuong) chuong.tenChuong = tenChuong;
        if (noiDungChuong) chuong.noiDungChuong = noiDungChuong;

        chuong = await chuong.save();

        return res.status(200).json({ chuong });
    } catch (error) {
        console.log("Lỗi suaChuong controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const xoaChuong = async (req, res) => {
    try {
        const chuong = await Chuong.findById(req.params.id);
        if (!chuong) {
            return res.status(404).json({ error: "Không tìm thấy chương" });
        }

        const truyenIdChuong = chuong.truyenIdChuong;

        const truyen = await Truyen.findById(truyenIdChuong);
        if (truyen) {
            truyen.idCacChuong = truyen.idCacChuong.filter(id => id.toString() !== req.params.id);
            await truyen.save();
        }

        await Chuong.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Xóa chương thành công" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi xoaChuong controller", error.message);
    }
};