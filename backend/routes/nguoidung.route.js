import express from "express"

import { layLichSuDoc, layYeuThich, yeuThich,layNguoiDungTN, diemDanh ,layNguoiDungMoi,followNguoiDung,taoCongDong,thamGiaCongDong,layCongDongDaThamGia,layFollower,layThongBao, themLichSu,capNhat,layNguoiDungQuaId,coTheoDoiKhong} from "../controllers/nguoidung.controller.js"
import { isAdmin, protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/lay/lichsu",protectRoute, layLichSuDoc);
router.patch("/capnhat/yeuthich/:id",protectRoute,yeuThich);
router.get("/lay/yeuthich",protectRoute, layYeuThich);

router.get("/tatca", protectRoute, layNguoiDungTN);
router.post("/diemdanh", protectRoute, diemDanh);

router.post("/them/lichsu",protectRoute,themLichSu)

router.post("/tao/congdong",protectRoute,taoCongDong);
router.post("/thamgia/congdong/:idcongdong",protectRoute,thamGiaCongDong);
router.get("/lay/congdong/dathamgia", protectRoute, layCongDongDaThamGia);

router.get("/lay/moi", protectRoute,isAdmin,layNguoiDungMoi);
router.post("/follow/:id",protectRoute,followNguoiDung)
router.get("/lay/follower",protectRoute,layFollower)
router.get("/lay/thongbao",protectRoute,layThongBao)
router.patch("/update",protectRoute,capNhat)
router.get("/lay/:id",protectRoute,layNguoiDungQuaId)
router.get("/lay/cotheodoi/:id",protectRoute,coTheoDoiKhong)



export default router