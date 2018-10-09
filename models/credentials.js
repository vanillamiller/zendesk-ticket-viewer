const axios = require('axios');


let credentials = Buffer.from("agmiller794@gmail.com/token:ADDgrIti7uijJFU7bWQrxKoCDGyjxVLfq6kRpNHe")
        .toString('base64');

module.exports.header = { Authorization: `Basic ${credentials}`};
        