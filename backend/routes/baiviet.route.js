import express from "express"
import { layBaiViet, taoBaiViet,thichBaiViet,binhLuanBaiViet,xoaBaiViet,layHetBaiViet,taoBaiVietCongDong,layBaiVietCongDong} from "../controllers/baiviet.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/cuatoi",protectRoute, layBaiViet)
router.get("/tatca", layHetBaiViet)
router.post("/taobaiviet",protectRoute,taoBaiViet)
router.post("/like/:id",protectRoute,thichBaiViet)
router.post("/binhluan/:id",protectRoute,binhLuanBaiViet)
router.delete("/xoabaiviet/:id",protectRoute,xoaBaiViet)


router.post("/taobaiviet/congdong/:idcongdong",protectRoute,taoBaiVietCongDong)
router.get("/lay/congdong/:idcongdong",protectRoute, layBaiVietCongDong)

export default router