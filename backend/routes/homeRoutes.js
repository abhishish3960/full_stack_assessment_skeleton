const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/find-by-user', homeController.findHomesByUser);
router.post('/update-users', homeController.updateUsersForHome);

module.exports = router;
