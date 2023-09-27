const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const app = express()
const PORT = config.get("PORT")
const authRouter = require("./routes/auth.routes")

app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
    try{
       await mongoose.connect(config.get("DB_URL"))

       app.listen(PORT, console.log(`Server is running on Port ${PORT}`))
    }catch(e){
        console.error(e)
    }
}

start()

