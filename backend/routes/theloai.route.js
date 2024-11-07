import express from "express"

import { layTatcaTheloai, suaTheloai, themTheloai, xoaTheloai } from "../controllers/theloai.controller.js"

const router = express.Router()

router.get("/", layTatcaTheloai)
router.post("/them", themTheloai)
router.patch("/sua/:id", suaTheloai)
router.delete("/:id", xoaTheloai)

export default router