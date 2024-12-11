import Truyen from "../models/truyen.model.js";
import {v2 as cloudinary} from 'cloudinary'
import Nguoidung from "../models/nguoidung.model.js";
import Theloai from "../models/theloai.model.js";
import Danhgia from "../models/danhgia.model.js";
import Baiviet from "../models/baiviet.model.js";
import Congdong from "../models/congdong.model.js";

export const layTatcaTruyen = async (req, res) => {
    const { sort = "phobien", page = 1, limit = 18, sao, tinhtrang } = req.query;

    const pageSize = parseInt(limit);
    const skip = (page - 1) * pageSize;

    try {
        let sortQuery;
        switch (sort) {
            case "phobien":
                sortQuery = { luotXemTruyen: -1 };
                break;
            case "moinhat":
                sortQuery = { updatedAt: -1 };
                break;
            case "danhgia":
                sortQuery = { "danhGia.trungBinhSao": -1 };
                break;
            default:
                sortQuery = {};
        }

        let dkLoc = { trangThaiTruyen: "Công khai" };

        if (tinhtrang && tinhtrang !== "tatca") {
            if (tinhtrang === "hoanthanh") {
                dkLoc.tinhTrangTruyen = "Hoàn thành";
            } else if (tinhtrang === "dangviet") {
                dkLoc.tinhTrangTruyen = "Đang viết";
            } else if (tinhtrang === "tamdung") {
                dkLoc.tinhTrangTruyen = "Tạm dừng";
            }
        }

        if (sao && sao !== "tatca") {
            const saoRange = sao.split("-");
            const minSao = parseFloat(saoRange[0]);
            const maxSao = parseFloat(saoRange[1]);

            if (!isNaN(minSao) && !isNaN(maxSao)) {
                dkLoc["danhGia.trungBinhSao"] = { $gte: minSao, $lte: maxSao };
            }
        }

        const tong = await Truyen.countDocuments(dkLoc);

        const tongPage = Math.ceil(tong / pageSize);

        const truyen = await Truyen.find(dkLoc)
            .sort(sortQuery)
            .skip(skip)
            .limit(pageSize)
            .populate("tacGiaIdTruyen", "tenNguoiDung")
            .populate("theLoaiIdTruyen", "tenTheLoai");

        res.status(200).json({
            truyen,
            tongPage,
            tong,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTatcaTruyen controller", error);
    }
};


export const layTruyenTheoTheloai = async (req, res) => {
    const { id } = req.params;
    const { sort = "phobien", page = 1, limit = 18, sao, tinhtrang } = req.query;

    const pageSize = parseInt(limit);
    const skip = (page - 1) * pageSize;

    try {
        let sortQuery;
        switch (sort) {
            case "phobien":
                sortQuery = { luotXemTruyen: -1 };
                break;
            case "moinhat":
                sortQuery = { updatedAt: -1 };
                break;
            case "danhgia":
                sortQuery = { "danhGia.trungBinhSao": -1 };
                break;
            default:
                sortQuery = {};
        }

        let dkLoc = { theLoaiIdTruyen: id, trangThaiTruyen: "Công khai" };

        if (tinhtrang && tinhtrang !== "tatca") {
            if (tinhtrang === "hoanthanh") {
                dkLoc.tinhTrangTruyen = "Hoàn thành";
            } else if (tinhtrang === "dangviet") {
                dkLoc.tinhTrangTruyen = "Đang viết";
            } else if (tinhtrang === "tamdung") {
                dkLoc.tinhTrangTruyen = "Tạm dừng";
            }
        }

        if (sao && sao !== "tatca") {
            const saoRange = sao.split("-");
            const minSao = parseFloat(saoRange[0]);
            const maxSao = parseFloat(saoRange[1]);

            if (!isNaN(minSao) && !isNaN(maxSao)) {
                dkLoc["danhGia.trungBinhSao"] = { $gte: minSao, $lte: maxSao };
            }
        }

        const tong = await Truyen.countDocuments(dkLoc);

        const tongPage = Math.ceil(tong / pageSize);

        const truyen = await Truyen.find(dkLoc)
            .sort(sortQuery)
            .skip(skip)
            .limit(pageSize)
            .populate("tacGiaIdTruyen", "tenNguoiDung")
            .populate("theLoaiIdTruyen", "tenTheLoai");

        res.status(200).json({
            truyen,
            tongPage,
            tong,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTruyenTheoTheloai controller", error);
    }
};


export const layTruyenTheoNguoidung = async (req, res) => {
    try {
        const tacGiaIdTruyen = req.nguoidung._id.toString();

        const nguoidung = await Nguoidung.findById(tacGiaIdTruyen);
        if (!nguoidung) return res.status(404).json({ message: "Không tìm thấy người dùng" });

        const truyen = await Truyen.find({ tacGiaIdTruyen: tacGiaIdTruyen });
        if (!truyen) {
            return res.status(404).json({ message: "Không tìm thấy truyện của người dùng" });
        }

        res.status(200).json(truyen);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTruyenTheoNguoidung controller", error);
    }
};

export const layTheoId = async (req, res) => {
    const { id } = req.params;
    const idND = req.nguoidung._id;

    try {
        const truyen = await Truyen.findById(id)
        .populate("tacGiaIdTruyen")
        .populate("theLoaiIdTruyen")
        .populate({
            path: "idCacChuong",
            match: { trangThaiChuong: "Công khai" },
        });
        
        const nguoiDung = await Nguoidung.findById(idND);
        const lichSuDoc = nguoiDung ? nguoiDung.lichSuND : [];

        const chaptersWithStatus = truyen.idCacChuong.map((chuong) => {
            const isRead = lichSuDoc.some((history) => 
                history.truyenId.toString() === truyen._id.toString() && 
                history.danhSachChuong.some(
                    (historyChuong) => historyChuong.chuongId.toString() === chuong._id.toString()
                )
            );
            
            const isLocked = chuong.xuDeMoChuong > 0 && !isRead;

            return { 
                ...chuong._doc, 
                isRead, 
                isLocked 
            };
        });

        let isFavorite = false;
        if (idND) {
            isFavorite = await Nguoidung.exists({
                _id: idND,
                yeuThichND: id,
            });
        }

        res.status(200).json({
            truyen: { ...truyen._doc, idCacChuong: chaptersWithStatus },
            isFavorite
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTheoId controller", error);
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

export const suaTruyen = async (req, res) => {
    const { tenTruyen, moTaTruyen, anhTruyen, theLoaiIdTruyen, tinhTrangTruyen, trangThaiTruyen } = req.body;

    try {
        let truyen = await Truyen.findById(req.params.id);

        if (!truyen) return res.status(404).json({ message: "Không tìm thấy truyện" });

        if (tenTruyen) truyen.tenTruyen = tenTruyen;
        if (moTaTruyen) truyen.moTaTruyen = moTaTruyen;
        if (anhTruyen) truyen.anhTruyen = anhTruyen;
        if (tinhTrangTruyen) truyen.tinhTrangTruyen = tinhTrangTruyen;
        if (trangThaiTruyen) truyen.trangThaiTruyen = trangThaiTruyen;

        const theLoaiIdTruyenCu = truyen.theLoaiIdTruyen;

        if (theLoaiIdTruyen && theLoaiIdTruyen !== theLoaiIdTruyenCu) {
            const theLoaiCu = await Theloai.findById(theLoaiIdTruyenCu);
            const theLoaiMoi = await Theloai.findById(theLoaiIdTruyen);

            if (!theLoaiMoi) {
                return res.status(404).json({ message: "Không tìm thấy thể loại này" });
            }

            if (theLoaiCu) {
                theLoaiCu.idTruyen.pull(truyen._id); 
                await theLoaiCu.save(); 
            }

            truyen.theLoaiIdTruyen = theLoaiMoi._id; 
            theLoaiMoi.idTruyen.push(truyen._id);

            await theLoaiMoi.save();
        }

        truyen = await truyen.save();

        return res.status(200).json({ truyen });
    } catch (error) {
        console.log("Lỗi suaTruyen controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const xoaTruyen = async (req, res) => {
    try {
        const truyen = await Truyen.findById(req.params.id);
        if (!truyen) {
            return res.status(404).json({ error: "Không tìm thấy truyện" });
        }

        await Truyen.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Xóa truyện thành công" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi xoaTruyen controller", error.message);
    }
};

export const capNhatLuotXem = async (req, res) => {
    const { id } = req.params; 
    try {   
        const truyen = await Truyen.findById(id);
        if (truyen) {
            truyen.luotXemTruyen += 1;
            await truyen.save();
        } else {
            console.log('Truyện không tồn tại');
        }
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi cập nhật lượt xem truyện controller", error.message);
    }
};

export const layTruyenTrending = async (req, res) => {
    const idND = req.nguoidung._id; 

    try {
        let limit = 6;
        const truyen = await Truyen.find({ trangThaiTruyen: "Công khai" })
            .populate("tacGiaIdTruyen")
            .populate({
                path: "idCacChuong",
                match: { trangThaiChuong: "Công khai" },
            })
            .sort({ luotXemTruyen: -1 })
            .limit(limit);

        if (truyen.length === 0) {
            return res.status(404).json({ message: 'Không có Truyện công khai' });
        }

        const truyenLike = [];

        for (let i = 0; i < truyen.length; i++) {
            let isFavorite = false;
            if (idND) {
                isFavorite = await Nguoidung.exists({
                    _id: idND,
                    yeuThichND: truyen[i]._id,
                });
            }

            truyenLike.push({
                truyen: truyen[i],
                isFavorite
            });
        }


        res.status(200).json({
            truyenLike
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi lấy truyện treding controller", error.message);
    }
};

export const layTruyenHoanThanh = async (req, res) => {
    try {
        let limit = 6;
        const truyen = await Truyen.find({ trangThaiTruyen: "Công khai", tinhTrangTruyen: "Hoàn thành" })
            .populate("tacGiaIdTruyen")
            .sort({ luotXemTruyen: -1 })
            .limit(limit);

        if (truyen.length === 0) {
            return res.status(404).json({ message: 'Không có Truyện công khai' });
        }

        res.status(200).json({
            truyen
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi lấy truyện hoàn thành controller", error.message);
    }
};

export const layTruyenHot = async (req, res) => {
    try {
        let limit = 6;
        const truyen = await Truyen.find({ trangThaiTruyen: "Công khai" })
            .populate("tacGiaIdTruyen")
            .sort({ "danhGia.trungBinhSao": -1 })
            .limit(limit);

        if (truyen.length === 0) {
            return res.status(404).json({ message: 'Không có Truyện công khai' });
        }

        res.status(200).json({
            truyen
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi lấy truyện hot controller", error.message);
    }
};

export const layTheLoaiDocNhieu = async (req, res) => {
    try {
        const topTheLoai = await Truyen.aggregate([
            { $group: {
                _id: "$theLoaiIdTruyen",
                totalLuotXem: { $sum: "$luotXemTruyen" },
            }},
            { $sort: { totalLuotXem: -1 } },
            { $limit: 1 },
        ]);

        if (topTheLoai.length > 0) {
            const topTheLoaiId = topTheLoai[0]._id;

            const topBooks = await Truyen.find({ theLoaiIdTruyen: topTheLoaiId })
                .populate("theLoaiIdTruyen")
                .sort({ luotXemTruyen: -1 })
                .limit(6);

            res.status(200).json({
                topTheLoai: topTheLoai[0],
                topBooks,
                message: `Thể loại có truyện được xem nhiều nhất: ${topTheLoai[0]._id}`,
            });
        } else {
            res.status(404).json({ message: "Không tìm thấy thể loại nào." });
        }
    } catch (error) {
        console.error("Lỗi lấy thể loại và sách:", error.message);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
};

export const layTopTacGia = async (req, res) => {
    try {
        //nhóm theo tác giả
        const topTacGia = await Truyen.aggregate([
            { $match: { trangThaiTruyen: "Công khai" } },
            { $group: {
                _id: "$tacGiaIdTruyen",
                totalLuotXem: { $sum: "$luotXemTruyen" },
            }},
            { $lookup: {
                from: "Nguoidung",
                localField: "_id", 
                foreignField: "_id", 
                as: "tacGiaInfo",
            }},
            { $unwind: "$tacGiaInfo" },
            { $sort: { totalLuotXem: -1 } },
            { $limit: 6 },
        ]);

        if (topTacGia.length > 0) {
            res.status(200).json({
                topTacGia,
                message: "Top 6 tác giả có lượt xem nhiều nhất.",
            });
        } else {
            res.status(404).json({ message: "Không tìm thấy tác giả nào." });
        }
    } catch (error) {
        console.error("Lỗi lấy top tác giả:", error.message);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
};
export const goiYTimKiem = async (req, res) => {
    const search = req.query.search;
    if (!search) {
        return res.status(400).send({ message: 'Vui lòng nhập từ tìm kiếm' });
    }
    try {
        const goiYTruyen = await Truyen.find({
            tenTruyen: { $regex: search, $options: 'i' },
            trangThaiTruyen: 'Công khai'})
            .limit(5)
            
        const goiYTacGia = await Nguoidung.find({
            username: { $regex: search, $options: 'i' }
        }).limit(3);

        const goiYCongDong = await Congdong.find({
            tenCD: { $regex: search, $options: 'i' }
        }).limit(3);

        res.json({ goiYTruyen, goiYTacGia, goiYCongDong });
        } catch (err) {
        console.error('Lỗi trả về gợi ý:', err);
        res.status(500).send({ message: 'Server error' });
    }
};

export const timKiem = async (req, res) => {
    const { search, loc } = req.query;

    try {
        let ketqua=[];

        if(loc === 'truyen'){
            ketqua = await Truyen.find({
                tenTruyen: { $regex: search, $options: 'i' }, 
                trangThaiTruyen: 'Công khai'
            })
            .populate("tacGiaIdTruyen");
        } else if(loc === 'tacGia'){
            ketqua = await Nguoidung.find({
                username: { $regex: search, $options: 'i' }
            });
        } else if(loc === 'baiViet'){
            ketqua = await Baiviet.find({
                noiDungBV: { $regex: search, $options: 'i' }
            }).populate("nguoiDungIdBV");
        } else if(loc === 'congDong'){
            ketqua = await Congdong.find({
                tenCD: { $regex: search, $options: 'i' }
            });
        }

        return res.status(200).json(ketqua);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi tim kiem controller", error.message);
    }
};


export const truyenTheoND = async (req, res) => {
    try {
        const tacGiaIdTruyen = req.params.id;  

        const nguoidung = await Nguoidung.findById(tacGiaIdTruyen);
        if (!nguoidung) return res.status(404).json({ message: "Không tìm thấy người dùng" });

        const truyen = await Truyen.find({ tacGiaIdTruyen: tacGiaIdTruyen });
        if (!truyen || truyen.length === 0) {
            return res.status(200).json({ message: "Không tìm thấy truyện của người dùng" });
        }

        res.status(200).json(truyen);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTruyenTheoNguoidung controller", error);
    }
};

export const layLuotXemTheoTheLoai = async (req, res) => {
    try {
        // Tìm tất cả các truyện công khai
        const truyen = await Truyen.find({ trangThaiTruyen: "Công khai" })
        .populate('theLoaiIdTruyen'); // Liên kết với thể loại

        const luotXemTheoTheLoai = {};

        
        truyen.forEach(truyen => {
            const theLoai = truyen.theLoaiIdTruyen.tieuDeTheLoai; // Lấy tên thể loại
            if (!luotXemTheoTheLoai[theLoai]) {
                luotXemTheoTheLoai[theLoai] = 0;
            }
            luotXemTheoTheLoai[theLoai] += truyen.luotXemTruyen; // Cộng dồn lượt xem theo thể loại
        });

     
        const data = Object.keys(luotXemTheoTheLoai).map(theLoai => ({
            name: theLoai,
            luotXem: luotXemTheoTheLoai[theLoai]
        }));

        res.status(200).json(data);
    } catch (error) {
        console.error("Lỗi khi lấy lượt xem theo thể loại", error.message);
        res.status(500).json({ error: "Lỗi 500" });
    }
};
