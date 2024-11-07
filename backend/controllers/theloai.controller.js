import Theloai from "../models/theloai.model.js";

export const layTatcaTheloai = async (req, res) => {
    try {
        const theloai = await Theloai.find();
        res.status(200).json(theloai);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTatcaTheloai controller", error);
    }
};

export const themTheloai = async (req, res) => {
    try {
        const { tieuDeTheLoai } = req.body;

        const theLoaiMoi = new Theloai({
            tieuDeTheLoai
        });

        await theLoaiMoi.save();

        res.status(201).json(theLoaiMoi);
    } catch (error) {
        console.log("Lỗi theLoaiMoi controller", error.message);
        return res.status(500).json({ error: "Lỗi 500" });
    }
};

export const suaTheloai = async (req, res) => {
    const { tieuDeTheLoai } = req.body;

    try {
        let theloai = await Theloai.findById(req.params.id);

        if (!theloai) return res.status(404).json({ message: "Không tìm thấy thể loại" });

        if (tieuDeTheLoai) theloai.tieuDeTheLoai = tieuDeTheLoai;

        theloai = await theloai.save();

        return res.status(200).json({ theloai });
    } catch (error) {
        console.log("Lỗi suaTheloai controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const xoaTheloai = async (req, res) => {
    try {
        const theloai = await Theloai.findById(req.params.id);
        if (!theloai) {
            return res.status(404).json({ error: "Không tìm thấy thể loại" });
        }

        await Theloai.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Xóa thể loại thành công" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi xoaTheloai controller", error.message);
    }
};
