import express from "express"

import { layTatcaTheloai, themTheloai } from "../controllers/theloai.controller.js"

const router = express.Router()

router.get("/", layTatcaTheloai)
router.post("/them", themTheloai)

export default router