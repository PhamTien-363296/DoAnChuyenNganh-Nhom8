import express from "express"

import { layLichSuDoc } from "../controllers/nguoidung.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/lay/lichsu",protectRoute, layLichSuDoc);

export default router