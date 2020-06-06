const express = require("express");
const app = express();
const port = 8000;

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in firing up the server : ${err}`);
    }
    else {
        console.log(`server is running on ${port}`);
    }
})