
const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const auth = require('../services/auth.services');


router.put('/login', userController.login);
router.post('/register', userController.register);
router.get('/me', auth, userController.getInfo); //middleware (module exporté)
router.post('/addInfo', auth, userController.createProfil);


module.exports = router;