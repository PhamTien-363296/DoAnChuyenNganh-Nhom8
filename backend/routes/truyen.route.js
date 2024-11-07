import express from "express"

import { layTatcaTruyen, layTruyenTheoTheloai } from "../controllers/truyen.controller.js"

const router = express.Router()

router.get("/", layTatcaTruyen)
router.get("/laytheotheloai/:id", layTruyenTheoTheloai)

export default router