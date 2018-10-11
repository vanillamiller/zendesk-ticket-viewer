
let email = "agmiller794@gmail.com"

let authToken = "ADDgrIti7uijJFU7bWQrxKoCDGyjxVLfq6kRpNHe";

let tokenString = `${email}/token:${authToken}`;

let subdomain = "anthonymiller";

let basicAuthCredentials = Buffer.from(tokenString)
        .toString('base64');

module.exports = { subdomain : subdomain,
        header : { Authorization: `Basic ${basicAuthCredentials}`}};
