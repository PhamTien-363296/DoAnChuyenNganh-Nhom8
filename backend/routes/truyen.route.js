import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import {themTruyen } from '../controllers/truyen.controller.js'
const router = express.Router()

router.post("/them",protectRoute,themTruyen)


export default router