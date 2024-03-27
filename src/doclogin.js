const mongoose=require("mongoose")


const DocLogInSchema=new   mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }
})


const doc=new mongoose.model("collection2",DocLogInSchema)

module.exports=doc