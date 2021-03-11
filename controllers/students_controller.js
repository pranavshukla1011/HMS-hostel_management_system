const Student = require('../models/student');


module.exports.profile = function(req, res){
    return res.render('student_profile',{
        title:'Student Profile'
    })
}

//render the sign up page
module.exports.signUp = function(req, res){
    return res.render('student_sign_up',{
        title:"HMS | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req, res){
    return res.render('student_sign_in',{
        title:"HMS | Sign In"
    })
}
//get the sign up data
module.exports.create = function(req, res){
    //TODO Later
    if(req.body.password !== req.body.confirm_password){
        console.log("password unmactched");
        return res.redirect('back');
    }
    Student.findOne({regNo: req.body.regNo}, function(err, student){
        
        if(err){console.log('error in finding user in signing up');return}
        
        if(!student){ 
            //creating student in dB
            Student.create(req.body, function(err, student){
                if(err){console.log('error in creating user while signing up'); return}
                
                
                return res.redirect('/students/sign-in');
            })
        }else{
            console.log("Student Already Exist With this Reg No.");
            return res.redirect('back');
        }

    })
}

//sign-in and create a session for the user
module.exports.createSession = function(req, res){
    //TODO LATER
}