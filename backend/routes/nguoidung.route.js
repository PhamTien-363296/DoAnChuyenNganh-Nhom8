import express from "express"

import { layLichSuDoc, yeuThich } from "../controllers/nguoidung.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/lay/lichsu",protectRoute, layLichSuDoc);
router.patch("/capnhat/yeuthich/:id",protectRoute,yeuThich);

export default router