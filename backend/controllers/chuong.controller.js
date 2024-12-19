import Chuong from "../models/chuong.model.js";  
import Truyen from "../models/truyen.model.js";
import Nguoidung from "../models/nguoidung.model.js";
import Giaodich from "../models/giaodich.model.js"

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
    try {
        const chuong = await Chuong.findById(id).populate({
            path: "truyenIdChuong",
            populate: [
                {
                    path: "idCacChuong",
                    match: { trangThaiChuong: 'Công khai' }
                },
                {
                    path: "theLoaiIdTruyen",
                    ref: "Theloai"
                }
            ]
        });

        if (!chuong) {
            return res.status(404).json({ message: 'Chương không tồn tại' });
        }

        const idCacChuongIds = chuong.truyenIdChuong.idCacChuong.map(ch => ch._id.toString());

        res.status(200).json({
            chuong: chuong,
            idCacChuongIds: idCacChuongIds
        });
        } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTheoId controller", error);
    }
};

export const suaChuong = async (req, res) => {
    const { tenChuong, noiDungChuong,xuDeMoChuong,trangThaiChuong  } = req.body;

    try {
        let chuong = await Chuong.findById(req.params.id);

        if (!chuong) return res.status(404).json({ message: "Không tìm thấy chương." });

        if (tenChuong) chuong.tenChuong = tenChuong;
        if (noiDungChuong) chuong.noiDungChuong = noiDungChuong;
        if (xuDeMoChuong) chuong.xuDeMoChuong = xuDeMoChuong;
        if (trangThaiChuong) chuong.trangThaiChuong = trangThaiChuong;

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

export const themBinhLuan = async (req, res) => {
    const { chuongId, noiDungBinhLuanChuong } = req.body;
    const nguoiDungIdChuong = req.nguoidung._id;

    try {
        const chuong = await Chuong.findById(chuongId);
        if (!chuong) {
            return res.status(404).json({ error: "Không tìm thấy chương!" });
        }

        const newComment = {
            noiDungBinhLuanChuong,
            nguoiDungIdChuong,
        };

        chuong.binhLuanChuong.push(newComment);
        await chuong.save();

        res.status(201).json({ message: "Bình luận đã được thêm thành công!" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi server!" });
        console.error("Error in themBinhLuan controller:", error);
    }
};


export const layBinhLuan = async (req, res) => {
    const { chuongId } = req.params;

    try {
        const chuong = await Chuong.findById(chuongId)
            .populate("binhLuanChuong.nguoiDungIdChuong", "username anhDaiDienND")
            .select("binhLuanChuong");

        if (!chuong) {
            return res.status(404).json({ error: "Không tìm thấy chương!" });
        }

        res.status(200).json(chuong.binhLuanChuong);
    } catch (error) {
        res.status(500).json({ error: "Lỗi server!" });
        console.error("Error in layBinhLuan controller:", error);
    }
};


export const kiemTraTruyCapChuong = async (req, res) => {
    const idNguoiDung = req.nguoidung._id;
    const chuongId = req.params.chuongId;
    try {
        const chuong = await Chuong.findById(chuongId);
        if (!chuong) return res.status(404).json({ message: "Chương không tồn tại" });

        if (chuong.xuDeMoChuong === 0) {
            return res.status(200).json({ message: "Chương này miễn phí", truyCap: true });
        }
        
        const daMo = chuong.nguoiDungDaMoChuong.some((item) => item.nguoiDungId.toString() === idNguoiDung.toString());
        if (daMo) {
            return res.status(200).json({ message: "Bạn đã mở chương này", truyCap: true });
        }        

        return res.status(200).json({ message: "Bạn chưa mở khóa chương này", truyCap: false, xuChuong: chuong.xuDeMoChuong });
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi", error });
    }
};

export const moKhoaChuong = async (req, res) => {
    const idNguoiDung = req.nguoidung._id;
    const chuongId = req.params.chuongId;
    try {
        const chuong = await Chuong.findById(chuongId).populate("truyenIdChuong");
        if (!chuong) return res.status(404).json({ message: "Chương không tồn tại" });

        const nguoiDung = await Nguoidung.findById(idNguoiDung);
        if (!nguoiDung) return res.status(404).json({ message: "Người dùng không tồn tại" });

        if (nguoiDung.xuConLaiND < chuong.xuDeMoChuong) {
            return res.status(201).json({ message: "Bạn không đủ xu để mở chương này. Vui lòng nạp thêm!", xuConLai: nguoiDung.xuConLaiND, thongBao: true  });
        }

        let giaoDichMuaThanhCong = false; 
        let giaoDichHoaHongThanhCong = false; 

        try {
            const giaoDichMua = new Giaodich({
                soLuongXuGD: chuong.xuDeMoChuong,
                dongTien: "Trừ",
                noiDungGD: `Bạn đã mở khóa ${chuong.tenChuong} - ${chuong.truyenIdChuong.tenTruyen}`,
                loaiGiaoDich: "MuaChuong",
                nguoiDungIdGD: idNguoiDung,
            });
            console.log("Giao dịch mua:", giaoDichMua);
            await giaoDichMua.save();
            giaoDichMuaThanhCong = true; 
        } catch (error) {
            console.error("Lỗi khi lưu giao dịch mua:", error);
            return res.status(500).json({ message: "Lỗi khi lưu giao dịch mua", error });
        }
        
        if (giaoDichMuaThanhCong) {
            try {
                const giaoDichHoaHong = new Giaodich({
                    soLuongXuGD: chuong.xuDeMoChuong,
                    dongTien: "Cộng",
                    noiDungGD: `Bạn nhận được ${chuong.xuDeMoChuong} từ ${nguoiDung.username} mua ${chuong.tenChuong} - ${chuong.truyenIdChuong.tenTruyen}`,
                    loaiGiaoDich: "HoaHong",
                    nguoiDungIdGD: chuong.truyenIdChuong.tacGiaIdTruyen,
                });
                console.log("Giao dịch hoa hồng:", giaoDichHoaHong);
                await giaoDichHoaHong.save();
                giaoDichHoaHongThanhCong = true; 
            } catch (error) {
                console.error("Lỗi khi lưu giao dịch hoa hồng:", error);
                return res.status(500).json({ message: "Lỗi khi lưu giao dịch hoa hồng", error });
            }
        }

        if (giaoDichHoaHongThanhCong) {
            try {
                chuong.nguoiDungDaMoChuong.push({ nguoiDungId: idNguoiDung });
                await chuong.save();
            } catch (error) {
                console.error("Lỗi khi cập nhật chương:", error);
                return res.status(500).json({ message: "Lỗi khi cập nhật chương", error });
            }
        }

        console.log("Mở khóa chương thành công");
        res.status(200).json({ message: "Đã mở khóa chương thành công" });
    } catch (error) {
        console.error("Đã xảy ra lỗi trong quá trình xử lý:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi", error });
    }
};