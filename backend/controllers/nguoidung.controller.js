import Nguoidung from "../models/nguoidung.model.js";
import moment from "moment";
import Giaodich from "../models/giaodich.model.js"
import Congdong from "../models/congdong.model.js";
import Thongbao from "../models/thongbao.model.js";
import {v2 as cloudinary} from 'cloudinary'
import Truyen from '../models/truyen.model.js';
import Chuong from '../models/chuong.model.js';

export const themLichSu = async (req, res) => {
    const idND = req.nguoidung._id;
    const { idTruyen, idChuong } = req.body;

    try {
        const truyen = await Truyen.findById(idTruyen);
        if (!truyen) {
            return res.status(404).json({ message: 'Truyện không tồn tại' });
        }

        const chuong = await Chuong.findById(idChuong);
        if (!chuong) {
            return res.status(404).json({ message: 'Chương không tồn tại' });
        }

        const nguoiDung = await Nguoidung.findById(idND);
        if (!nguoiDung) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const lichSuND = nguoiDung.lichSuND || [];

        const truyenIndex = lichSuND.findIndex(item => item.truyenId.toString() === idTruyen);

        if (truyenIndex !== -1) {
            const danhSachChuong = lichSuND[truyenIndex].danhSachChuong || [];
            const chuongIndex = danhSachChuong.findIndex(item => item.chuongId.toString() === idChuong);

            if (chuongIndex !== -1) {
                danhSachChuong[chuongIndex].thoiGianDocChuong = new Date();
            } else {
                danhSachChuong.push({
                    chuongId: idChuong,
                    thoiGianDocChuong: new Date(),
                });
            }

            lichSuND[truyenIndex].danhSachChuong = danhSachChuong;
            lichSuND[truyenIndex].thoiGianDoc = new Date();
        } else {
            lichSuND.push({
                truyenId: idTruyen,
                danhSachChuong: [
                    {
                        chuongId: idChuong,
                        thoiGianDocChuong: new Date(),
                    },
                ],
                thoiGianDoc: new Date(),
            });
        }

        nguoiDung.lichSuND = lichSuND;
        await nguoiDung.save();

        res.status(200).json({ message: 'Cập nhật lịch sử đọc thành công', lichSuND });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi', error });
    }
};

