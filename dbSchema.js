const mongoose = require('mongoose');
const validator = require('validator');

var mentorSchema = new mongoose.Schema({
    firstName:{type:'string',required:true},
    lastName:{type:'string',required:true},
    mobile:{type:"Number",required:true,default:'000-000-0000'},
    email:{type:'string',required:true,lowecase:true,validate:(value)=>{
        return validator.isEmail(value)
    }},
    men_id:{type:'string',default:null},
    createdAt:{type:Date,default:Date.now()}
})

var studentSchema = new mongoose.Schema({
    firstName:{type:'string',required:true},
    lastName:{type:'string',required:true},
    mobile:{type:"Number",required:true,default:'000-000-0000'},
    email:{type:'string',required:true,lowecase:true,validate:(value)=>{
        return validator.isEmail(value)
    }},
    location:{type:'string',default:null},
    mentor_id:{type:'string',default:null},
    createdAt:{type:Date,default:Date.now()}
})

var mentorModel = mongoose.model('mentor_student', mentorSchema);
var studentModel = mongoose.model('student_mentor', studentSchema);

module.exports={mentorModel,studentModel,mongoose}