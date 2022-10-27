const db = require('./db')


global.resultat = null ; 
const res = db.query('SELECT * FROM fiche; ', (err, result) => {
    if (err) {
    console.log('ERREUR') 
    throw err 
    }
    if (result > 0 ) {
        
       
    }
    
    let resultat = JSON.stringify(result)
    let formed = JSON.parse(resultat)
    console.log(formed[0].id);

    
     
}) 








