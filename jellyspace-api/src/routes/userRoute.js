const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/user", async (req, res) => {
  const user = await User.findOne({ "email": req.body.email });
  if (user) {
    return res.json({
      status: false,
      message: 'User already registered',
      data: ''
    });
  } else {
    return res.json({
      status: true,
      message: '',
      data: ''
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ "email": req.body.email, "password": req.body.password });
    if (user) {
      return res.json({
        status: true,
        message: 'User loggedIn Successfully',
        data: user
      });
    } else {
      return res.json({
        status: false,
        message: 'login failed',
        data: ''
      });
    }
  } catch (error) {
    console.log('error' + JSON.stringify(err));
    return res.json({
      status: false,
      message: 'login failed',
      data: ''
    });
  }

});

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ "email": req.body.email });
    if (user) {
      return res.json({
        status: false,
        message: 'User already registered',
        data: ''
      });
    }
    else {
      const userRegistration = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        accountType: req.body.accountType,
        entityName: req.body.entityName,
        dateOfInCorporation: req.body.dateOfInCorporation,
        title: req.body.title,
        mobileNo: req.body.mobileNo,
        skills: req.body.skills,
        image: req.body.image,
        street: req.body.street,
        h_number: req.body.h_number,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country
      });

      await userRegistration.save();

      return res.json({
        status: true,
        message: 'Successfully registered',
        data: userRegistration
      });
    }
  } catch (err) {
    console.log('error' + JSON.stringify(err));
    return res.json({
      status: false,
      message: 'Registration failed',
      data: ''
    });
  }
});

router.get("/users", async (req, res) => {
  const users = await User.findOne();
  if (users) {
    return res.json({
      status: true,
      message: 'Users List',
      data: users
    });
  } else {
    return res.json({
      status: false,
      message: 'Data not available',
      data: ''
    });
  }
});

router.post("/loginUser", async (req, res) => {
  const user = await User.findOne({ "email": req.body.email });
  if (user) {
    return res.json({
      status: true,
      message: '',
      data:user
    });
    
  } else {
    return res.json({
      status: false,
      message: 'User not available',
      data: ''
    });
  }
});

router.post("/deleteUser", async (req, res) => {
  const user = await User.findOne({ "email": req.body.email });
  if (user) {
    await User.deleteOne(user.id);
    return res.json({
      status: true,
      message: 'User deleted',
      data:''
    });
    
  } else {
    return res.json({
      status: false,
      message: 'User not available',
      data: ''
    });
  }
});


























// router.get("/posts", async (req, res) => {
//   const posts = await Post.find();
//   res.send(posts);
// });





// router.get("/posts/:id", async (req, res) => {
//   try {
//     const post = await Post.findOne({ id: req.params.id });
//     res.send(post);
//   } catch {
//     res.status(404);
//     res.send({ error: "Post doesn't exist!" });
//   }
// });



// router.patch("/posts/:id", async (req, res) => {
//   try {
//     const post = await Post.findOne({ id: req.params.id });



//     if (req.body.title) {
//       post.title = req.body.title;
//     }



//     if (req.body.content) {
//       post.content = req.body.content;
//     }



//     await post.save();
//     res.send(post);
//   } catch {
//     res.status(404);
//     res.send({ error: "Post doesn't exist!" });
//   }
// });



module.exports = router;