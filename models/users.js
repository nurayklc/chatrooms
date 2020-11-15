const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');


const userSchema = mongoose.Schema({
    googleId:{
        type: String,
        unique: true
    },
    name: String,
    surname: String,
    profilePhotoUrl: String,
    created:{
        type:Date
    } 
});
userSchema.plugin(findOrCreate);
module.exports=mongoose.model('users', userSchema);