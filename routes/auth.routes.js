const Router = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const config = require("config")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/auth.middleware")
const router = new Router()

router.post('/registration',    
[
    check('email', "Incorrect email").isEmail(),
    check("password", "Password must be longer than 3 and shorter than 12").isLength({min:3, max:12})
],
   async (req, res)  => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty){
            return res.status(400).json({message : "Incorrect request", errors} )
        }
        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if(candidate) {
            res.status(400).json({ message : `User with this ${email} already exist `})
        }

        const hashPassword = await bcrypt.hash(password, 6)
        const user = new User({ email, password : hashPassword})
        await user.save()
        return res.status(200).json({ message : "User was created"})

    }catch(e){
    console.log(e)
    res.send({message : "Server error"})
    } 
})

router.post('/login', async (req, res) => {

    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})
   
        if(!user){
           res.status(400).json({message : `User with this email :'${email}' not found`})
        }
   
        const isPassValid =  bcrypt.compareSync(password, user.password)
        if(!isPassValid) {
           res.status(404).json({message : "Invalid password"})
        }
   
        const token = jwt.sign({ id : user.id}, config.get("secretKey"), {expiresIn : "1h"})
        return res.json({
           token, 
           user : {
               id : user.id,
               email, 
               diskSpace : user.diskSpace,
               usedSpace : user.usedSpace,
               avatar : user.avatar    
           }
        })
    }catch(e){
     console.log(e)
     res.send({message : "Server Error"})
    }

    
})

router.get('/auth', authMiddleware,
 async (req, res) => {
    try{
    const user = await User.findOne({_id : req.user.id})
    const token = jwt.sign({ id : user.id}, config.get("secretKey"), {expiresIn : "1h"})
    return res.json({
       token, 
       user : {
           id : user.id,
           email, 
           diskSpace : user.diskSpace,
           usedSpace : user.usedSpace,
           avatar : user.avatar    
       }
    })
     
     }catch(e){
        console.log(e)
        res.send({message : "Server error"})
     }
})

module.exports = router