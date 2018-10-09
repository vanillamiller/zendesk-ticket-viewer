let axios = require("axios");
let header = require("./credentials").header;

let zendeskClient = axios.create({
    baseURL : "https://anthonymiller.zendesk.com/api/v2/",
    headers : header
});

module.exports.zendeskClient = zendeskClient;