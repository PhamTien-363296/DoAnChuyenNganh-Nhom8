import express from "express"
import { layTatcaTruyen, layTruyenTheoTheloai, themTruyen } from "../controllers/truyen.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/", layTatcaTruyen)
router.get("/laytheotheloai/:id", layTruyenTheoTheloai)
router.post("/them",protectRoute,themTruyen)


export default router