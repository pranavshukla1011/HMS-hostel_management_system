const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('../models/student');

//authentication using passport

// passport.initialize( {
//     userProperty: 'student' // defaults to 'user' if omitted
//    });

passport.use(new LocalStrategy({
        usernameField: 'regNo'
    },
    function(regNo, password, done){
        //find a user and establish the identity
        Student.findOne({regNo: regNo},function(err, student){
                if(err){
                    console.log('Error in finding user----->Passport');
                    return done(err);

                }
                if(!student || student.password != password){
                    console.log('Invalid Username/Password');
                    return done(null, false);
                }

                return done(null, student);
        });
    }
));


//serializing the student to decide which key is to be kept in the cookies
passport.serializeUser(function(student, done) {
    done(null, student.id);
});

//deserialize the student from the key in the cookies
passport.deserializeUser(function(id, done) {
    Student.findById(id, function(err, student) {
        if (err) {
            console.log('Error in finding student--->Passport');
            return done(err);
        }
        return done(null, student);
    });
});

//check if the user is authenticated
//creating a function and using it as a middleware
passport.checkAuthentication = function(req, res, next){
    //if the student is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the student is not signed in
    return res.redirect('/students/sign-in');
}

passport.setAuthenticatedStudent = function(req, res, next){
    if(req.isAuthenticated()){
        //req.student contains the current signed in student from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;