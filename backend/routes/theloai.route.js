import express from "express"

import { layTatcaTheloai, suaTheloai, themTheloai, xoaTheloai } from "../controllers/theloai.controller.js"
import { isAdmin, protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/", layTatcaTheloai)
router.post("/them",protectRoute,isAdmin,themTheloai)
router.patch("/sua/:id",protectRoute,isAdmin,suaTheloai)
router.delete("/:id",protectRoute,isAdmin,xoaTheloai)

export default router