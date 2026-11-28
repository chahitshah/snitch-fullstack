import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true,
        enum:['INR', 'USD', 'JPY', 'EUR', 'GBP']
    },
    stock:{
        type:Number,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    images:[{
        url:{type:String,required:true}
    }]

},{timestamps:true})

const productModel = mongoose.model("Product",productSchema)

export default productModel