const mongoose=require("mongoose")

const patientSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    PhoneNo:{
        type:Number,
        required:true
    }
})


const Patient=new mongoose.model("Patients",patientSchema)

module.exports=Patient;