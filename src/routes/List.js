const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const List = require('../models/List');
const Task = require('../models/Task');

// Create a list
router.post('/list/create', auth, async (req, res) => {
    const title = req.body.title;
    const newList = new List({
        title,
        userid: req.user.id
    })//need to get list id from mongo and then add to the User db
    //changed code here
    listId = newList._id;
    // await user.update({name: user}, $push: {lists: listId});
    //end of change
    newList.save()
    .then(() => {
        res.status(201).json(newList);
    }
    )
    .catch(err => {
        res.status(400).json('Error: ' + err);
    })
});

// Gets all existing lists givern the user ID
router.get('/list/getAll/', auth, async (req, res) => {
    try {
        const user = req.user
        let lists = [];
        // console.log(user._id)
        const listIds = await List.find({userid: user._id});
        // console.log(listIds);
        for(let i = 0; i < listIds.length; i++) {
            const tasks = await Task.find({ listid: listIds[i]._id });
            const obj = {
                listId: listIds[i]._id,
                listTitle: listIds[i].title,
                tasks
            };
            lists.push(obj);
        }
        // console.log(lists);
        res.status(200).send({lists});
    } catch (error) {
        res.status(404).send("Error: list not found")
    }
});

// Deletes a list
router.delete('/list/delete/:id', auth, async (req, res) => {
    try {
        await Task.deleteMany({
            listid: req.params.id
        })
        await List.findByIdAndDelete(req.params.id);
        res.status(200).send();
    } catch (error) {
        res.status(404).send();
    }
})

router.post('/list/update/:id', auth, async (req, res) => {
    try {
        await List.findByIdAndUpdate(req.params.id, {
            title: req.body.title
        })
        res.status(200).send();
    } catch (error) {
        res.status(404).send();
    }
})


// Adds a task to the list
// Adds a list to the user's current lists (DO LATER)
// router/('/list/addlist/:id', auth, async(req, res) => {
//     const list = req.body.list;
//     try {
//         const tasks = await list.addTask(task);
//         res.status(200).send({tasks})
//     } catch (error) {
//         res.status(400).send();
//     }
// })


module.exports = router;