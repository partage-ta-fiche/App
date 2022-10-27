
const mysql = require('mysql');
const { syncBuiltinESMExports } = require('module');
const { json } = require('express');
const { Store } = require('express-session');
const { getHeapCodeStatistics } = require('v8');

const db = require('./db')






let usersql = 'SELECT COUNT(*)user FROM user' 
const result = db.query(usersql, (err, result) => {
    if (err) {
    console.log('ERREUR') 
    throw err 
    }
    if (result > 0 ) {
        
       
    }
}) 


function getusernumber () {
   
          
    const resultat = result._results 

    
    const resultformed = resultat[0]; 

    const finalresult = resultformed[0].user ; 

    
    return finalresult ; 
        
       
         
   

  
    
    
 
    
    

}




exports.getUserNumber = getusernumber; 

let fichesql = 'SELECT COUNT(*)fiche FROM fiche'
    const ficheresult = db.query(fichesql  , (err, result ) => {
        if (err) {
            console.log('ERREUR') 
            throw err 
            }
            if (result > 0 ) {
                
               
            }



        
    })


function getfichenumber () {

    const resultat = ficheresult._results 

    
    const resultformed = resultat[0]; 

    const finalresult = resultformed[0].fiche ; 

    
    return finalresult ; 

    


}

exports.getFicheNumber = getfichenumber; 




