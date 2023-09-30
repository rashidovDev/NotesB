const {model, Schema, ObjectId} = require("mongoose")

const Just = new Schema({
    name : String,
    photoUrl : String
})

module.exports = model("Just", Just)