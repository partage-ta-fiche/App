const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('APIKEY')




  function SendContact(email, nom, motiv) {

    const msg = {
        to: 'XXXX@XXX.COM', // Change to your recipient
        from: 'XXXX@XXX.COM', // Change to your verified sender
        subject: `Contact de ${nom} depuis Partage ta Fiche`,
        
        html: `<div class="card">
        <img src="https://partage-ta-fiche.thebirdproduction.fr/asset/img/Logo.png" alt="Logo partage-ta-fiche" class="center">
        <div class="center">
            <h1>Nouveau contact de : ${nom}, ${email} </h1>
            <h2>Motivations:</h2>
            <p>${motiv}</p>

           
            

        </div>

        <div class="footer">
            Vous n'êtes pas sensé recevoir ce message ? 
            <a href="mailto:contact.pro.thebirdproduction@gmail.com">Signaler le nous </a> <br>
            &copy; 2022 The bird production System 

        </div>


        
    </div>

    <style>
        .footer {
            text-align: center;
            width: 100%; 
            height: auto;
            background-color: gray; 
            color: white; 

        }
        
        .card {
            background-color: #A1C4FD ; 
            border-radius: 15px;
            box-shadow: black 15px ; 
            font-family: sans-serif;

            width: auto;
            height: auto;
        }
        .center {
            margin: 0 auto ; 
            display: block; 
            text-align: center;
            
        }
        img {
            
            width: 15%;
        }
    </style>`,

    }

    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

  }
  

 
  exports.SendMotivMail = SendContact; 


  function SendMailContact(email,subject,name, message ) {

    const msg = {
        to: 'lejournaldeetienne@gmail.com', // Change to your recipient
        from: 'contact@partage-ta-fiche.thebirdproduction.fr', // Change to your verified sender
        subject: `${subject}`,
        
        html: `<div class="card">
        <img src="https://partage-ta-fiche.thebirdproduction.fr/asset/img/Logo.png" alt="Logo partage-ta-fiche" class="center">
        <div class="center">
            <h1>Nouveau contact de : ${name}, ${email} </h1>
            <h2>Sujet : ${subject} <\h2> 
            <h2>Message:</h2>
            <p>${message}</p>

           
            

        </div>

        <div class="footer">
            Vous n'êtes pas sensé recevoir ce message ? 
            <a href="mailto:contact.pro.thebirdproduction@gmail.com">Signaler le nous </a> <br>
            &copy; 2022 The bird production System 

        </div>


        
    </div>

    <style>
        .footer {
            text-align: center;
            width: 100%; 
            height: auto;
            background-color: gray; 
            color: white; 

        }
        
        .card {
            background-color: #A1C4FD ; 
            border-radius: 15px;
            box-shadow: black 15px ; 
            font-family: sans-serif;

            width: auto;
            height: auto;
        }
        .center {
            margin: 0 auto ; 
            display: block; 
            text-align: center;
            
        }
        img {
            
            width: 15%;
        }
    </style>`,

    }

    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })



  }
  exports.SendContactMail = SendMailContact; 