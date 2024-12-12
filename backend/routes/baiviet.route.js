import express from "express"
import { layBaiViet,layHetBaiViet, taoBaiViet,thichBaiViet,binhLuanBaiViet,xoaBaiViet,taoBaiVietCongDong,layBaiVietCongDong,layBaiVietCaNhan, layTongBaiVietTrongThang} from "../controllers/baiviet.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/cuatoi",protectRoute, layBaiViet)
router.get("/canhan/:id",protectRoute, layBaiVietCaNhan)
router.post("/taobaiviet",protectRoute,taoBaiViet)
router.post("/like/:id",protectRoute,thichBaiViet)
router.post("/binhluan/:id",protectRoute,binhLuanBaiViet)
router.delete("/xoabaiviet/:id",protectRoute,xoaBaiViet)
router.post("/taobaiviet/congdong/:idcongdong",protectRoute,taoBaiVietCongDong)
router.get("/lay/congdong/:idcongdong",protectRoute, layBaiVietCongDong)
router.get("/tatca", layHetBaiViet)
router.get("/tong", layTongBaiVietTrongThang)



export default router