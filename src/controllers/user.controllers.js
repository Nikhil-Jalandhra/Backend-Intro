import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrors.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    const {fullName, email, userName, password} = req.body;

    if (
        [fullName, email, userName, password].some((fields)=>
        fields?.trim() === "")
    ) {
        throw new ApiError(400, "ALL fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ userName },{ email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or userName is already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    
    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required")
    }

    let coverLocalPath;

    if(req.files && Array.isArray(req.files.coverImage) 
        && req.files.coverImage.length > 0){
    coverLocalPath = req.files?.coverImage[0]?.path;
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = uploadOnCloudinary(coverLocalPath);

    
    if (!avatar) {
        throw new ApiError(400,"Avatar file is required")
    }

    const newUser = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase(),
    })
    
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )

})

export { registerUser }