const express = require('express');
const router = express.Router();

const complaintController = require('../controllers/complaint_controller');
router.post('/create',complaintController.create);
router.get('/section', complaintController.complaint);


module.exports = router;