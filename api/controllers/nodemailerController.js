/*
 * On déclare nos constante
 * ************************ */

// import nodemailer 
const nodemailer = require('nodemailer'),
  User = require('../database/User'),
  // Déclaration ne notre transporter
  // C'est en quelque sorte notre connexion à notre boite mail
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: '587',
    auth: {
      user: "jojocoin2019@gmail.com",
      pass: "jojocoin.2019$"
    }
  })

// Ici on genere nos variable en parent pour pouvoir les récupérer au retour de nos data email
// (Dans la branch nodemailer-advanced il sera générer avec un token type jwt)
var rand, mailOptions, host, link;

module.exports = {
  // Envoie du message de vérification
  sendVerif: (req, res) => {
    // génération d'un chiffre random
    rand = Math.floor((Math.random() * 100) + 54)
    // on definit notre host
    host = req.get('host')
    // on définit le lien
    link = "http://" + req.get('host') + "/verify/" + rand
    // et enfin notre mail
    mailOptions = {
      from: 'jojocoin2019@gmail.com',
      to: req.body.email,
      subject: "Veuillez confirmez votre email svp.",
      rand: rand,
      html: `
        <h2>Encore un effort</h2>,<br>
        <h5>Cliquer sur le lien suivant afin de finir la procédure de validation de mail.</h5><br>
        <a href=" ` + link + ` ">Click here to verify</a>
      `
    }
    console.log(mailOptions)
    
    // Et envoi notre mail avec nos callback
    transporter.sendMail(mailOptions, (err, res, next) => {

      if (err) {
        console.log(err)
        res.end("error")

      } else {
        console.log("Message Envoyer")
        next()

      }
    })
    // Response
    res.render('home', {
      success: "Un email de vérification à bien été envoyer à " + req.body.email
    })
  },
  // Génération de la page ID (Unique)
  verifMail: async (req, res) => {
    const user = await User.findOne({
      email: mailOptions.to
    })
    console.log(req.protocol + "://" + req.get('host'))
    console.log('Page verify: ')

    // Ici on tcheck notre protocole hébergeur (nodejs localhost) et le liens générer dans le mail
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
      console.log("Domain is matched. Information is from Authentic email")

      // Ici on tcheck notre id du mail avec la variable enregistrer en cache (rand)
      if (req.params.id == mailOptions.rand) {
        console.log("email is verified")
        res.render('verifId', {
          email: mailOptions.to,
          user: user
        })

      } else {
        console.log("email is not verified")
        res.render('verifId', {
          message: "Bad Request !"
        })

      }
    } else {
      res.render('verifId', {
        message: "Request is from unknown source !"
      })

    }
  },
  // Envoie du mail
  lostPassword: async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      // génération d'un chiffre random
      rand = Math.floor((Math.random() * 100) + 54)
      // on definit notre host
      host = req.get('host')
      // on définit le lien
      link = "http://" + req.get('host') + "/lostpassword/" + rand
      // et enfin notre mail
      mailOptions = {
        from: 'jojocoin2019@gmail.com',
        to: req.body.email,
        subject: "Veuillez confirmez votre email svp.",
        rand: rand,
        html: `
        <h2>Encore un effort</h2>,<br>
        <h5>Cliquer sur le lien suivant afin de finir la procédure de recréation de mot de passe.</h5><br>
        <a href=" ` + link + ` ">Click here to create password</a>
      `
      }
      console.log(mailOptions)
      // Et envoi notre mail avec nos callback
      transporter.sendMail(mailOptions, (err, res, next) => {
        if (err) {
          console.log(err)
          res.end("error")
        } else {
          console.log("Message Envoyer")
          next()
        }
      })
      // Response
      res.render('home', {
        success: "Un email à bien été envoyer à " + req.body.email
      })

    } else res.redirect('/')
  },
  // Génération de la page ID (Unique)
  editPassword: (req, res) => {
    console.log(req.protocol + "://" + req.get('host'))
    console.log('Page verify: ')

    // Ici on tcheck notre protocole hébergeur (nodejs localhost) et le liens générer dans le mail
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
      console.log("Domain is matched. Information is from Authentic email")

      // Ici on tcheck notre id du mail avec la variable enregistrer en cache (rand)
      if (req.params.id == mailOptions.rand) {
        console.log("email is verified")
        // res.end("<h1>Email " + mailOptions.to + " is been Successfully verified")
        res.render('editPassword', {
          mailOptions
        })

      } else {
        console.log("email is not verified")
        res.render('editPassword', {
          message: "Bad Request !"
        })
      }

    } else {
      res.render('editPassword', {
        message: "Request is from unknown source !"
      })
    }
  }
}