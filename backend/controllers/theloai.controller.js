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