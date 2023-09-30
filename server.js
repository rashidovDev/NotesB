const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const app = express()
const PORT = config.get("PORT")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const corsOrigins = require("./middleware/cors.middleware")
 
app.use(fileUpload({}))
app.use(cors(corsOrigins))
app.use(express.json())
app.use(express.static("static"))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
    try{
       await mongoose.connect(config.get("DB_URL"))

       app.listen(PORT, console.log(`Server is running on Port ${PORT}`))
    }catch(e){
        console.error(e)
    }
}

start()

