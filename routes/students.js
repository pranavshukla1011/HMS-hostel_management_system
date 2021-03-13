const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controllers/students_controller');

router.get('/profile',passport.checkAuthentication ,studentsController.profile);
router.get('/sign-up', studentsController.signUp);
router.get('/sign-in', studentsController.signIn);
router.get('/student-home',passport.checkAuthentication, studentsController.studentHome);
router.post('/create',studentsController.create);

//using passport as a middleware to authentication
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/students/sign-in'}
),studentsController.createSession);

router.get('/sign-out', studentsController.destroySession);

module.exports = router;