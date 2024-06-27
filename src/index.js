import dotenv from "dotenv"
import { app } from "./app.js"
import connectionDB from "./db/index.js"

dotenv.config({
    path: "./.env"
})

connectionDB()
.then(() => {
    const server = process.env.PORT || 8000
    app.listen(server, () => {
        console.log("⚙️  Server is running at port: ", server)
    })
    app.on("error", (error)=> {
        console.log("Error: ", error)
        throw(error)
    })
})
.catch((error) => {
    console.log("MONGO DB connection failed: ", error)
})