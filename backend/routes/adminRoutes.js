const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/loginAdmin', loginAdmin);

module.exports = router;
