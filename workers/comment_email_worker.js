const queue = require("../config/kue");

const commentsMailer = require("../mailers/comments_mailer");


queue.process("emails", function(job,done){
    console.log("Emails Worker is Processing a job", job.data);
    commentsMailer.newCommentMailer(job.data);
    done();
})

