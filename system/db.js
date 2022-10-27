const mysql = require('mysql');
const { syncBuiltinESMExports } = require('module');
const { json } = require('express');
const { Store } = require('express-session');
const { getHeapCodeStatistics } = require('v8');

const database = 'PTF' ; 
const dbUser = '' ; 
const dbpswd = '' ;  



module.exports =  db = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: dbUser,
    password: dbpswd,
    database: database,

    port: 3306
    
}) 





db.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)
})


module.exports.db = db; 