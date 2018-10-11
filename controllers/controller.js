const zendesk = require('../models/client').zendeskClient;
const axios = require("axios");
const dateformat = require("dateformat");
const ticketsPerPage = 25;

//  Zendesk API does not return a uniform error message structure for all errors
// so they msust be dealt with seperately
let handleError = function(error){
    // Check if the server responded
    if(error.response){
        var status = error.response.status;
        var message = "";
        if(status < 500){
            if(status == 401 || status == 404){
                message = error.response.data.error;
            }
            if(status == 400){
                message = error.response.data.error.message;
            }
        } else {
            message = "Internal server error, please try again later";
        }
    // If not server cannot be reached
    } else {
        status = 404;
        message = "Server cannot be reached at this moment";
    }
    return {
        error: message,
        status: status
    }
}

let fetchTickets = function (req, res, next) {

    let page = req.query.page || 1;

    // With a user potentially having 100,000s of tickets pagination through the 
    // API will save time and bandwidth... Sorted by last updated
    zendesk.get(`tickets.json?sort_by=created_at&sort_order=desc&page=${page}&per_page=${ticketsPerPage}`)
        .then(response => {
            //console.log(response.request)
            let status = response.status;
            let tickets = response.data.tickets;
            let totalTickets = response.data.count;
            let pages = Math.ceil(totalTickets / ticketsPerPage);
            let lastOnPage = (page - 1) * ticketsPerPage + tickets.length;
            let firstOnPage = (page - 1) * ticketsPerPage + 1;

            tickets.forEach(ticket => {
                ticket.time = dateformat(ticket.created_at, "dd mmm yyyy h:MM TT");
                ticket.updated = dateformat(ticket.updated_at, "dd mmm yyyy h:MM TT");
            });

            // Zendesk API only sometimes throws an error for negative page queries and never
            // of positive ones out of bounds
            if (page < 1 || page > pages) {
                let message = "invalid page requested";
                // respond with bad request
                res.status(400).render('home.ejs', {
                    error: message,
                    status: 400
                });
            } else {
                // Render tickets in a list
                res.render('home.ejs', {
                    tickets: tickets,
                    totalTickets: totalTickets,
                    pages: pages,
                    page: page,
                    first: firstOnPage,
                    last: lastOnPage,
                    status: status
                });
            }

        }).catch(error => {
            let message = handleError(error);
            res.status(message.status).render("home.ejs", message);
        });
}

let fetchTicketById = function (req, res) {

    let ticketId = req.params.id;

    // get ticket specified in route
    zendesk.get(`tickets/${ticketId}.json`)
        .then(response => {

            let status = response.status
            let ticket = response.data.ticket;
            let requester = ticket.requester_id;

            //get requester information based on id and updates to specific ticket
            return axios.all([
                zendesk.get(`users/${requester}.json`),
                zendesk.get(`tickets/${ticket.id}/audits.json`),
                ticket,
                status
            ])
        })
        .then(axios.spread((requester, audits, ticket, status) => {
            
            let updates = audits.data.audits;
            // append beautified time to tickets
            ticket.time = dateformat(ticket.created_at, "dd mmm yyyy h:MM TT");
            ticket.updated = dateformat(ticket.updated_at, "dd mmm yyyy h:MM TT");
            updates.forEach(update => {
                update.time = dateformat(update.created_at, "dd mmm yyyy h:MM TT");
            })


            // Put updates in order of relevance
            updates.reverse();
            
            // render ticket information into ticket info page
            res.render("ticketInfo.ejs", {
                ticket: ticket,
                requester: requester.data.user,
                status: status,
                updates : updates
            });
        }))
        .catch(error => {
            let message = handleError(error);
            res.status(message.status).render("home.ejs", message);
        })
}

module.exports.allTickets = fetchTickets;
module.exports.getTicket = fetchTicketById;
