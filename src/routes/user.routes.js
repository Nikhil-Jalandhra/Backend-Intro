import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.jsff";

const router = Router()

router.route("/register").post(registerUser)

export default router