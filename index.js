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

// session-cookie 
const session = require("express-session");

// Mongo store
const MongoStore = require("connect-mongo")(session);

// passport
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");


// Static files
app.use(express.static("./assets"));

// extract style and scripts into sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(expressLayouts);


// set up ejs
app.set("view engine", "ejs");
app.set("views", "./views")

// mongo store is being used to store session cookie in the db
app.use(session({
    name: "Codeial",
    // ToDo Change this secret before deployment in production-mode
    secret: "WingadiamLeviosa",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: "disabled"
    },
        function (err) {
            console.log(err || "connect-mongo setup is established!")
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// Use express router
app.use("/", require("./routes"));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in firing up the server : ${err}`);
    }
    else {
        console.log(`server is running on ${port}`);
    }
})