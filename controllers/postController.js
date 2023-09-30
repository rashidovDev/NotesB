const User = require("../models/User")
const Post = require("../models/Posts")
const config = require("config")
const Just = require("../models/Just")
const { v4: uuidv4 } = require('uuid');

// const postCreate = async (req, res) => {
//     try{
//         const file = req.files.file
//         const fileName = uuidv4() + ".jpg"
//         file.mv(config.get("staticPath") + "\\", fileName)
//         const {name,title} = req.body
//         const post = new Post({name, title, photo : fileName, user : req.user.id})
//         await post.save()
//         return res.json(file) 
//     }catch(e){
//     console.log(e)
//     return res.status(400).json(e)
//     } 
// }

const getFiles = async (req, res) => {
    try{
        const post = await Post.find({user : req.user.id})
        res.json(post)
    }catch(e){
    console.error(e)
    res.status(500).json({message : "Can not get posts"})
    }
}

const avatar = async (req, res) => {
    try{
        const file = req.files.file 
        const user = await User.findById(req.user.id)
        const avatarName = uuidv4() + ".jpg"
        file.mv(config.get("staticPath") + "\\" + avatarName)
        user.avatar = avatarName
        await user.save()
        return res.json({message : "Avatar was uploaded succesfully"})
    }catch(e){
    console.log(e) 
    return res.status(400).json({message : "Upload avatar error"})
    }
}

const justUploadPhoto = async (req, res) => {
    try{
        const file = req.files.file
        const fileName = uuidv4() + ".jpg"
        file.mv(config.get("staticPath") + "\\" + fileName)
        const {name} = req.body
        const just = new Just({name,  photoUrl : fileName})
        await just.save()
        return res.json(just)
    }catch(e){
        console.error(e)
        return res.status(400).json({ message : "Upload photo error"})
    }
}

module.exports = { getFiles, avatar, justUploadPhoto}