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

        req.flash('success','Complaint posted!'); 
        return res.redirect('back');
  
    } catch (error) {
        req.flash('error', err);
        return res.redirect('back');
        
    }
}