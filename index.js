const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8000;
const expressLayouts = require("express-ejs-layouts");

// read request
app.use(express.urlencoded());

// cookie parser
app.use(cookieParser());


// MongoDB
const db = require("./config/mongoose");

// Static files
app.use(express.static("./assets"));

// extract style and scripts into sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(expressLayouts);



// Use express router
app.use("/", require("./routes"));

// set up ejs
app.set("view engine", "ejs");
app.set("views", "./views")



app.listen(port, function (err) {
    if (err) {
        console.log(`Error in firing up the server : ${err}`);
    }
    else {
        console.log(`server is running on ${port}`);
    }
})