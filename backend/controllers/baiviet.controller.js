import Baiviet from "../models/baiviet.model.js"
import Congdong from "../models/congdong.model.js";
import {v2 as cloudinary} from 'cloudinary'
import Nguoidung from "../models/nguoidung.model.js";
import moment from 'moment';



export const layBaiViet = async (req, res) => {
    try {
        const nguoidung = req.nguoidung._id; 
        const baiviet = await Baiviet.find({ nguoiDungIdBV: nguoidung }).populate('nguoiDungIdBV', 'username anhDaiDienND');
        res.status(200).json(baiviet);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.error("Các bài viết", error);
    }
};



export const taoBaiViet =async(req,res)=>{
    try{
        const { noiDungBV } =req.body
        let { hinhAnhBV }= req.body
        const idnguoidung = req.nguoidung._id.toString()

        const nguoidung = await Nguoidung.findById(idnguoidung)
        if(!nguoidung) return res.status(404).json({message: "Không tìm thấy người dùng"})
        if(!noiDungBV && !hinhAnhBV){
            return res.status(400).json({error:"Bài viết phải có nội dung hoặc hình ảnh"})
        }
        if(hinhAnhBV){
            const uploadedResponse= await cloudinary.uploader.upload(hinhAnhBV)
            hinhAnhBV = uploadedResponse.secure_url
        }

        const baiVietMoi = new Baiviet({
            nguoiDungIdBV:idnguoidung,
            noiDungBV,
            hinhAnhBV

        })

        await baiVietMoi.save()
        res.status(201).json(baiVietMoi)
    } catch(error){
        res.status(500).json({error: "Lỗi 500"})
        console.log("Lỗi taoBaiViet controller",error)

    }
}


export const thichBaiViet = async (req, res) => {
	try {
		const idnguoidung = req.nguoidung._id;
		const { id: idBV } = req.params;

		const baiviet = await Baiviet.findById(idBV);

		if (!baiviet) {
			return res.status(404).json({ error: "Không tìm thấy bài viết" });
		}

		const nguoiDaThichBV = baiviet.cacluotThich.includes(idnguoidung);

		if (nguoiDaThichBV) {
			await Baiviet.updateOne({ _id: idBV }, { $pull: { cacluotThich: idnguoidung } });
			await Nguoidung.updateOne({ _id: idnguoidung }, { $pull: { yeuThichBV: idBV } });


            const capNhatLuotThich = baiviet.cacluotThich.filter((id)=>id.toString() !== idnguoidung.toString())
            res.status(200).json(capNhatLuotThich)
		} else {
			// Like post
			baiviet.cacluotThich.push(idnguoidung);
			await Nguoidung.updateOne({ _id: idnguoidung }, { $push: { yeuThichBV: idBV } });
			await baiviet.save();

            const capNhatLuotThich = baiviet.yeuThichBV
		    res.status(200).json(capNhatLuotThich)
		}
	} catch (error) {
		console.log("loi thichBaiViet controller: ", error);
		res.status(500).json({ error: "Lỗi 500" });
	}
};



export const binhLuanBaiViet =async(req,res)=>{
    try{
        const {text} = req.body
        const idbaiviet = req.params.id
        const idnguoidung = req.nguoidung._id

        if(!text){
            return res.status(400).json({error:"Cần nhập bình luận"})

        }
        const baiviet = await Baiviet.findById(idbaiviet)

        if(!baiviet){
            return res.status(404).json({error: "Không tìm thấy bài viết"})
        }

        const binhluan ={nguoidung: idnguoidung, text}

        baiviet.binhLuanBV.push(binhluan)
        await baiviet.save()

        const populatedBaiviet = await Baiviet.findById(idbaiviet)
        .populate({
            path: 'binhLuanBV',
            populate: {
                path: 'nguoidung', 
                select: 'username'  
            }
        });

        res.status(200).json(populatedBaiviet);

    } catch(error){
        res.status(500).json({error: "Lỗi 500"})
        console.log({ error: error.message || "Lỗi không xác định" })

    }
}


export const xoaBaiViet =async(req,res)=>{
    try{
        const baiviet = await Baiviet.findById(req.params.id)
        if(!baiviet){
            return res.status(404).json({error: "Không tìm thấy bài viết"})
        }

        if(baiviet.nguoiDungIdBV.toString() !== req.nguoidung._id.toString()){
            return res.status(401).json({error:"Bạn không có quyền xóa bài viết này"})
        }

        if(baiviet.hinhAnhBV){
            const idHinhAnhBV = baiviet.hinhAnhBV.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(idHinhAnhBV)
        }

        await Baiviet.findByIdAndDelete(req.params.id)

        res.status(200).json({message:"Xóa bài viêt thành công"})
    } catch(error){
        res.status(500).json({error: "Lỗi 500"})
        console.log("Lỗi xóa bài viết controller",error)

    }
}


