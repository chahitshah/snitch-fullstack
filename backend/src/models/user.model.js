import mongoose from "mongoose"

import bycrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:function(){
            return !this.googleId
        },
        select:false
    },
    fullname:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:function()
        {
            return !this.googleId
        }
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer"
    },
    googleId:{
        type:String,
    }
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return

    const hashedPassword = await bycrypt.hash(this.password,10)
    this.password=hashedPassword
})

userSchema.methods.comparePassword = async function(password){
    return await bycrypt.compare(password,this.password)
}

const userModel = mongoose.model("User",userSchema)

export default userModel
