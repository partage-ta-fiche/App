/* _    _ _______ _____ _      _____ _________     __
| |  | |__   __|_   _| |    |_   _|__   __\ \   / /
| |  | |  | |    | | | |      | |    | |   \ \_/ / 
| |  | |  | |    | | | |      | |    | |    \   /  
| |__| |  | |   _| |_| |____ _| |_   | |     | |   
 \____/   |_|  |_____|______|_____|  |_|     |_|   
                                                    */
                                                    

const express = require('express');
const app = express();

const port = process.env.PORT || 8080;







const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const fs = require('fs');
const multer = require('multer'); 
const dirname = __dirname ; 
const fetch = require('minipass-fetch')



//My modules 
const getNumber = require('./system/getnumber')
const db = require('./system/db')
const display = require('./system/display')
const article = require('./system/article')
const SendMail = require('./system/sendmail')




const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./store');
descStorage = new LocalStorage('./store/usr/desc')
secureStorage = new LocalStorage('./store/secure/')

app.set('view engine', 'ejs');


app.use("/asset", express.static(path.join(__dirname, 'public')));
app.use("/system", express.static(path.join(__dirname, 'system')));
app.use("/store", express.static(path.join(__dirname, 'store')))

app.use(session({
    secret: 'CHANGE SECRET',
    name: 'session',
    cookie: { maxAge: 6000000000000 },
    rolling: true,
    resave: true, 
    saveUninitialized: false
    
    
    
    
    
    
    }));

    app.use(session({
        secret: 'CHANGE SECRET ',
        resave: false, 
        save: true,
        saveUninitialized: false ,
        name: 'admin'
    }))

   


                                                                   





/*         _____ _____  
     /\   |  __ \_   _| 
    /  \  | |__) || |   
   / /\ \ |  ___/ | |   
  / ____ \| |    _| |_  
 /_/    \_\_|   |_____| 
                        
                         */


//DB NUMBER OF USER


app.get('/api/user', (req, res) => {

    
        
        const responsedata = {
            message: "PARTAGE TA FICHE API", 
            result: getNumber.getUserNumber
        }

        res.send(responsedata);  
    
})





 
 //PP API 



 //DESCRIPTION API 

 app.get('/api/user/desc/', (req, res ) => {
    

   
        let userID = req.query.userID 
         db.query(`SELECT * FROM user WHERE userID = "${userID}"`, (err, result) => {
            if (err){
                console.log(err)
            } 
                
                
                console.log(result[0].description +"1")
                let desc = result[0].description
            
                descStorage.setItem(`${req.query.userID}`, desc)
               
                 
                const responsedata = {
        
                    message: "PARTAGE TA FICHE OPEN API",
                    result: desc,
                } 
                res.send(responsedata);
        })
        
        

        
        
        
    
    
    
   

    
    
    

 })

 





/* _____   ____  _    _ _______ ______  _____ 
|  __ \ / __ \| |  | |__   __|  ____|/ ____|
| |__) | |  | | |  | |  | |  | |__  | (___  
|  _  /| |  | | |  | |  | |  |  __|  \___ \ 
| | \ \| |__| | |__| |  | |  | |____ ____) |
|_|  \_\\____/ \____/   |_|  |______|_____/ 
                                             */
                                            




 app.get('/', (req, res) => {
     
     
     
     

        let usernumber = getNumber.getUserNumber()
        let fichenumber = getNumber.getFicheNumber()
        
        
            
            

    db.query('SELECT * FROM fiche; ', (err, result) => {
        if (err) {
        console.log('ERREUR') 
        throw err 
        }
        if (result > 0 ) {
            
           
        }
        let resultat = JSON.stringify(result)
        let formed = JSON.parse(resultat)
        
        db.query('SELECT * FROM article;' , (error, resolt) => {
            let string = JSON.stringify(resolt)
            let resoltat = JSON.parse(string )
            res.render(process.cwd() + '/index', {
                userNumber: usernumber, 
                ficheNumber: fichenumber, 
                articles: formed, 
                article: resoltat, 
        })


        
        
        
            

        
            
            
            
       

    })
    
        
         
    }) 
     


     
     var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
     console.log(ip);

        

    
})


app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/page/about.html');
    
})

