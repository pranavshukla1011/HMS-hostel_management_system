const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students_controller');

router.get('/profile',studentsController.profile);


module.exports = router;