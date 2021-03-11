const Student = require('../models/student');


module.exports.profile = function(req, res){
    if(req.cookies.student_id){
        Student.findById(req.cookies.student_id, function(err, student){
            if(student){
                return res.render('student_profile',{
                    title: "Student Profile",
                    student: student
                });
            }
            return res.redirect('/students/sign-in');
        });
    }else{
        return res.redirect('/students/sign-in');
    }
    
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
    //steps to authenticate
    //find the user
    Student.findOne({ regNo: req.body.regNo }, function(err, student) {
        if (err) { console.log('error in finding user in signing in'); return; }
        //handle user found
        if (student) {
            //handle password which dont match
            if (student.password != req.body.password) {
               console.log("password doesnot matched");
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('student_id', student.id);
            console.log("entering profile");
            return res.redirect('/students/profile');

        } else {
            //handle user not found
            return res.redirect('back');


        }
    });
}