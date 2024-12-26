//import dotenv from "dotenv";
var nodemailer = require('nodemailer');

//dotenv.config();

const emailSending = async (toEmail, subject, htmlbody) => {
    var myEmail = "info.jellyspace@gmail.com";
    var pass = "jellyspace@123";
    var appKey = "qfhzdfwagbdhifav";
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        
        secure: true, // true for 465, false for other ports
        auth: {
            user: myEmail,
            pass: appKey
        },
        port: 465,
    });

    var mailOptions = {
        from: 'info.jellyspace@gmail.com',
        to: toEmail,
        subject: subject,
        html: htmlbody
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Email not sent: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = { emailSending };