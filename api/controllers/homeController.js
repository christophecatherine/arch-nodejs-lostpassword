
/*
 * Controller
 *************/ 
module.exports = {
    // Method Get
    get: (req, res) => {
        console.log(req.session);
        res.render('home')
    }
}