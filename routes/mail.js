var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET regular course page. */
router.post('/', function(req, res, next) {
    console.log("The request body is: ");
    console.log(req.body);
  
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'multilingua2013@gmail.com', // Your email id
            pass: 'ML_school_2013' // Your password
        }
    });
  
    var mailOptions = {
        from: req.body.email,
        to: 'multilingua2013@gmail.com',
        subject:'Email through contact form Multilingua School',
        text: 'You have received a new message from your website contact form.\n\nHere are the details:\n\nName: ' + req.body.name + '\nEmail: ' 
        + req.body.email + '\nPhone: ' + req.body.phone + '\nMessage: ' + req.body.message
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({failure: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({
              "success": 'Your message was sent',
              "next steps": "I will respond to your email shortly" 
            });
        };
    });
});

module.exports = router;
