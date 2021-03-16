const express = require('express');
const router = express.Router();
const passport = require('passport');

const complaintController = require('../controllers/complaint_controller');
router.post('/create',passport.checkAuthentication,complaintController.create);
router.get('/section',passport.checkAuthentication, complaintController.complaint);
router.get('/destroy/:id', passport.checkAuthentication, complaintController.destroy);

module.exports = router;