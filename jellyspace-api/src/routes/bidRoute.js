const express = require('express');
const router = express.Router();
const Bid = require('../models/bid');
const User = require('../models/user'); // Import User model
const { emailSending } = require('../common/common');
const {sequelize }= require('../config/db'); // Import your sequelize instance

// Get bids by user email
router.post('/getbids', async (req, res) => {
  try {
    const bids = await Bid.findAll({
      where: {
        userEmail: req.body.userEmail
      }
    });
    if (bids.length > 0) {
      return res.json({
        status: true,
        message: 'Bids List',
        data: bids
      });
    } else {
      return res.json({
        status: false,
        message: 'Data not available',
        data: []
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.json({
      status: false,
      message: 'Error fetching bids',
      data: []
    });
  }
});

// Get bids by project email
router.post('/getProjectBids', async (req, res) => {
  try {
    const bids = await Bid.findAll({
      where: {
        projectEmail: req.body.projectEmail
      }
    });
    if (bids.length > 0) {
      return res.json({
        status: true,
        message: 'Bids List By project',
        data: bids
      });
    } else {
      return res.json({
        status: false,
        message: 'Data not available',
        data: []
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.json({
      status: false,
      message: 'Error fetching project bids',
      data: []
    });
  }
});

// Accept or reject a bid
router.post('/acceptBid', async (req, res) => {
  try {
    const id = req.body.id;
    const [updated] = await Bid.update(
      { status: req.body.status },
      { where: { id  } }
    );

    if (updated) {
      const bidExist = await Bid.findOne({ where: { id } });
      const user = await User.findOne({ where: { email: bidExist.userEmail } });

      const htmlBodyAcceptedBid = '<!DOCTYPE html><html lang="en" style="font-family: Agency FB;"> '+
      '<head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Template 1</title></head>'+
      '<body style="font-family:Agency FB">'+
         '<header><img style="padding: 20px;margin-left: 30%;width:250px;position: absolute;top: 44px;height: 50px;" src="https://jellyspace-public.s3.amazonaws.com/email-head-image.jpeg" alt="logo"></header>'+
          '<section class="container-fluid" style="margin: 20px;"><div class="container"><p>Hi '+ user.firstName + ' ' + user.lastName + ' </p></div><div class="article" style="margin-top:45px ;"><p>Congratulations !!! <br>SpaceX has accepted your bid for the <strong> '+ bidExist.projectName +' </strong></p></div>'+
          '<div class="list"><p>What you can do now?</p><ul><li style="list-style-type: none;margin-left: 35px; margin-bottom: 20px;"><img style="width: 50px;" src="https://jellyspace-public.s3.amazonaws.com/image6.png" alt="bids"> <span style="margin-left: 20px;position: absolute;margin-top: 20px;"><strong> Finalize and Contract –</strong> Your can chat further with SpaceX and sign the contract.' +
          '</span> </li><li style="list-style-type: none;margin-left: 35px; margin-bottom: 20px;"><img style="width: 50px;" src="https://jellyspace-public.s3.amazonaws.com/cancle.png" alt="bids"> <span style="margin-left: 20px;position: absolute;margin-top: 20px;"><strong> Cancel your bid and interest –</strong> Look for other Projects on <span style="color: #92d051;"> JELLYSPACE </span></span> </li></ul></div>'+
              '<button style="background-color: #92d051;font-size: 15px;color: white;margin: 30px 0px 30px 35%;border: 1px solid #5d8b9b;">  &nbsp; &nbsp; &nbsp; Click & Proceed with a contract &nbsp; <span style="width: 20px; color: blue;">&#8680;</span></button>'+
              '<div><p>Regards,<br>The JELLYSPACE Team</p></div>'+
          '</section></body></html>'; // Use your existing HTML templates
      const htmlBodyRejectedBid = '<!DOCTYPE html><html lang="en" style="font-family: Agency FB;"> '+
      '<head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Template 1</title></head>'+
      '<body style="font-family:Agency FB">'+
         '<header><img style="padding: 20px;margin-left: 30%;width:250px;position: absolute;top: 44px;height: 50px;" src="https://jellyspace-public.s3.amazonaws.com/email-head-image.jpeg" alt="logo"></header>'+
          '<section class="container-fluid" style="margin: 20px;"><div class="container"><p>Hi '+ user.firstName + ' ' + user.lastName + ' </p></div><div class="article" style="margin-top:45px ;"><p>We are sorry !!!! <br>SpaceX has rejected your bid for the <strong> '+ bidExist.projectName +' </strong></p></div>'+
          '<div class="list"><p>What you can do now?</p><ul><li style="list-style-type: none;margin-left: 35px; margin-bottom: 20px;"><img style="width: 50px;" src="https://jellyspace-public.s3.amazonaws.com/image11.png" alt="bids"> <span style="margin-left: 20px;position: absolute;margin-top: 20px;"><strong> Look for other Projects on </strong> <span style="color: #92d051;"> JELLYSPACE </span></span> </li></ul></div>' +
              '<button style="background-color: #92d051;font-size: 15px;color: white;margin: 30px 0px 30px 35%;border: 1px solid #5d8b9b;">  &nbsp; &nbsp; &nbsp; Check & Bid on other Projects &nbsp; <span style="width: 20px; color: blue;">&#8680;</span></button>'+
              '<div><p>Regards,<br>The JELLYSPACE Team</p></div>'+
          '</section></body></html>';
      
      const htmlbody = bidExist.status === 'accepted' ? htmlBodyAcceptedBid : htmlBodyRejectedBid;
      emailSending(bidExist.userEmail, 'Bid ' + bidExist.status, htmlbody);

      return res.json({
        status: true,
        message: 'Bid was ' + req.body.status,
        data: bidExist
      });
    } else {
      return res.json({
        status: false,
        message: 'Bid not found',
        data: []
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.json({
      status: false,
      message: 'Status update failed',
      data: []
    });
  }
});

// Post a new bid with transaction handling
router.post('/postBid', async (req, res) => {
  const transaction = await sequelize.transaction(); // Start a transaction

  try {
    const user = await User.findOne({ where: { email: req.body.userEmail }, transaction }); // Include transaction
    const projectUser = await User.findOne({ where: { email: req.body.projectEmail }, transaction }); // Include transaction

    if (!user || !projectUser) {
      await transaction.rollback();
      return res.json({
        status: false,
        message: 'User or project user not found',
        data: []
      });
    }

    const newBid = await Bid.create(
      {
        projectId: req.body.id,
        projectName: req.body.projectName,
        projectEmail: req.body.projectEmail,
        bidAmount: req.body.bidAmount,
        status: req.body.status,
        rupeesId: req.body.rupeesId,
        bidDescription: req.body.bidDescription,
        userEmail: req.body.userEmail,
      },
      { transaction } // Pass the transaction object here
    );
      
    // Commit the transaction after successful creation
    await transaction.commit();

    const htmlBodyPostedBid = '<!DOCTYPE html><html lang="en" style="font-family: Agency FB;">' +
    '<head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Template 2</title></head>' +
    '<body style="font-family:Agency FB"><header><img style="padding: 20px;margin-left: 25%;width:250px;position: absolute;top: 44px;height: 50px;" src="https://jellyspace-public.s3.amazonaws.com/email-head-image.jpeg" alt="logo"></header>'+
        '<section class="container-fluid" style="margin: 20px;"><div><p>Hi '+ user.firstName + ' ' + user.lastName +', </p></div><div class="article"><p> You have successfully posted your bid for  <strong> '+ newBid.projectName +' </strong></p></div><button style="background-color: #92d051;font-size: 15px;color: white;margin: 30px 0px 30px 28%;border: 1px solid #5d8b9b;">  &nbsp; &nbsp; &nbsp; Check Your Bid &nbsp; <span style="width: 20px; color: blue;">&#8680;</span></button><div class="list"><p>What you can do now?</p>'+
        '<ul><li style="list-style-type: none;margin-left: 35px; margin-bottom: 20px;"><img style="width: 50px;" src="https://jellyspace-public.s3.amazonaws.com/image10.png" alt="bids"><span style="margin-left: 20px;position: absolute;margin-top: 20px;"><strong>Wait for the Bid Acceptance – </strong> You can view your bids details by visiting the project page.</span> </li>'+
                    '<li style="list-style-type: none;margin-left: 35px; margin-bottom: 20px;"><img style="width: 50px;" src="https://jellyspace-public.s3.amazonaws.com/image6.png" alt="bids"> <span style="margin-left: 20px;position: absolute;margin-top: 20px;">,<strong> Finalize and Contract – </strong>Once your bid is accepted you can proceed with signing the contract.</span> </li><li style="list-style-type: none;margin-left: 35px; margin-bottom: 20px;"><img style="width: 50px;" src="https://jellyspace-public.s3.amazonaws.com/image11.png" alt="bids"> <span style="margin-left: 20px;position: absolute;margin-top: 20px;"><strong> Look for other Projects meantime on</strong> <span style="color:#92d051;"> JELLYSPACE </span></span> </li></ul></div><div><p>Regards,<br>The JELLYSPACE Team</p></div>'+
        '</section></body></html>'; // Use your existing HTML templates
    const htmlBodyForProjectedBid = '<!DOCTYPE html><html lang="en" style="font-family: Agency FB;"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>'+
          '<body style="font-family:Agency FB"><header><img style="padding: 20px;margin-left: 25%;width:250px;position: absolute;top: 44px;height: 50px;" src="https://jellyspace-public.s3.amazonaws.com/email-head-image.jpeg" alt="logo"></header>'+
          '<section class="container-fluid" style="margin: 20px;"><div><p>Hi '+ projectUser.firstName + ' ' + projectUser.lastName +', </p></div><div class="article" style="margin-top:45px ;"><p>1 Professional wants to work for   <strong> '+ newBid.projectName +' </strong> <br> for you!</p></div><div class="list"><p>What you can do now?</p>'+
                  '<ul><li style="list-style-type: none;margin-left: 35px; margin-bottom: 20px;"><img style="width: 50px;" src="https://jellyspace-public.s3.amazonaws.com/image5.png" alt="bids"> <span style="margin-left: 20px;position: absolute;margin-top: 20px;"><strong> Compare – </strong> Bid-Proposals, Profiles, Background, Pricing etc. and chat with them to<br>    discuss your project.</span> </li>'+
                      '<li style="list-style-type: none;margin-left: 35px; margin-bottom: 20px;"><img style="width: 50px;" src="https://jellyspace-public.s3.amazonaws.com/image6.png" alt="bids"> <span style="margin-left: 20px;position: absolute;margin-top: 20px;"><strong> Finalize and Contract –</strong> Your preferred Company or Professional.</span> </li>'+
                      '<li style="list-style-type: none;margin-left: 35px; margin-bottom: 20px;"><img style="width: 50px;" src="https://jellyspace-public.s3.amazonaws.com/x-man.png" alt="bids"> <span style="margin-left: 20px;position: absolute;margin-top: 20px;"><strong> Reject the bid –</strong> You can either edit your Project or wait for more bids</span> </li>'+
                  '</ul></div><button style="background-color: #92d051;font-size: 15px;color: white;margin: 30px 0px 30px 65%;border: 1px solid #5d8b9b;">  &nbsp; &nbsp; &nbsp; Check to View Bids &nbsp; <span style="width: 20px; color: blue;">&#8680;</span></button>'+
              '<div><p>Regards,<br>The JELLYSPACE Team</p></div></section></body></html>';

    emailSending(newBid.userEmail, 'Project Bid', htmlBodyPostedBid);
    emailSending(newBid.projectEmail, 'Project Bid', htmlBodyForProjectedBid);

    return res.json({
      status: true,
      message: 'Successfully posted project bidding',
      data: newBid
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }// Rollback the transaction on error

    console.error('Error:', error);
    return res.json({
      status: false,
      message: 'Project bidding failed',
      errorMessage : error.message || "An error occurred",
      data : []
    });
  }
});

module.exports = router;