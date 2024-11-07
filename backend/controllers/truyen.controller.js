import Truyen from "../models/truyen.model.js";

export const layTatcaTruyen = async (req, res) => {
    try {
        const truyen = await Truyen.find();
        res.status(200).json(truyen);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTatcaTruyen controller", error);
    }
};

export const layTruyenTheoTheloai = async (req, res) => {
    const { id } = req.params;
    try {
        const truyen = await Truyen.find({ theloaiId: id });
        res.status(200).json(truyen);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTruyenTheoTheloai controller", error);
    }
};

