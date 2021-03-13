const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
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