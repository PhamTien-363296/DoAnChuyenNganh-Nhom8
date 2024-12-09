import Nguoidung from "../models/nguoidung.model.js";
import Congdong from "../models/congdong.model.js";
import {v2 as cloudinary} from 'cloudinary'
import moment from 'moment';

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
