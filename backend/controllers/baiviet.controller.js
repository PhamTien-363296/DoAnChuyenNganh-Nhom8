import Baiviet from "../models/baiviet.model.js"

import {v2 as cloudinary} from 'cloudinary'
import Nguoidung from "../models/nguoidung.model.js";



export const layBaiViet = async (req, res) => {
    try {
        const nguoidung = req.nguoidung._id; 
        const baiviet = await Baiviet.find({ nguoiDungIdBV: nguoidung }).populate('nguoiDungIdBV', 'username');
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