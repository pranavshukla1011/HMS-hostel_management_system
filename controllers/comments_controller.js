const Comment = require('../models/comment');
const Complaint = require('../models/complaint');


module.exports.create = async function(req, res){
    try {
        //if complaint with given id exists
    let complaint = await Complaint.findById(req.body.complaint);
    
    if(complaint){
        let comments = await Comment.create({
            content: req.body.content,
            complaint: req.body.complaint,
            student: req.user._id
        });
    
        //handle error
        complaint.comments.push(comment);//updating
        complaint.save();//whenever updating..we need to save the changes
        return res.redirect('back');
    
    }
        
    } catch (error) {
        return res.redirect('back');

    }
    
    
}