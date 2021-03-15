const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    ctype:{
        type: String,
        required: true
    },
    visibility:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 3
    },
    Pcount: {
        type: Number,
        default: 0
    },
    Acount: {
        type: Number,
        default: 0
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },// include the array of ids of all comments in this complaint schema itself
    comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
]

},{
    timestamps: true
});

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;