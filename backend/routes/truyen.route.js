import express from "express"
import {goiYTimKiem, timKiem, layTatcaTruyen, layTruyenTheoNguoidung, layTruyenTheoTheloai, themTruyen, suaTruyen, layTheoId, xoaTruyen, capNhatLuotXem, layTruyenTrending, layTruyenHoanThanh, layTruyenHot,truyenTheoND} from "../controllers/truyen.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/", layTatcaTruyen)
router.get("/laytheoid/:id",protectRoute, layTheoId)
router.get("/laytheotheloai/:id", layTruyenTheoTheloai)
router.get("/laytheonguoidung", protectRoute, layTruyenTheoNguoidung)

router.post("/them",protectRoute,themTruyen)
router.patch("/sua/:id",protectRoute,suaTruyen)

router.delete("/:id", xoaTruyen)

router.patch("/capnhat/luotxem/:id",capNhatLuotXem)

router.get("/lay/trangchu/trending",protectRoute,layTruyenTrending)
router.get("/lay/trangchu/hoanthanh",layTruyenHoanThanh)
router.get("/lay/trangchu/hot",layTruyenHot)

router.get("/search/goiy",goiYTimKiem)
router.get("/search/timkiem",timKiem)
router.get("/truyentheonguoidung/:id", protectRoute, truyenTheoND)
export default router