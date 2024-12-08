import express from "express"

import { layLichSuDoc, layYeuThich, yeuThich } from "../controllers/nguoidung.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/lay/lichsu",protectRoute, layLichSuDoc);
router.patch("/capnhat/yeuthich/:id",protectRoute,yeuThich);
router.get("/lay/yeuthich",protectRoute, layYeuThich);


export default router