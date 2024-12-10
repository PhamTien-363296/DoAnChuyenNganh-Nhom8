import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { themChuong, suaChuong, xoaChuong, layChuong, layTheoId, themBinhLuan, layBinhLuan, kiemTraTruyCapChuong, moKhoaChuong } from "../controllers/chuong.controller.js"
const router = express.Router()


router.post("/them",protectRoute,themChuong)
router.patch("/sua/:id",protectRoute,suaChuong)
router.delete("/:id",protectRoute,xoaChuong)
router.get("/lay/:id",protectRoute,layChuong)
router.get("/laytheoid/:id",protectRoute,layTheoId)

router.post("/them/binhluan",protectRoute,themBinhLuan)
router.get("/lay/binhluan/:chuongId",layBinhLuan)

router.get("/kiemtra/truycap/:chuongId",protectRoute,kiemTraTruyCapChuong)
router.post("/mua/:chuongId",protectRoute,moKhoaChuong)

export default router