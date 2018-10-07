const fetchAllTickets = require("../models/allTickets").fetchAllTickets;

let allTickets = function (req, res) {

    fetchAllTickets.then(response => {
        let tickets = response.data.tickets;
        console.log(tickets);
        res.render('index.ejs', { tickets: tickets });
    }).catch(errors => { res.render('index.ejs', { errors: errors }) });
}

module.exports.allTickets = allTickets;