![Zendesk logo](zendesk-256.png)

# Zendesk Ticket Viewer
> A simple express 4 web app for the Zendesk tickets challenge

This app connects to my Zendesk account, lists all tickets which can be clicked on
to display relevant information about the tickets

## Installing / Getting started

Make sure nodejs and npm (node package manager) are installed on your machine.

You can check with the following commands

```shell
node -v
npm -v
```

If it is not installed you can download both from the following link:

https://nodejs.org/en/download/

cd into the zendesk-challenge directory and type the following commands

```shell
npm install
npm start
```

The app is now running on localhost:5000 or the environment defined port


### Initial Configuration

The app is configured to access my account as specified in the challenge spec.
However you can change the relevant credentials in models/credentials.

## Testing

Make sure the the project is installed as per the 'Getting started section'

cd into zendesk-challenge and install developer dependencies by running the command

```shell
npm install --only=dev
```

You can now run the tests through the follwing command

```shell
npm test
```

These tests include

Happy path tests
* Test whether client can connect to API and list tickets
* Test pagination
* Test getting specific ticket

Sad path test (test if the appropriate error in returned and friendly message displayed)
* Invalidly formatted pagination query string
* Accessing non existant page through pagination query string
* Invalidly formatted ticket#
* Nonexistant ticket#

## Features

Zendesk viewer can
* Connect to the Zendesk API
* Request all the tickets for your account
* Display them in a list
* Display individual ticket details including responses
* Page through tickets when more than 25 are returned

## Configuration

No additional configuration is required as the challenge stated that no additional 
functionality besides the above features was to be implemented.

## Links

To find out more about the packages used in this project see the below links
- express: https://www.npmjs.com/package/express
- axios: https://www.npmjs.com/package/axios
- ejs: https://www.npmjs.com/package/ejs
- dateformat: https://www.npmjs.com/package/dateformat
