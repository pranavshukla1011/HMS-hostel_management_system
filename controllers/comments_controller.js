const Comment = require('../models/comment');
const Complaint = require('../models/complaint');


module.exports.create = function(req, res){
    //if complaint with given id exists
    Complaint.findById(req.body.complaint, function(err, complaint){
        if(complaint){
            Comment.create({
                content: req.body.content,
                complaint: req.body.complaint,
                student: req.user._id
            },function(err, comment){
                //handle error
                complaint.comments.push(comment);//updating
                complaint.save();//whenever updating..we need to save the changes


                res.redirect('back');
            });
        }
    });
}