const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth')
const User = require('../models/User')
// var nodemailer = require('nodemailer');
const List = require('../models/List');
const Task = require('../models/Task');

// Create an account
router.post('/create/user', async (req, res, next) => {
    const user = new User(req.body);
    try {
        const tk = await user.genJWT();
        await user.save();
        res.status(201).send({
            user,
            tk
        });
    } catch (error) {
        res.status(400).send(error);
    }
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
router.get('/user/get/:id', async (req, res) => {
    // console.log(req.params.id)
    let lists = [];
    const user = await User.findById(req.params.id);
    // console.log(user);
    const listIds = await List.find({userid: user._id});
    for(let i = 0; i < listIds.length; i++) {
        const tasks = await Task.find({ listid: listIds[i]._id });
        const obj = {
            listId: listIds[i]._id,
            listTitle: listIds[i].title,
            tasks
        };
        lists.push(obj);
    }
    console.log(lists);
});

router.post('/user/update/:id', auth, (req, res) => {
    console.log(req.body)
    try {
        if(req.body.type === 'inc') {
            const user = User.findById(req.params.id);
            console.log(user);
            User.findByIdAndUpdate(req.params.id, {
                completedTasks: user.completedTasks++
            })
        }
    } catch (error) {
        console.log(error);
    }
    // if(req.body.completedTasks) {
    //     console.log(req.body.completedTasks);
    // }
    // if(req.)
    // User.findById(req.params.id)
    //     .then(user => {
    //         user.name = req.body.name;
    //         user.email = req.body.email;
    //         user.save()
    //             .then(() => res.json('User Updated!'))
    //             .catch(err => res.status(400).json('Error: ' + err));
    //     })
    //     .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send()
    } catch (error) {
        res.status(500).send();

    }
})




module.exports = router
