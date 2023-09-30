const mongoose = require("mongoose")

const PostPhotoSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    data: Buffer,
  });

const PostSchema = new mongoose.Schema({
    name : {type : String, required : true},
    title : {type : String, required : true},
    photo : PostPhotoSchema,
    user :  {type : mongoose.ObjectId, ref : "User"}
})

const Post = mongoose.model("Post", PostSchema)
const PostPhoto = mongoose.model("PostPhoto", PostPhotoSchema)

module.exports = {Post, PostPhoto}