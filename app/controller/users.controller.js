const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require ('../models/db');
const erreurCall = require('../services/call.services');
const privateKey = require('../config/private-key');

exports.login = async (req, res) => {
    if(req.body.email && req.body.password){
        try {
           const user = await User.findOne({ where : { email: req.body.email }}); // vérifier la corrélat° /e/ mail et mdp
            if(!user) { //s'il n'y a pas d'utilisateur
                return res.status(404).json({message : "Cette adresse e-mail ne correspond à aucun compte."});
            }
            const verifPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!verifPassword) {
                const message = "Le mot de passe est erroné";
                return res.status(401).json({ message });
            }
            // générer le token avec méthode jwt 
            const token = jwt.sign(
                {userId : user.id},
                privateKey.privateKey, //privateKey.privateKey car objet.propriétéDeLobjet
                {expiresIn : '24h'}
            );

            const message = "Identification okay -> Merci de récupérer le token pour les futures requêtes sur l'API";
            res.json({
                message,
                data : user, token
            })

        } catch (error) {
            erreurCall(error, res);
        }       
    } else {
        res.status(400).json("Demande de login annulée. Merci de renseigner votre adresse e-mail et votre mot de passe.")
    }
}

/*
exports.register = async (req, res) => {

    try {

        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {

            let result = await User.create(req.body);
            res.json(result);
            
        } else {
            res.status(409);
            res.json({ "message": 'Cet email est déja utilisé' })
        }

       


    } catch (e) {
        res.status(500);
            res.json({ "message": e })
    }
   
}
*/
