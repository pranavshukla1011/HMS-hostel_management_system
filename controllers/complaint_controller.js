const Complaint = require('../models/complaint');


module.exports.complaint = function(req, res){
    //display all complaints
    // Complaint.find({}, function(err, complaints){
    //     return res.render('complaint',{
    //         title: "Complaint Section",
    //         complaints : complaints
    //     });
    // });

    //populate the student of each complaint
    Complaint.find({})
    .populate('student')
    .populate({
        path: 'comments',
        populate:{
            path: 'student'
        }
    })
    .exec(function(err, complaints){
        return res.render('complaint1',{
            title: "Complaint Section",
            complaints : complaints
        });
    });
    
}
module.exports.create = function(req, res){
      Complaint.create({
        category: req.body.category,
        ctype: req.body.ctype,
        visibility: req.body.visibility,
        content: req.body.content,
        status: req.body.status,
        student: req.user._id,
        
      }, function(err, complaint){
        if(err){console.log('error in creating a complaint'); return;}
        return res.redirect('back');
    });
}