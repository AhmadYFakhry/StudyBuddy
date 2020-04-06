const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth')
const User = require('../models/User')
var nodemailer = require('nodemailer');
const list = require('../models/List');
const task = require('../models/Task');

// Create an account
router.post('/create/user', async (req, res, next) => {
    const user = new User(req.body);
    console.log(user);
    try {
        const tk = await user.genJWT();
        await user.save();
        res.status(201).send({
            user,
            tk
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
// Send email to the new user
router.post('/send', async (req, res, next) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'studdybuddycsc301@gmail.com',
          pass: 'Studdy123'
        }
      });

    var mailOptions = {
        from: 'studdybuddycsc301@gmail.com',
        to: req.body.email,
        subject: 'Welcome to StuddyBuddy!',
        text: `Hi `+req.body.name+`, thank you for registering with Studdy Buddy! This is a confirmation email
        to ensure you have registered with us. Welcome :)`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});
// login to an existing account
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.login(req.body.email, req.body.password);
        const tk = await user.genJWT();
        res.send({ user, tk })
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }

});
router.get('/:id', async (req, res) => { //might need to make multiple requests still needs to be worked on
    const user =  await User.findOne(req.params.id)
    const userLists = await list.find({userid: { user: userid } }).toArray()
    const taskLists = await userLists.foreach()

    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.tokens = req.body.tokens;
            user.save()
                .then(() => res.json('User Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send()
    } catch (error) {
        console.log(error);
        res.status(500).send();

    }
})




module.exports = router
