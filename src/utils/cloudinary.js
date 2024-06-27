import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: 'ddzc8fsfa', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: 'auto'})
            console.log("File is uploaded on cloudnairy", response.url)
            return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}