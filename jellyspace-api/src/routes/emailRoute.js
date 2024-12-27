const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
const { emailSending } = require('../common/common');

router.post("/sendEmail", async (req, res) => {
    try {
        const htmlbody = '<!DOCTYPE html>' +
            '<html><head><title>Jelly-space</title>' +
            '</head><body><div>' +
            '<img src="" alt="" width="160">' +
            '<p>Thank you for your bidding.</p>' +
            '<p>Here is summary:</p>' +
            '<p>Name: Pradeep</p>' +
            '<p>Date: 11-29-2022</p>' +
            '<p>amount: 100000000000$</p>' +
            '</div></body></html>';

        emailSending('nageswararao.g31@gmail.com,pradeepreddya@outlook.com', 'Jelly-space', htmlbody);
        return res.json({
            status: true,
            message: 'Successfully Sent',
            data: {}
        });
    } catch (err) {
        console.log('error' + JSON.stringify(err));
        return res.json({
            status: false,
            message: 'email failed',
            data: ''
        });
    }
});



module.exports = router;