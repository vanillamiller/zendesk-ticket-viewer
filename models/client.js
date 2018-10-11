const axios = require("axios");
const header = require("./credentials").header;
const subdomain = require("./credentials").subdomain;

// Create axios client with appropriate
let zendeskClient = axios.create({
    baseURL : `https://${subdomain}.zendesk.com/api/v2/`,
    headers : header
});

module.exports.zendeskClient = zendeskClient;