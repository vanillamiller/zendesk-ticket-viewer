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
    console.log(res.data)
    // console.log(req.data);
    // console.log(ass.data);
    // console.log(org.data);
    
    
})).catch(err => {
    console.log(err.data);
})
