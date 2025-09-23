const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { getAllUsers, deleteUser, updateUserRole } = require('../controllers/adminController');

router.get('/users', adminAuth, getAllUsers);
router.delete('/users/:id', adminAuth, deleteUser);
router.put('/users/:id/role', adminAuth, updateUserRole);

module.exports = router;