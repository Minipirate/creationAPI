const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateKey = require('../config/private-key');
const { User } = require ('../models/db');


//méthode qui permet de vérifier l'authentification d'une personne 
module.exports = (req, res, next) => {
    try {
    console.log("Requête pour page protégée");
    const token = req.headers["x-access-token"];

    if(!token) {
        const message = "Vous n'avez pas fourni de jeton d'authentification !";
        return res.status(401).json({ message });
    }
    jwt.verify(
        token,
        privateKey.privateKey,
        async (error, decodedToken) => {
            if(error) {
                const message = "L'utilisateur n'est pas autorisé à accéder à cette page !";
                return res.status(401).json({ message, data : error.message });
            }
            const userId = decodedToken.userId; //récup id de l'user contenu dans le token
            const user_from_token = await User.findByPk(userId) //RE de l'utilisateur id 2
            if(!user_from_token){
                const message = "Votre compte n'existe plus. Vous n'êtes donc plus autorisé à accéder à cette page";
                return res.status(401).json({ message });
            }

            // à partir d'ici c'est que tous les checks sont OKAY
            res.locals.id = userId; //stockage dans la variable locals qui va être valide pendant toute la durée de la requête
            next(); // next() donc -> on passe au middleware suivant 
        
    })
    } catch (error) {
        erreurCall(error, res);
    }
}