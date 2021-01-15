let db = require('../models/db');
const Lesson = db.lessons;
const lessonsService = require("../services/lessons.services");


exports.update = async (req, res) => {
    if (req.body.title && req.body.hours && req.body.teacher && req.body.file_name && req.body.starting_date && req.body.ending_date && req.params.id) {
        try {
            await Lesson.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            res.json({ id: req.params.id, ...req.body });
        } catch (e) {
            res.json(500);
            res.json({ error: e });
        }
               
    } else {
        res.status(400);
        res.json({error: 'bad request'});
    }
}

exports.create = async (req, res) => {
    if (req.body.title && req.body.hours && req.body.teacher && req.body.file_name && req.body.starting_date && req.body.ending_date) {

        try {
            let result = await Lesson.create(req.body);
            res.json(result);
        } catch (e) {
            res.status(500)
            res.json({ error: e });
        }
         
    } else {
        res.json({error: `Veuillez remplir les tous les champs neccessaires`});
    }
}

exports.getAll = async (req, res) => {
    try {
        let result = await Lesson.findAll();
        let newResult = result.map(element => lessonsService.checkFinished(element));
        res.json(newResult);
    }
    catch (e) {
        res.status(500)
        res.json({ "message": e });
    }
}

exports.getById = async (req, res) => {
   if (req.params.id) {
       try {
           let result = await Lesson.findByPk(req.params.id);
           let newResult = lessonsService.checkFinished(result);
           res.json(newResult);
    
       } catch (e) {   
        res.status(500)
        res.json({ "message": e });
        }
         
    } else {
        res.json({error: `Veuillez remplir les tous les champs neccessaires`});
    }
}

exports.remove = async (req, res) => {
    if (req.params.id) {
        try {
            await Lesson.destroy({
                where: {
                    id: req.params.id
                }
            });
        } catch (e) {
        res.status(500)
        res.json({ "message": e });
        }

    }
}