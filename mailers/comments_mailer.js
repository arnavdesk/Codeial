const mailer = require("../config/nodemailer");
const dotenv = require('dotenv');


// method for sending forgot password mail
module.exports.newCommentMailer = (comment) => {
    let htmlString = mailer.renderTemplate({ comment:comment }, '/comments/new_comment.ejs');
    console.log("inside new comment mailer", comment);
    mailer.transporter.sendMail({
        from: process.env.EMAIL,
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString,
    }, (err, info) => {
        if (err) {
            console.log("mail sending failed", err);
            return;
        }
        console.log("Message Sent", info);
        return;
    })
}