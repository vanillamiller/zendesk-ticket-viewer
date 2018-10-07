const axios = require("axios");

module.exports.fetchAllTickets = axios.get("https://anthonymiller.zendesk.com/api/v2/tickets.json",
        {
            auth: {
                username: 'agmiller794@gmail.com',
                password: 'Evilboy4lif3!'
            }
        });
