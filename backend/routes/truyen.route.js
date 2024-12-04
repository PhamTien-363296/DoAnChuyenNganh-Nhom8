import express from "express"
import { layTatcaTruyen, layTruyenTheoNguoidung, layTruyenTheoTheloai, themTruyen, suaTruyen, layTheoId, xoaTruyen, capNhatLuotXem, layTruyenTrangChu} from "../controllers/truyen.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/", layTatcaTruyen)
router.get("/laytheoid/:id", layTheoId)
router.get("/laytheotheloai/:id", layTruyenTheoTheloai)
router.get("/laytheonguoidung", protectRoute, layTruyenTheoNguoidung)

router.post("/them",protectRoute,themTruyen)
router.patch("/sua/:id",protectRoute,suaTruyen)

router.delete("/:id", xoaTruyen)

router.patch("/capnhat/luotxem/:id",capNhatLuotXem)
router.get("/lay/trangchu",layTruyenTrangChu)

export default router