export const taoBaiVietCongDong = async (req, res) => {
    try {
        const { noiDungBV, hinhAnhBV } = req.body; 
        const { idcongdong } = req.params; 
        const idnguoidung = req.nguoidung._id.toString(); 

        const nguoidung = await Nguoidung.findById(idnguoidung);
        if (!nguoidung) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        
        const congdong = await Congdong.findById(idcongdong);
        if (!congdong) {
            return res.status(404).json({ message: "Không tìm thấy cộng đồng" });
        }

        
        if (!congdong.thanhVienCD.includes(idnguoidung)) {
            return res.status(403).json({ message: "Bạn không phải thành viên của cộng đồng này" });
        }


        if (!noiDungBV && !hinhAnhBV) {
            return res.status(400).json({ error: "Bài viết phải có nội dung hoặc hình ảnh" });
        }


        let hinhAnhUrl = null;
        if (hinhAnhBV) {
            const uploadedResponse = await cloudinary.uploader.upload(hinhAnhBV);
            hinhAnhUrl = uploadedResponse.secure_url;
        }


        const baiVietMoi = new Baiviet({
            nguoiDungIdBV: idnguoidung,
            thuocCD: idcongdong,
            noiDungBV,
            hinhAnhBV: hinhAnhUrl,
        });

        
        const baivietdaluu = await baiVietMoi.save();

      
        congdong.cacBaiViet = congdong.cacBaiViet || [];
        congdong.cacBaiViet.push(baivietdaluu._id);
        await congdong.save();

       
        nguoidung.cacBaiVietND = nguoidung.cacBaiVietND || [];
        nguoidung.cacBaiVietND.push(baivietdaluu._id);
        await nguoidung.save();

        res.status(201).json({ message: "Tạo bài viết cộng thành công!", baivietcongdong: baivietdaluu });
    } catch (error) {
        console.error("Lỗi taoBaiVietCongDong controller", error);
        res.status(500).json({ error: "Lỗi 500" });
    }
};

export const layBaiVietCongDong = async (req, res) => {
    try {
        const { idcongdong} = req.params; 

        
        const congdong = await Congdong.findById(idcongdong);
        if (!congdong) {
            return res.status(404).json({ message: "Không tìm thấy cộng đồng" });
        }

       
        const baivietcongdong = await Baiviet.find({ thuocCD: idcongdong })
            .populate("nguoiDungIdBV", "username anhDaiDienND") 
            .populate('thuocCD', 'tenCD')
            .sort({ createdAt: -1 }); 

        
        if (!baivietcongdong || baivietcongdong.length === 0) {
            return res.status(200).json({ message: "Cộng đồng này chưa có bài viết nào." });
        }

        res.status(200).json(baivietcongdong);
    } catch (error) {
        console.error("Lỗi layBaiVietCongDong controller", error);
        res.status(500).json({ error: "Lỗi 500" });
    }
};


export const layHetBaiViet = async (req, res) => {
    try {
        const baiviet = await Baiviet.find()
            .populate('nguoiDungIdBV', 'username anhDaiDienND') // Lấy thông tin người dùng (username)
            .populate('thuocCD', 'tenCD')
            .sort({ createdAt: -1 }); // Sắp xếp theo ngày tạo mới nhất

        if (!baiviet || baiviet.length === 0) {
            return res.status(404).json({ message: "Không có bài viết nào." });
        }

        res.status(200).json(baiviet);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500: Không thể lấy danh sách bài viết." });
        console.error("Lỗi trong phương thức layHetBaiViet:", error);
    }
};

export const layBaiVietCaNhan = async (req, res) => {
    try {
     
        const { id } = req.params;

        
        const baiviet = await Baiviet.find({ nguoiDungIdBV: id })
            .populate('nguoiDungIdBV', 'username anhDaiDienND')  
            .sort({ createdAt: -1 });  

        if (!baiviet || baiviet.length === 0) {
            return res.status(404).json({ message: "Không có bài viết của người dùng này." });
        }

       
        res.status(200).json(baiviet);
    } catch (error) {
        console.error("Lỗi trong phương thức layBaiVietCaNhan:", error);
        res.status(500).json({ error: "Lỗi 500: Không thể lấy bài viết." });
    }
};




export const layTongBaiVietTrongThang = async (req, res) => {
    try {
        // Lấy đầu tháng và cuối tháng (timestamp)
        const dauThang = moment().startOf('month').toDate(); // Ngày đầu tháng
        const cuoiThang = moment().endOf('month').toDate();   // Ngày cuối tháng

        // Đếm số bài viết trong khoảng này
        const tongSoBaiViet = await Baiviet.countDocuments({
            createdAt: {
                $gte: dauThang,
                $lte: cuoiThang,
            },
        });

        res.status(200).json({ tongSoBaiViet });
    } catch (error) {
        console.error("Lỗi trong phương thức layTongBaiVietTrongThang:", error);
        res.status(500).json({ error: "Lỗi 500: Không thể lấy tổng số bài viết trong tháng." });
    }
};

