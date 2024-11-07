import Truyen from "../models/truyen.model.js";
import {v2 as cloudinary} from 'cloudinary'
import Nguoidung from "../models/nguoidung.model.js";
import Theloai from "../models/theloai.model.js";

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



export const themTruyen = async (req, res) => {
    try {
        const { tenTruyen, moTaTruyen, anhTruyen, theLoaiIdTruyen } = req.body;
        const tacGiaIdTruyen = req.nguoidung._id.toString();


        const nguoidung = await Nguoidung.findById(tacGiaIdTruyen);
        if (!nguoidung) return res.status(404).json({ message: "Không tìm thấy người dùng" });

   
        if (!tenTruyen ) {
            return res.status(400).json({ error: "Truyện cần có tên" });
        }

  
        let anhTruyenUrl = anhTruyen;
        if (anhTruyen) {
            const uploadResult = await cloudinary.uploader.upload(anhTruyen);
            anhTruyenUrl = uploadResult.secure_url;
        }

        const truyenMoi = new Truyen({
            tenTruyen,
            moTaTruyen,
            anhTruyen: anhTruyenUrl,
            theLoaiIdTruyen,
            tacGiaIdTruyen,
        });

      
        const theLoai = await Theloai.findById(theLoaiIdTruyen);
        if (!theLoai) {
            console.log("Không tìm thấy thể loại với ID:", theLoaiIdTruyen);
            return res.status(404).json({ message: "Không tìm thấy thể loại" });
        }

        theLoai.idTruyen.push(truyenMoi._id); 
        await theLoai.save();

 
        await truyenMoi.save();
        res.status(201).json(truyenMoi);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log("Error in themTruyen controller", error);
    }
};