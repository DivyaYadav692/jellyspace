const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const { emailSending } = require('../common/common');
const User = require("../models/user");
const Bid = require("../models/bid");
const { sequelize } = require('../config/db'); // Adjust path as needed

// Get projects by user email
router.post("/getProjects", async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { userEmail: req.body.email }, // Filter by user email
      include: [
        {
          model: Bid,
          as: 'bids' // The alias you have set for the association
        }
      ]
    });

    if (projects.length > 0) {
      return res.json({
        status: true,
        message: 'Projects list by email',
        data: projects
      });
    } else {
      return res.json({
        status: false,
        message: 'Data not available',
        data: ''
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
      data: err.message
    });
  }
});

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: Bid,
          as: 'bids'
        }
      ]
    });

    if (projects.length > 0) {
      return res.json({
        status: true,
        message: 'Projects List',
        data: projects
      });
    } else {
      return res.json({
        status: false,
        message: 'Data not available',
        data: ''
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
      data: err.message
    });
  }
});


// Post a new project
router.post("/postAProject", async (req, res) => {
  try {
    const projectPosting = await Project.create({
      projectId: req.body.id, 
      projectName: req.body.projectName,
      projectDescription: req.body.projectDescription,
      skills: req.body.skills,
      billingProcess: req.body.billingProcess,
      budget: req.body.budget,
      projectType: req.body.projectType,
      userEmail: req.body.userEmail
    });

    const user = await User.findOne({ where: { email: req.body.userEmail } });

    const htmlbodyForpostedProject = `
      <!DOCTYPE html>
      <html lang="en" style="font-family: Agency FB;">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Template 2</title>
      </head>
      <body style="font-family:Agency FB">
          <header>
              <img style="padding: 20px;margin-left: 25%;width:250px;position:absolute;top:44px;height:50px;" src="https://jellyspace-public.s3.amazonaws.com/email-head-image.jpeg" alt="logo">
          </header>
          <section class="container-fluid" style="margin: 20px;">
              <div><p>Hi ${user.firstName} ${user.lastName}, </p></div>
              <div><p>You have successfully posted your project!</p></div>
              <div class="article" style="margin-top:45px;">
                  <p>Your project details for <strong>${projectPosting.projectName}</strong> have now been notified to hundreds of companies and professionals across the globe.</p>
              </div>
              <div class="list">
                  <p>What you can do now?</p>
                  <ul>
                      <li style="list-style-type:none;margin-left:35px;margin-bottom:20px;">
                          <img style="width:50px;" src="https://jellyspace-public.s3.amazonaws.com/image4.png" alt="bids"> 
                          <span style="margin-left:20px;position:absolute;margin-top:20px;"><strong>Receive Bids –</strong> You can view their bids by visiting the project page</span> 
                      </li>
                      <li style="list-style-type:none;margin-left:35px;margin-bottom:20px;">
                          <img style="width:50px;" src="https://jellyspace-public.s3.amazonaws.com/image5.png" alt="bids"> 
                          <span style="margin-left:20px;position:absolute;margin-top:20px;"><strong>Compare –</strong> Bid-Proposals, Profiles, Background, Pricing etc. and chat with them to discuss your project.</span> 
                      </li>
                      <li style="list-style-type:none;margin-left:35px;margin-bottom:20px;">
                          <img style="width:50px;" src="https://jellyspace-public.s3.amazonaws.com/image6.png" alt="bids"> 
                          <span style="margin-left:20px;position:absolute;margin-top:20px;"><strong>Finalize and Contract –</strong> Your preferred Company or Professional</span> 
                      </li>
                  </ul>
              </div>
              <div><p style="position:absolute;margin-top:-10%;">Get Your Project Started!</p></div>
              <button style="background-color:#92d051;font-size:15px;color:white;margin-top:-10%;border:none;">Check bids on your project <span style="color:#5d8b9b;">&#8680;</span></button>
              <div><p>Regards,<br>The JELLYSPACE Team</p></div>
          </section>
      </body>
      </html>`;
    
    emailSending(projectPosting.userEmail, projectPosting.projectName, htmlbodyForpostedProject);

    return res.json({
      status: true,
      message: 'Successfully Project Posted',
      data: projectPosting
    });

  } catch (err) {
    console.log('error' + JSON.stringify(err));
    
    return res.status(500).json({
      status: false,
      message: 'Project Posting failed',
      data: err.message
    });
  }
});

router.post("/deleteProject", async (req, res) => {
  console.log('Incoming request body:', req.body); // Log the incoming request body

  const { projectId } = req.body.id; // Ensure you are destructuring id from the request body

  if (!projectId) {
      return res.status(400).json({
          status: false,
          message: 'Project ID is required',
      });
  }

  try {
      const deletedProject = await Project.destroy({
          where: { projectId } // Use the id value in the condition
      });

      if (deletedProject) {
          return res.json({
              status: true,
              message: 'Project deleted successfully',
          });
      } else {
          return res.json({
              status: false,
              message: 'Project not found',
          });
      }
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          status: false,
          message: 'An error occurred while deleting the project',
          data: err.message
      });
  }
});


module.exports = router; 
