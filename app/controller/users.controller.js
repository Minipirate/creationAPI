const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require ('../models/db');
const erreurCall = require('../services/call.services');
const privateKey = require('../config/private-key');
const { checkDuplicateEmail } = require('../services/user.services');
const studentMethodes = require('./students.controller'); // ici on récupère toutes les méthodes de students.controller



exports.createProfil = async (req, res) => { // on envoie un token s'il est bon on récupère l'id associé et on RE l'user puis on créé un utilisateur avec la fonction create de student.controller
    try {
    const id = res.locals.id;
    const user = await User.findByPk(id);

    //création du new student
    const userProfil = await studentMethodes.create(req, res);
    await user.setStudent(userProfil);
    const message = "Votre profil étudiant a bien été créé";
    res.json({
        message,
        newStudentProfil : userProfil
    })
} catch (error) {
    erreurCall(error, res);
    }
}

exports.login = async (req, res, userRegister = null, messageRegister = null) => { //Si on ne reçoit rien, on applique par défaut la valeur null
    if(req.body.email && req.body.password){
        try {
            let user;
            if(userRegister != "object") { //si l'appel API est sur /login
            user = await User.findOne({ where : { email: req.body.email }}); // vérifier la corrélat° /e/ mail et mdp
                if(!user) { //s'il n'y a pas d'utilisateur
                    return res.status(404).json({message : "Cette adresse e-mail ne correspond à aucun compte."});
                }
                const verifPassword = bcrypt.compareSync(req.body.password, user.password);
                if(!verifPassword) {
                    const message = "Le mot de passe est erroné";
                    return res.status(401).json({ message });
                }
            } else { //si l'appel API vient de /register
                user = userRegister;
            }
                // générer le token avec méthode jwt 
            const token = jwt.sign(
                {userId : user.id}, // clef que l'on récupère de decodedtoken
                privateKey.privateKey, //privateKey.privateKey car objet.propriétéDeLobjet
                {expiresIn : '24h'}
            );

            const message = typeof messageRegister === "string" ? messageRegister : "Identification okay -> Merci de récupérer le token pour les futures requêtes sur l'API"; //condition ternaire ici
            res.json({
                message,
                token,
                data : user
            })

        } catch (error) {
            erreurCall(error, res);
        }       
    } else {
        res.status(400).json("Demande de login annulée. Merci de renseigner votre adresse e-mail et votre mot de passe.")
    }
}


//création d'un cpte par user
exports.register = async (req, res) => {
    if(req.body.password && req.body.email && req.body.type) { //Si ces 3 st présents : 
    try {
        const emailUsed = await checkDuplicateEmail(req, res);
        if(!emailUsed) { //si pas de mail utilisé
            const user = await User.create({ // alors création d'un user
                email: req.body.email,
                type: req.body.type,
                password: bcrypt.hashSync(req.body.password, 8)
            });
            this.login (req, res, user, "Votre compte a bien été créé. Vous avez été directement authentifié. Vous pouvez dès à présent récupérer le token pour vos futures requêtes sur l'API.");
        }
    } catch (error) {
        erreurCall(error, res);
        }
    } else {
    const message = "Demande d'inscription échouée. Merci de renseigner tous les champs requis.";  
    res.status(400).json({ message });
    }
}


exports.getInfo = async (req, res) => {
    try {
        const id = res.locals.id; //récupération variable locals propre à la requête avant son échéance 
        const user = await User.findByPk(id); //récupération infos user
        const message = "Vos informations ont bien été récupérées";
        res.json({
            message,
            user
        });
    } catch(error) {
        erreurCall(error, res);
    }
}
