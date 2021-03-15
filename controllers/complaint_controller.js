const Complaint = require('../models/complaint');


module.exports.complaint = async function(req, res){
   try {
    let complaints = await Complaint.find({})
    .populate('student')
    .populate({
        path: 'comments',
        populate:{
            path: 'student'
        }
    });
    return res.render('complaint1',{
        title: "Complaint Section",
        complaints : complaints
    });

   } catch (error) {
       console.log('Error', err);
       return;
   }
    

}
module.exports.create = async function(req, res){
    try {
        
      await Complaint.create({
        category: req.body.category,
        ctype: req.body.ctype,
        visibility: req.body.visibility,
        content: req.body.content,
        status: req.body.status,
        student: req.user._id,
         });

        return res.redirect('back');
  
    } catch (error) {
        return res.redirect('back');
        
    }
}