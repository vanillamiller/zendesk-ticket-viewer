const express = require('express');
const app = express();
const path = require('path');

//set view engine to embedded javaScript
app.set('view engine', 'ejs');



const router = require("./routes/router");
app.use('/', router);

//set static path for style elements
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})