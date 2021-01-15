
var express = require('express');
var router = express.Router();
const lessonController = require('../controller/lessons.controller');



router.get('/', lessonController.getAll);

router.get('/:id', lessonController.getById);

router.post('/', lessonController.create);

router.put('/:id', lessonController.update);

router.delete('/:id',lessonController.remove);


module.exports = router;