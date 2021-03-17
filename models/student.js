const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
        regNo:{
            type: String,
            required: true,
            unique:true

        },
        password: {
            type: String,
            required: true
        },
        hostel:{
            type: String,
            required: true
        },
        
        aadharNo:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        email2: {
            type: String,
            required: true,
            unique:true
        },
        name:{
            type: String,
            required : true
        },
        dob: {
            type: String,
            required : true
        },
        branch: {
            type: String,
            required : true
        },
        batch:{
            type: String,
            required : true
        },
        phone1: {
            type: String,
            required : true
        },
        fatherName: {
            type: String,
            required : true
        },
        motherName:{
            type: String,
            required : true
        },
        parentEmail: {
            type: String,
            required : true
        },
        parentNo: {
            type: String,
            required : true
        }
        
},{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
