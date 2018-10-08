const axios = require('axios');
const credentials = require('../models/credentials');

const ticketsPerPage = 25;

let fetchTickets = function (req, res) {
    
    let page = req.query.page || 1;
    axios.get("https://anthonymiller.zendesk.com/api/v2/tickets.json?page=" + page + "&per_page=" + ticketsPerPage,
        {
            auth: {
                username: credentials.email,
                password: credentials.password
            }

        }).then(response => {

            let tickets = response.data.tickets;
            let total_tickets = response.data.count;
            let hasPrevPage = Boolean(response.data.previous_page);
            let hasNextPage = Boolean(response.data.next_page);
            let pages = Math.ceil(total_tickets/ticketsPerPage);

            if (page > pages){
                res.redirect("tickets/?page=" + pages);
            } else if (page < 1){
                res.redirect("tickets/?page=1")
            }
            console.log(response);
            res.render('index.ejs', { 
                tickets: tickets,
                total_tickets : total_tickets,
                pages : pages 
            });

        }).catch(error => {
            
            let message = error.response.data.error;
            //console.log(error.response.data);
            res.render('index.ejs', { error: message });

        });
}

// let fetchTicketById = function(req, res){
//     let ticketId = req.params.id;

//     axios.get("https://anthonymiller.zendesk.com/api/v2/tickets/" + ticketId + ".json",
//     {
//         auth: {
//             username: credentials.email,
//             password: credentials.password
//         }

//     }).then(response => {

//         let ticket = response.data.ticket;

//         let peopleInvolved = {
//             requester : ticket.requester_id,
//             assignee : ticket.assignee_id,
//         };
//         return peopleInvolved;
//     }).catch(err => {

//     });
// } 

module.exports.allTickets = fetchTickets;