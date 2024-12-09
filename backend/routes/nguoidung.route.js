import express from "express"

import { layLichSuDoc, layYeuThich, yeuThich,layNguoiDungTN,taoCongDong,thamGiaCongDong, layCongDongDaThamGia,layNguoiDungMoi } from "../controllers/nguoidung.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/lay/lichsu",protectRoute, layLichSuDoc);
router.patch("/capnhat/yeuthich/:id",protectRoute,yeuThich);
router.get("/lay/yeuthich",protectRoute, layYeuThich);


router.get("/tatca", protectRoute, layNguoiDungTN);
router.post("/tao/congdong",protectRoute,taoCongDong);
router.post("/thamgia/congdong/:idcongdong",protectRoute,thamGiaCongDong);
router.get("/lay/congdong/dathamgia", protectRoute, layCongDongDaThamGia);

router.get("/lay/moi", protectRoute, layNguoiDungMoi);
export default router