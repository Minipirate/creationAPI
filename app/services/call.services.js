module.exports = erreurCall = (error, res) => {
    const message = "Une erreur est survenue lors de votre requête ! Veuillez retenter plus tard!";
    console.log(error);
    return res.status(500).json({ message, error : error.message});
}