export const layLichSuDoc = async (req, res) => {
    const idND = req.nguoidung._id;

    try {
        const nguoiDung = await Nguoidung.findById(idND)
            .populate('lichSuND.truyenId')
            .populate('lichSuND.danhSachChuong.chuongId');

        if (!nguoiDung) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        const result = nguoiDung.lichSuND.map(item => {
            const truyen = item.truyenId;
            return item.danhSachChuong.map(chuongItem => {
                const chuong = chuongItem.chuongId;

                if (truyen && chuong) {
                    return {
                        truyen: truyen,
                        chuong: chuong,
                        thoiGianDoc: chuongItem.thoiGianDocChuong,
                    };
                }
            });
        }).flat();

        const sapXep = result.sort((a, b) => new Date(b.thoiGianDoc) - new Date(a.thoiGianDoc));

        res.status(200).json(sapXep);
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

export const diemDanh = async (req, res) => {
	try {
		const idNguoiDung = req.nguoidung._id;

		const nguoidung = await Nguoidung.findById(idNguoiDung);

		if (!nguoidung) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        const today = moment().startOf("day");
        const lanDiemDanh = nguoidung.diemDanh ? moment(nguoidung.diemDanh).startOf("day") : null;

        if (lanDiemDanh && today.isSame(lanDiemDanh)) {
            return res.status(400).json({ message: "Bạn đã điểm danh hôm nay rồi." });
        }

        const dayOfWeek = today.day();
        let xu = 0;
        switch (dayOfWeek) {
            case 1:
            case 2:
            case 3:
            case 4:
                xu = 10;
                break;
            case 5:
                xu = 30;
                break;
            case 6:
            case 0:
                xu = 40;
                break;
            default:
                xu = 0;
        }

        nguoidung.diemDanh = today.toDate();

        await nguoidung.save();

        const giaoDichMoi = new Giaodich({
            soLuongXuGD: xu,
            dongTien: 'Cộng',
            noiDungGD: `Bạn đã điểm danh ngày ${today.format("DD/MM/YYYY")}`,
            loaiGiaoDich: 'DiemDanh',
            nguoiDungIdGD: idNguoiDung,
        });

        await giaoDichMoi.save();

        return res.status(200).json({
            message: `Điểm danh thành công! Bạn nhận được ${xu} xu.`,
            xuConLaiND: nguoidung.xuConLaiND,
        });
	} catch (error) {
		console.error("Lỗi điểm danh controller: ", error.message);
		res.status(500).json({ error: "Lỗi 500" });
	}
};





export const taoCongDong = async (req, res) => {
    try {
        const { tenCD, moTaCD } = req.body;
        let { anhCD }= req.body
        const idnguoidung = req.nguoidung._id.toString()


        if (!tenCD) {
            return res.status(400).json({ message: "Cộng đồng cần được đặt tên" });
        }


        if(anhCD){
            const uploadedResponse= await cloudinary.uploader.upload(anhCD)
            anhCD = uploadedResponse.secure_url
        }
        

        const nguoidung = await Nguoidung.findById(idnguoidung)
        if(!nguoidung) return res.status(404).json({message: "Không tìm thấy người dùng"})


        const congDongMoi = new Congdong({
            tenCD,
            moTaCD,
            anhCD,
            thanhVienCD: nguoidung._id,  
            nguoiDungIdCD:idnguoidung,
        });


        await congDongMoi.save();

        return res.status(201).json({ message: "Tạo cộng đồng thành công", congdong: congDongMoi });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi tạo cộng đồng" });
    }
};

export const thamGiaCongDong = async (req, res) => {
    try {
        const { idcongdong } = req.params; 
        const idnguoidung = req.nguoidung._id.toString(); 

       
        const congdong = await Congdong.findById(idcongdong);
        if (!congdong) {
            return res.status(404).json({ message: "Không tìm thấy cộng đồng" });
        }


        if (congdong.thanhVienCD.includes(idnguoidung)) {
            congdong.thanhVienCD = congdong.thanhVienCD.filter(id => id.toString() !== idnguoidung);
            await congdong.save();
            return res.status(200).json({ message: "Đã bỏ tham gia cộng đồng", congdong: congdong });
        } else {
            congdong.thanhVienCD.push(idnguoidung);
            await congdong.save();
            return res.status(200).json({ message: "Tham gia cộng đồng thành công", congdong: congdong });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi tham gia hoặc bỏ tham gia cộng đồng" });
    }
};

export const layCongDongDaThamGia = async (req, res) => {
    try {
        const idnguoidung = req.nguoidung._id.toString();


        const congdongthamgia = await Congdong.find({ thanhVienCD: idnguoidung })
            .populate('thanhVienCD', 'username email') 
            .populate('nguoiDungIdCD', 'username email'); 

        if (congdongthamgia.length === 0) {
            return res.status(404).json({ message: "Bạn chưa tham gia cộng đồng nào" });
        }

        return res.status(200).json({ message: "Lấy danh sách cộng đồng đã tham gia thành công", congdong: congdongthamgia });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi lấy danh sách cộng đồng đã tham gia" });
    }
};





export const layNguoiDungMoi = async (req, res) => {
    try {
      
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();

      
        const nguoiDungMoi = await Nguoidung.countDocuments({
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

     
        return res.status(200).json({ nguoimoi: nguoiDungMoi });
    } catch (error) {
        console.error("Lỗi khi lấy số lượng người dùng mới:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi lấy số lượng người dùng mới" });
    }
};


export const followNguoiDung = async (req, res) => {
	try {
		const { id } = req.params;

		const nguoidungcapnhat = await Nguoidung.findById(id);
		const nguoidunghientai = await Nguoidung.findById(req.nguoidung._id);

		if (id === req.nguoidung._id.toString()) {
			return res.status(400).json({ error: "Bạn không thể follow chính mình" });
		}

		if (!nguoidungcapnhat || !nguoidunghientai) return res.status(400).json({ error: "Không tìm thấy người dùng" });

		const dangtheodoi = nguoidunghientai.theoDoiND.includes(id);

		if (dangtheodoi) {
			await Nguoidung.findByIdAndUpdate(id, { $pull: { nguoiTheoDoiND: req.nguoidung._id } });
			await Nguoidung.findByIdAndUpdate(req.nguoidung._id, { $pull: { theoDoiND: id } });

			res.status(200).json({ message: "Bỏ follow người dùng thành công" });
		} else {
			await Nguoidung.findByIdAndUpdate(id, { $push: { nguoiTheoDoiND: req.nguoidung._id } });
			await Nguoidung.findByIdAndUpdate(req.nguoidung._id, { $push: { theoDoiND: id } });

            const thongBaoMoi = new Thongbao({
				loaiThongBao: "follow",
				tuNguoiDung: req.nguoidung._id,
				denNguoiDung: nguoidungcapnhat._id,
                noiDungTB: `${nguoidunghientai.username} vừa follow bạn`,
			});

			await thongBaoMoi.save();

			res.status(200).json({ message: "Follow người dùng thành công" });
		}
	} catch (error) {
		console.log("Lỗi followNguoiDung controller ", error.message);
		res.status(500).json({ error: error.message });
	}
}

export const layFollower = async (req, res) => {
    try {
        
        const idnguoidung = req.nguoidung._id;

        
        const nguoidung = await Nguoidung.findById(idnguoidung).populate('theoDoiND', 'username email');

        if (!nguoidung) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }


        const followers = nguoidung.theoDoiND;

        return res.status(200).json({
            followers
        });
    } catch (error) {
        console.error("Lỗi layFollower controller:", error);
        return res.status(500).json({ message: "Lỗi 500" });
    }
};


export const layThongBao = async (req, res) => {
    try {
        const idnguoidung = req.nguoidung._id;

       
        const thongBao = await Thongbao.find({ denNguoiDung: idnguoidung })
            .populate('tuNguoiDung', 'username')  
            .sort({ createdAt: -1 });  

        if (!thongBao || thongBao.length === 0) {
            return res.status(404).json({ message: 'Không có thông báo mới' });
        }

        return res.status(200).json({ thongBao });
    } catch (error) {
        console.error("Lỗi layThongBao controller:", error.message);
        return res.status(500).json({ error: "Lỗi 500" });
    }
};
