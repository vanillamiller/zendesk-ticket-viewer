let axios = require("axios");
let header = require("./models/credentials").header;
let zendesk = require("./models/client").zendeskClient;


zendesk.get("tickets/100.json").then(res =>{
    
    return axios.all([
    zendesk.get(`users/367205874074.json`),
    zendesk.get(`users/367205874074.json`),
    zendesk.get(`users/367205874074/organizations.json`),
    res
    
])}).then(axios.spread((req, ass, org, res) => {
    console.log(res.data.created_at.getTime())
    
})).catch(err => {
    console.log(err.data);
})
