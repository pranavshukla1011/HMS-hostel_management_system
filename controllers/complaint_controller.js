const Complaint = require('../models/complaint');
const Comment = require('../models/comment');


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

// module.exports.destroy = async function(req, res){
//     try {
//         let complaint = await  Complaint.findById(req.params.id);
        

//         if(complaint.student == req.student.id){
//             complaint.remove();

//             await Comment.deleteMany({post: req.params.id});
            
//             req.flash('success', 'Complaint deleted!');
//             return res.redirect('back');
        
//         }else{
//             req.flash('error','You cannot delete this complaint');
//             return res.redirect('back');
//         }
//     } catch (error) {
//         req.flash('error', err);
//         return res.redirect('back');
//     }
       
    

// }

module.exports.destroy = function(req, res){
    Complaint.findById(req.params.id, function(err, complaint){
        //.id means converting the object is into string
        if(complaint.student == req.user.id){
            complaint.remove();
            Comment.deleteMany({complaint: req.params.id}, function(err){
            req.flash('success', 'Complaint deleted!');

                return res.redirect('back');
            });
        }else{
            req.flash('error','You cannot delete this complaint');

            return res.redirect('back');
        }
        if(err){
            req.flash('error', err);
            console.log('error', err);
            return res.redirect('back');


        }
    });
} 