app.get('/join', (req, res) => {
    
    res.sendFile(__dirname + '/page/join.html');

})
app.get('/contact', (req, res) => {
      res.sendFile(__dirname + '/page/contact.html');
})

app.get('/contact/send' , (req,res) => {
     SendMail.SendMotivMail(req.query.email, req.query.name, req.query.motiv); 
     res.redirect('/sucess/?msg=Le+message+a+été+envoyer&redirect=join')
})

app.get('/contact/sendcontact' , (req,res) => {
    SendMail.SendContactMail(req.query.email,req.query.subject,req.query.name,req.query.message)
    res.redirect('/sucess/?msg=Le+message+a+été+envoyer&redirect=contact')
})

app.get('/sucess', (req,res ) => {
    res.render(__dirname + '/app/sucess', {
        msg: req.query.msg, 
        redirect: req.query.redirect, 
    })
})




//Article 

app.get('/view/article/', (req,res) => {
    let id = req.query.id; 
    let SQL = `SELECT * FROM article WHERE id = '${id}'`
    db.query(SQL, (err, result ) => {
        if (err) {throw err; }
        let resultat = JSON.stringify(result)
        let formed = JSON.parse(resultat)
        
        if (result) {

           res.render(__dirname + '/app/viewarticle', {
            article: formed

           })
            
            
        } else {
            if (result <= 0  ) {
                console.log('error')
                res.render(__dirname + '/app/error/error', {
                    msg: 'Cette article n\'existe pas <code> ADNE.143 <\code>'
                })

            }
           
        }
    })
})
    















/* 
  _____  _____   ____  ______ _____ _      ______  
 |  __ \|  __ \ / __ \|  ____|_   _| |    |  ____| 
 | |__) | |__) | |  | | |__    | | | |    | |__    
 |  ___/|  _  /| |  | |  __|   | | | |    |  __|   
 | |    | | \ \| |__| | |     _| |_| |____| |____  
 |_|    |_|  \_\\____/|_|    |_____|______|______| 
                                                    */
                                                   















app.get('/profile', async (req, res) => {
    



    if (req.session.isLoged === true) {
        
       
       



        fetch(`http://localhost:8080/api/user/desc/?userID=${req.session.userID}`)


        

        


        

        res.render(process.cwd() + '/app/modifyaccount',  {
            username: req.session.user, 
            userid: req.session.userID,
            desc: descStorage.getItem(`${req.session.userID}`)
            
        })
        
    } else {
        res.redirect('/account/register')
    }
    
    

})


var updLocation = path.join(__dirname, '/store/img/pp' )
var upload = multer({ dest:updLocation });
app.post('/modify', upload.array('userprofilepictures'),  (req, res) => {



    res.redirect('/profile')

    let username = req.body.username 
    let description = req.body.userdescripton
    let dataUID = req.session.userID
    let profiledata = {
        username: username, 
        description: description

    }
    db.query(`UPDATE user SET username = "${profiledata.username}", description = "${profiledata.description}" WHERE userID = ${dataUID};`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })




    //Photo de profile 
    
    console.log(req.files[0].filename)
    let ppfile = req.files[0].filename;

    if (fs.existsSync(`${dirname}/store/img/pp/${req.session.userID}.png`)) {
        console.log('File exist go remove ')
        fs.unlink(`${dirname}/store/img/pp/${req.session.userID}.png`, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Sucess remove PP ')
            }

        })

        fs.rename(`${dirname}/store/img/pp/${ppfile}`, `${dirname}/store/img/pp/${req.session.userID}.png`, (error) => {
            if (error ) {
                console.log(error)
            } else {
                console.log('Sucess')
                fs.unlink(`${dirname}/store/img/pp/${ppfile}`, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Sucess delete file')
                    }
                })
            }
        })
        
        


    } else {
        fs.rename(`${dirname}/store/img/pp/${ppfile}`, `${dirname}/store/img/pp/${req.session.userID}.png`, (error) => {
            if (error ) {
                console.log(error)
            } else {
                console.log('Sucess')
                fs.unlink(`${dirname}/store/img/pp/${ppfile}`, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Sucess delete file')
                    }
                })
            }
        })
        
    }
    
    

})

//modify password 

