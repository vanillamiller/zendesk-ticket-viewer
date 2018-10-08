const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller")

router.get('/', function(req, res){
    res.redirect('/tickets')
});

router.get('/tickets', controller.allTickets);

module.exports = router;