import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetail, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUseChannelProfile, 
    getWatchHistory 
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },{
            name: "coverImage",
            maxCount: 1
        }
    ]), registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").post(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetail)
router.route("/avatar").patch(
    verifyJWT, 
    upload.single("avatar"), 
    updateUserAvatar
)
router.route("/cover-image").patch(
    verifyJWT, 
    upload.single("coverImage"), 
    updateUserCoverImage
)
router.route("/c/:username").get(verifyJWT, getUseChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)


export default router