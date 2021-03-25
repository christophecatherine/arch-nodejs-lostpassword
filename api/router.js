/*
 * Import Module
 ****************/ 
const express = require('express'),
  router = express.Router(),
  path = require('path')

/*
 * Controller
 *************/ 
const homeController = require('./controllers/homeController'),
  articleController = require('./controllers/articleController'),
  contactController = require('./controllers/contactController'),
  authController = require('./controllers/authController'),
  nodemailerController = require('./controllers/nodemailerController')

/*
 * Router
 ***********/

// Home
router.route('/')
  .get(homeController.get)

// Article
router.route('/article')
  .get(articleController.get)
  .post(articleController.post)
  .delete(articleController.deleteAll)

// Article ID
router.route('/article/:id')
  .delete(articleController.deleteOne)

// Contact
router.route('/contact')
  .get(contactController.get)

// Nodemailer
// email de verification
router.route('/verification')
    .post(nodemailerController.sendVerif)
// Page de vérification
router.route('/verify/:id')
    .get(nodemailerController.verifMail)
    .post(authController.verifMailPost)
// Mot de passe oublier
router.route('/lostpassword')
    .post(nodemailerController.lostPassword)
// Page de mot de passe oublier
router.route('/lostpassword/:id')
    .get(nodemailerController.editPassword)

// Auth
router.route('/register')
    .post(authController.register)

router.route('/login')
    .post(authController.login)

router.route('/logout')
    .get(authController.logout)
// Mot de passe oublier
router.route('/editPassword/:id')
    .post(authController.editPasswordPost)
/***********
 * / Router
 */

 
// on export router pour le récupérer dans ../server.js
module.exports = router;