app.get('/modify/password' , (req, res ) => {
    
    

    username = req.session.user
    
    let sql = `SELECT * FROM user WHERE username = "${username}"  `;
    
   

    db.query(sql, (err, result)  => {
        const saltRounds = 10;
        
        console.log(result)
        if (err) throw err;
        if (result.length > 0) {
            let hash = result[0].password;
            var olderpswd = req.query.old ;
            
            
            
            bcrypt.compare(olderpswd, hash, (err, isMatch) => {
                if (err) {
                    console.log(err)
                };
                if (isMatch) {
                    var newpswd = req.query.new ;
                    

                    bcrypt.hash(newpswd, saltRounds, function(err, hash) {
                        // Store hash in your password DB.
                        password = hash;
                        
                        if (err) {
                            console.log(err)
                        }
                        db.query(`UPDATE user SET password = "${password}" WHERE username = "${username}" `, (err, result) => {
                            if (err) {
                                console.log(err); 
                            };
                            
                            
                            
                        } )
                    });
                    
            
                    

                    
                    

                    
                    
                    
                    
                } else {
                    res.send('Error');
                    
                }
            })
        } else {
            res.send('Error');
            
        }
    } )


})

app.get('/profile/view', (req, res ) => {

    const userID = req.query.id;

    let SQL = `SELECT * FROM user WHERE userID = ${userID}`
    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        }else {
            if (result.length === 0 ) {
                res.render(__dirname + '/app/error/error' , {
                    msg: `Ce profil n'existe pas <code>PDNE1.1<\code>`
                })
                
                

            }else {
                
                data = {
                    description: result[0].description,
                    username: result[0].username
                
    
                }
                db.query(`SELECT * FROM fiche WHERE authorID = '${req.query.id}'`, (error, resolt) => {
                    let jsoni = JSON.stringify(resolt) 
                    let formed = JSON.parse(jsoni)

                    res.render(__dirname + '/app/viewprofile', {
                        username: result[0].username, 
                        description: result[0].description,
                        id: userID,
                        fiche: formed, 
        
                    }) 

                })
               
                 
                
                
            }
           
        }



    })
            
            


})






















/*
.#####....####....####...######..........#####...######..........##.......####...........######..######...####...##..##..######.........
.##..##..##..##..##........##............##..##..##..............##......##..##..........##........##....##..##..##..##..##.............
.#####...##..##...####.....##............##..##..####............##......######..........####......##....##......######..####...........
.##......##..##......##....##............##..##..##..............##......##..##..........##........##....##..##..##..##..##.............
.##.......####....####.....##............#####...######..........######..##..##..........##......######...####...##..##..######.........
........................................................................................................................................ */


app.get('/post', (req, res) => {

    if (req.session.isLoged === true) {
        res.render(__dirname + '/app/postfiche', {
            username: req.session.user, 
            userid: req.session.userID,
        })

    }else {
        res.redirect('/account')
    }
    

})

var updficheLocation = path.join(__dirname, '/store/img/fiches/' )
var uploadfiche = multer({ dest:updficheLocation });

app.post('/post/final',uploadfiche.single('filefiche'), (req, res) => {
    
    let title = req.body.title;
    let description = req.body.description;
    let author = req.body.author;
    let authorID = req.body.authorID;
    let fichefile = req.file.filename;
    


   let data = {
    title: title, 
    description: description, 
    author: author, 
    authorID: authorID

   }
   console.log(req.file.filename)
    
   if (fs.existsSync(`${dirname}/store/img/fiches/${fichefile}`)) {

    if  (title === '' || description === '' || author === undefined) {
        console.log('Error user no data ')
        res.send('ERROR')
       } else {
        db.query('INSERT INTO fiche SET ?', data, (err, result) => {
            if (err) throw err;
            console.log(result.insertId);
    
    
            //Photo de la fiche 
            
                fs.rename(`${dirname}/store/img/fiches/${fichefile}`, `${dirname}/store/img/fiches/${result.insertId}.png`, (err) => {
                    if (err) {
                        console.log(err)
                    }else {
                        console.log('GOOD JOB FICHE POSTED')
                    }
                })
            
    
    
    
    
            
        } )
       }


   }else {
    res.render(__dirname +'/app/error/error', {
        msg: 'FDNF Cette fiche n\'a pas de fichier ' 
        })
   }


   


    

    res.redirect('/sucess/?msg=Fiche+envoyée&redirect=account')
    






} )


