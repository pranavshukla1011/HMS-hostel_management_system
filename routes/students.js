const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students_controller');

router.get('/profile',studentsController.profile);
router.get('/sign-up', studentsController.signUp);
router.get('/sign-in', studentsController.signIn);
router.post('/create',studentsController.create);
router.post('/create-session', studentsController.createSession);

module.exports = router;