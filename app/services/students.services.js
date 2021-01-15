//calcul âge étudiant 

const getYears = (date2) =>{
let years = new Date().getFullYear() - new Date(date2).getFullYear();
let month = new Date().getMonth() - new Date(date2).getMonth();
let dateDiff = new Date().getDay() - new Date(date2).getDay();
if (dateDiff < 0) {
    month -= 1;
}
if (month < 0) {
    years -= 1;
}
return years;
}


module.exports = {
    getYears
}