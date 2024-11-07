import express from "express"
import { layTatcaTruyen, layTruyenTheoNguoidung, layTruyenTheoTheloai, themTruyen} from "../controllers/truyen.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/", layTatcaTruyen)
router.get("/laytheotheloai/:id", layTruyenTheoTheloai)
router.get("/laytheonguoidung", protectRoute, layTruyenTheoNguoidung)

router.post("/them",protectRoute,themTruyen)


export default router