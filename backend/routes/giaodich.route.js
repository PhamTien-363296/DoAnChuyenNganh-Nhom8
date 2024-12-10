import express from "express"

import { capNhatNapXu, layGiaoDichCuaNguoiDung, layGiaoDichThongBao, napXu } from "../controllers/giaodich.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.post("/them",protectRoute, napXu);
router.patch("/capnhat/napxu/:id",capNhatNapXu)
router.get("/lay/thongbao/:id",layGiaoDichThongBao)
router.get("/lay/tatca",protectRoute,layGiaoDichCuaNguoiDung)


export default router