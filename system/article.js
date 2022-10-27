const db = require('./db')

function PostArticle(title, desc, body, author) {

    
        let data = {
            title: title, 
            desc: desc, 
            body: body, 
            author: author,
        }
        

        let resultquery = db.query('INSERT INTO article SET ?', data,  (err, result ) => {
            if (err) {throw err}
            console.log(result)

        })
        return resultquery 

        
    



}

exports.PostArticle = PostArticle;