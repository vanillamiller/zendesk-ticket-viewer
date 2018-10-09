const zendesk = require('../models/client').zendeskClient;
const ticketsPerPage = 25;
const axios = require("axios");
const dateformat = require("dateformat");

let fetchTickets = function (req, res) {

    let page = req.query.page || 1;

    zendesk.get(`tickets.json?page=${page}&per_page=${ticketsPerPage}`)
        .then(response => {
            //console.log(response.data);
            let tickets = response.data.tickets;
            let totalTickets = response.data.count;
            let pages = Math.ceil(totalTickets / ticketsPerPage);
            let lastOnPage =  (page-1) * ticketsPerPage + tickets.length;
            let firstOnPage = (page-1) * ticketsPerPage + 1;
            
            
            tickets.forEach(ticket => {
                ticket.time = dateformat(ticket.created_at, "dd mmm yyyy at HH:MM");
                ticket.updated = dateformat(ticket.updated_at, "dd mmm yyyy at HH:MM");
            });
            

            if (page > pages) {
                res.redirect(`tickets/?page=${pages}`);
            } else if (page < 1) {
                res.redirect("tickets/?page=1")
            }

            res.render('index.ejs', {
                tickets: tickets,
                totalTickets: totalTickets,
                pages: pages,
                page: page,
                first : firstOnPage,
                last : lastOnPage,
            });

        }).catch(error => {

            let message = error;
            res.render('index.ejs', { error: message });

        });
}

let fetchTicketById = function (req, res) {
    
    let ticketId = req.params.id;

    zendesk.get(`tickets/${ticketId}.json`)
    .then(response => {

        let ticket = response.data.ticket;
        let requester = ticket.requester_id;

        return axios.all([
            zendesk.get(`users/${requester}.json`),
            ticket
        ])
    })
    .then(axios.spread((requester, ticket) => {
        
        
        ticket.time = dateformat(ticket.created_at, "dd mmm yyyy HH:MM");
        ticket.updated = dateformat(ticket.updated_at, "dd mmm yyyy HH:MM");

        res.render("ticketInfo.ejs", {
            ticket : ticket,
            requester: requester.data.user
        });
    }))
    .catch(error => {
        let message = error.response.data.error
        res.render('index.ejs', { error: message });
    })
}

module.exports.allTickets = fetchTickets;
module.exports.getTicket = fetchTicketById;
