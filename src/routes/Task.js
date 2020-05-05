const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
//added this
const list = require ('../models/List');
//Output all tasks
router.get('/', auth, (req, res) => {
    Task.find()
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Output a SPECIFIC task by its id
router.get('task/get/:id', auth, (req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Update a task by sending in its id and using a post command
router.post('/task/update/:id', auth, async (req, res)  => {
  const sourcelistid = req.body.sourcelist;
  const destlistid = req.body.destlist;
  const taskid = req.params.id;

  try {
    await list.update({name: sourcelistid},{$pull: {tasks: taskid }})
    await list.update({name: destlistid}, {$push: {tasks: taskid }})
  } catch (e) {
    res.status(400).send(e);
  }


});


//An entry for a post request to create a task
router.post('/task/create', auth, async (req, res) => {
    // const listid = req.body.listid;
    const content = req.body.content;
    const listid = req.body.listid;
    const task =  new Task({
        content,
        completed: false,
        listid
    })
    try {
        await task.save()
        //put task in list of user
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

//An entry for a post request to delete a task
router.delete('/task/delete/:id', auth, async (req, res) => {
    // console.log(req.body);
    const id = req.params.id;
    try {
        // const task = await Task.findById(id);
        // console.log(task);
        // if (!task) return res.status(404).send();
        await Task.deleteOne({
            _id: id
        })
        // await list.update({name: task.listid}, {$push: {tasks: task._id }})
        res.send();
    } catch (e) {
        res.status(400).send(e);
    }
});





module.exports = router
