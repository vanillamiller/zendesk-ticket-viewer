let zendesk = require("node-zendesk");
let axios = require("axios");
let header = require("./models/credentials");

let client = zendesk.createClient({
    username: 'agmiller794@gmail.com',
    token: '4MM7gOVhYqNl6HZxurm8ohrSYP3R8WxnwfzuA1Pv',
    remoteUri: 'https://anthonymiller.zendesk.com/api/v2',
    oauth : false
  });

  let query = "type:ticket+page:1+per_page:3";

//   client.search.query(query, function (err, req, result) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(JSON.stringify(result, null, 2, true));
//   });


 let test = function(){
    axios.get(`https://anthonymiller.zendesk.com/api/v2/tickets/1.json`, header)
    .then(response => {

        let ticket = response.data.ticket;

        let peopleInvolved = {
            requester : ticket.requester_id,
            assignee : ticket.assignee_id,
            submitter : ticket.submitter_id
        };
        console.log(peopleInvolved);
        return peopleInvolved
        
    })
    .then(peopleInvolved => {

        let requester = peopleInvolved.requester;
        let assignee = peopleInvolved.assignee;
        let submitter = peopleInvolved.submitter;
       
        return axios.all([
            axios.get(`https://anthonymiller.zendesk.com/api/v2/users/${requester}.json`,
            header),
            axios.get(`https://anthonymiller.zendesk.com/api/v2/users/${assignee}.json`,
            header),
            axios.get(`https://anthonymiller.zendesk.com/api/v2/users/${submitter}/organizations.json`,
            header)
          ])
          .then(axios.spread((req, ass) => {
             console.log(organ);
          })).catch(err => {
                console.log(err.data);
          })

})}

test();
