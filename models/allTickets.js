const axios = require("axios");

module.exports.fetchAllTickets = axios.get("https://anthonymiller.zendesk.com/api/v2/tickets.json?per_page=25",
        {
            auth: {
                username: 'agmiller794@gmail.com',
                password: 'changeme'
            },
            
        });
