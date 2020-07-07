const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const dotenv = require('dotenv');

// protocol defined for mailing also added auth and used to send mails
// change your email id and password in this and mailer will use them
let transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// used for rendering templates send to browser
let renderTemplate = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log("error in rendering template", err);
                return;
            }
            else {
                mailHtml = template;
                return;
            }
        }
    );

    return mailHtml;

};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
};