/* 

Yb    dP 88 888888 Yb        dP     888888 88  dP""b8 88  88 888888 
 Yb  dP  88 88__    Yb  db  dP      88__   88 dP   `" 88  88 88__   
  YbdP   88 88""     YbdPYbdP       88""   88 Yb      888888 88""   
   YP    88 888888    YP  YP        88     88  YboodP 88  88 888888 
   
   */


   app.get('/view/fiche', (req,res) => {


    const ficheID = req.query.ficheid 

    let SQL = `SELECT * FROM fiche WHERE id = ${ficheID}`


    db.query(SQL , (err, result ) => {

        if (result) {
            res.render(__dirname + '/app/viewfiche', {
                fichename: result[0].title,
                ficheusername: result[0].author,
                authorid: result[0].authorID,
                desc: result[0].description,
                ficheid: result[0].id,  
    
    
    
            }) 
            
        } else  {
            if (result === 0 ) {
                res.render(__dirname +'/app/error/error', {
                    msg: 'FDNE1 Cette fiche n\'existe pas ' + `<code> Code erreur :   ${err} res : ${result} <\code>`  
                    })

            }
            
            
            
            
        }

        
        if (err) {
            throw err;
        }
       
            
        

    })






   })















/* 
..####...#####...##...##..######..##..##..######...####...######..#####....####...######..######...####...##..##.
.##..##..##..##..###.###....##....###.##....##....##........##....##..##..##..##....##......##....##..##..###.##.
.######..##..##..##.#.##....##....##.###....##.....####.....##....#####...######....##......##....##..##..##.###.
.##..##..##..##..##...##....##....##..##....##........##....##....##..##..##..##....##......##....##..##..##..##.
.##..##..#####...##...##..######..##..##..######...####.....##....##..##..##..##....##....######...####...##..##.
................................................................................................................. */


//LOGIN ADMIN






app.get('/admin' , (req,res) => {

    if (req.session.isLoged === true ) {
        res.sendFile(__dirname + '/app/admin/login.html')
    }
    if (req.session.admin === true) {
        
        res.render(__dirname + '/app/admin/index', {
            usernumber: getNumber.getUserNumber(), 
            fichenumber: getNumber.getFicheNumber(),
            pseudo: req.session.user
        })
    }


})

app.get('/admin/login', (req, res,  ) => {
    let username = req.query.username;
    let password = req.query.password; 
    console.log(username)

    let SQL = `SELECT * FROM admin WHERE username = '${username}'`
    db.query(SQL, (err, result) => {
       
        
        console.log(result)
        let hash = result[0].password;

         bcrypt.compare(password, hash, (err, match) => {
            if (err) {
                console.log(err)
            }
            if (match) {
               req.session.admin = true; 
               res.redirect('/admin')

            }
        }) 
    })
    
    
    
})

app.get('/admin/add', (req,res) => {
    if (req.session.admin === true ) {

        res.sendFile(__dirname + '/app/admin/addadmin.html')
    }else {
        res.redirect('/admin'); 
    }
    



} )

app.get('/admin/add/confirm', (req, res ) => {


    if (req.session.admin === true ) {
        let password = req.query.password;
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash ) => {
        password = hash 
        console.log(hash)
        let data = {
            username: req.query.username,
            password : password
        }
        let SQL = 'INSERT INTO admin SET ? '
        db.query(SQL, data , (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result > 0 ) {
                console.log(result)
            }

        })
    } )

    }
    
    
})


//Article 

app.get('/admin/article' , (req,res) => {
    
    if (req.session.admin === true ) {
        db.query('SELECT * FROM article; ' , (err, result) => {
            if (err){throws(err)}
    
            let resultat = JSON.stringify(result)
            let formed = JSON.parse(resultat)
            
            res.render(__dirname + '/app/admin/article', {

                article : formed, 
    
            })
        })
        
        
    }
})

app.get('/admin/article/post', (req, res) => {
    if (req.session.admin === true ) {
        
        let title = req.query.title;
        let desc = req.query.desc;
        let body = req.query.body; 
        let author = '16'; 

        article.PostArticle(title, desc,body, author)

        res.redirect('/admin/article')


    }
})

//User 

