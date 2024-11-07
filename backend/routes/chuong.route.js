import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { themChuong, suaChuong, xoaChuong, layChuong } from "../controllers/chuong.controller.js"
const router = express.Router()


router.post("/them",protectRoute,themChuong)
router.patch("/sua/:id",protectRoute,suaChuong)
router.delete("/:id",protectRoute,xoaChuong)
router.get("/:id",layChuong)

export default router