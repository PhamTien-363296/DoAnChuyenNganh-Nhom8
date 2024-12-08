import express from "express"
import { layBaiViet, taoBaiViet,thichBaiViet,binhLuanBaiViet,xoaBaiViet} from "../controllers/baiviet.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/cuatoi",protectRoute, layBaiViet)
router.post("/taobaiviet",protectRoute,taoBaiViet)
router.post("/like/:id",protectRoute,thichBaiViet)
router.post("/binhluan/:id",protectRoute,binhLuanBaiViet)
router.delete("/xoabaiviet/:id",protectRoute,xoaBaiViet)




export default router