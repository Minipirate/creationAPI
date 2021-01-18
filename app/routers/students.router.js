var express = require('express');
var router = express.Router();
const studentController = require('../controller/students.controller');
const auth = require('../services/auth.services');


router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
//router.get('/:id', studentController.getById);
//router.get('/add-student-to-lesson/:id1/:id2', studentController.addLesson);
//router.post('/', studentController.create);
//router.put('/:id', studentController.update);
//router.delete('/:id',studentController.remove);


module.exports = router;