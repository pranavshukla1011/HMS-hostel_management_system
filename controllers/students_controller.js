//const { student } = require('../config/mongoose');
const Student = require('../models/student');


module.exports.profile = function(req, res){
   
                return res.render('student_profile',{
                    title: "Student Profile",
                });
}

//render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/students/profile');
    }
    return res.render('student_sign_up_2',{
        title:"HMS | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/students/profile');
    }

    return res.render('student_sign_in',{
        title:"HMS | Sign In"
    })
}
//render student home page
module.exports.studentHome = function(req,res){
    return res.render('student_home_2',{
        title: "Student | Home"
    })
}
module.exports.messLeave = function(req,res){
    return res.render('student_mess_leave',{
        title: "Student | Mess Leave"
    })
}
module.exports.markHoliday = function(req,res){
    return res.render('student_mark_holiday',{
        title: "Student | Mark Holiday"
    })
}
//get the sign up data
module.exports.create = function(req, res){
    
    if(req.body.password !== req.body.confirm_password){
        console.log("password unmactched");
        return res.redirect('back');
    }
    Student.findOne({regNo: req.body.regNo}, function(err, student){
        
        if(err){console.log('error in finding user in signing up');return}
        
        if(!student){ 
            //creating student in dB
            Student.create(req.body, function(err, student){
                if(err){console.log('error in creating user while signing up |', err); return}
                
                
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
    //session is created in passport.js itself
    //user is signed in so we just need to redirect
    req.flash('success','Logged in Successfully');
    return res.redirect('/students/student-home');
}

module.exports.destroySession = function(req, res){
    req.logout();//this function is give to req by passport.js
    req.flash('success','You have Logged out!');
    return res.redirect('/');
}