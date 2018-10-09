let axios = require("axios");
let header = require("./credentials").header;
let subdomain = require("./credentials").subdomain;

let zendeskClient = axios.create({
    baseURL : `https://${subdomain}.zendesk.com/api/v2/`,
    headers : header
});

module.exports.zendeskClient = zendeskClient;