import express from "express"

import {  } from "../controllers/theloai.controller.js"
import { kiemTraDanhGia, layDanhGia, themDanhGia } from "../controllers/danhgia.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/kiemtra/:truyenId",protectRoute, kiemTraDanhGia)
router.get("/lay/:truyenId", layDanhGia)
router.post("/them",protectRoute, themDanhGia)


export default router