app.get('/admin/user', (req,res) => {
    if (req.session.admin === true ) {
        db.query('SELECT * FROM user ', (err, result) => {
            let resultat = JSON.stringify(result)
            
            let formed = JSON.parse(resultat)
            

            res.render(__dirname + '/app/admin/viewuser', {
                user: formed, 
            })
        })
    }
})

app.get('/admin/user/delete', (req,res) => {
    if (req.session.admin === true ) {
        let userid = req.query.id 

    db.query(`DELETE FROM user WHERE userID = ${userid}`, (err, result) => {
        if (err) {throw err; } else {
            res.redirect('/admin/user')
        }
        
    })

    }
    

}) 

//Fiche 


app.get('/admin/fiche', (req, res) => {
    if (req.session.admin === true ) {
        db.query('SELECT * FROM fiche ; ', (err, result) => {
            let resultat = JSON.stringify(result)
            
            let formed = JSON.parse(resultat)
            if (err) {throw err; }

            res.render(__dirname  +'/app/admin/viewfiche' , {
                fiche: formed, 
                
            })
        })
    }
})

app.get('/admin/fiche/delete', (req,res) => {
    if (req.session.admin === true ) {
        let id = req.query.id 
        db.query(`DELETE FROM fiche WHERE id = ${id}`, (err, result) => {
            if(err){throw err ; }
            res.redirect('/admin/fiche')
        })
    }
} )

//Maintenance (En cours de développement )


















 











                              
 
                         














app.get('/login', (req, res) => {
    let password = req.query.password;
    let username = req.query.username;
    let sql = 'SELECT * FROM user WHERE username = ?  ';
    
    db.query(sql, [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            let hash = result[0].password;
            bcrypt.compare(password, hash, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    req.session.save(function(err) {
                        if (err) {
                            console.log(errr)
                        }else {
                            console.log('Login successfull session Save in store ')
                        }

                    })
                    req.session.user = req.query.username;
                    req.session.isLoged = true; 
                    req.session.userID = result[0].userID; 
                    console.log(result[0].userID)

                    res.redirect('/account');
                    console.log(req.session);
                    console.log(req.sessionID);

                    
                    
                    
                    
                } else {
                    res.send('Login failed');
                    
                }
            })
        } else {
            res.send('Login failed');
            
        }
    } )
} )

app.get('/account', (req, res) => {
    sess = req.session
   
    
    if (sess.isLoged === true ) {
        res.redirect('/profile')
        console.log('loged')
    }else {
        res.sendFile(__dirname + '/app/account.html')
        console.log('unloged')
    }
    


    })







app.get('/create/sucess', (req, res) => {
    res.sendFile(__dirname + '/app/sucess.html');
    let name = req.query.name;
    let email = req.query.email;
    let password = req.query.password;
    let username = req.query.username;
    let firstname = req.query.firstname;
    let data = {
        name: name,
        firstname : firstname,
        email: email,
        password: password,
        username: username
    }
    console.log(data);

    if (data.name && data.firstname && data.email && data.password && data.username) {
        create(data);
        res.redirect('/account');
        
    } else {
        res.redirect('/account/register' );
    }

    if (name == "" || email == "" || password == "" || username == "") {
        res.sendFile(__dirname + '/app/create.html');
        res.send("Veuillez remplir tous les champs");
    } 
    
    
    
    if (name == undefined || email == undefined || password == undefined || username == undefined) {
        res.sendFile(__dirname + '/app/error/error.html');
    }


} )


























app.get('/account/register', (req, res) => {
    res.sendFile(__dirname + '/app/create.html');
});

    
    





    function create(data) {
        const saltRounds = 10;
        const myPlaintextPassword = data.password;
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            data.password = hash;
            console.log(data);
            db.query('INSERT INTO user SET ?', data, (err, result) => {
                if (err) throw err;
                console.log(result);
                
            } )
        });

       

        

    }
 

    
    


 /*    ____ _______ _    _ ______ _____  
    / __ \__   __| |  | |  ____|  __ \ 
   | |  | | | |  | |__| | |__  | |__) |
   | |  | | | |  |  __  |  __| |  _  / 
   | |__| | | |  | |  | | |____| | \ \ 
    \____/  |_|  |_|  |_|______|_|  \_\ */
                                       
    









app.listen(port, () => {
    console.log(`Partage ta fiche listening at http://localhost:${port}`)
}); 




 





































