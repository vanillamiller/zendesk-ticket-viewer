
let email = "EMAIL"

let authToken = "TOKEN";

let tokenString = `${email}/token:${authToken}`;

let subdomain = "anthonymiller";

let basicAuthCredentials = Buffer.from(tokenString)
        .toString('base64');

module.exports = { subdomain : subdomain,
        header : { Authorization: `Basic ${basicAuthCredentials}`}};
