import { ApiError } from "../utils/apiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // const token = req.cookies?.accessToken

        const token = req.cookies.accessToken
        
        // console.log("this is token: ", token);
        
        if (!token) {
            throw new ApiError(404, "Unauthorized request")
        }
        
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // console.log("this is dtoken: ", decodeToken);
        
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")

        console.log(user)
    
        if (!user) {
            throw new ApiError(404, "Invalid Access Token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }

 })