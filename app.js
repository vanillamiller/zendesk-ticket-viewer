const express = require('express');
const app = express();
const path = require('path');

//set view engine to embedded javaScript
app.set('view engine', 'ejs');

//set static path for style elements
app.use(express.static(path.join(__dirname, 'public')))

const router = require("./routes/router");
app.use('/', router);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})