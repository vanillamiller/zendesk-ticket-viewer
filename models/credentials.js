var zendesk = require('node-zendesk');

// let client = zendesk.createClient({
//     username:  'agmiller794@gmail.com',
//     token:     '4MM7gOVhYqNl6HZxurm8ohrSYP3R8WnwfzuA1Pv',
//     remoteUri: 'https://anthonymiller.zendesk.com/api/v2',
//     oauth: false
//   });

  

module.exports.credentials = Buffer.from("agmiller794@gmail.com/token:4MM7gOVhYqNl6HZxurm8ohrSYP3R8WxnwfzuA1Pv")
        .toString('base64');