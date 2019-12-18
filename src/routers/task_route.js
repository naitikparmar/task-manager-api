const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = express.Router()


router.post('/tasks', auth, async (req, res) => {
    //const task1 =new Task(req.body)
    const task1 = new Task({
        ...req.body,
        owner: req.user._id//passing owener from auth 
    })

    try {
        await task1.save()
        res.send(task1)

    } catch (e) {
        res.send(e)

    }

})

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.sortBy) {

        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1

    }

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        //method 1 using set condition in find ({})

        // const task = await Task.find({ owner: req.user._id })
        // res.send(task)

        // //method 2 using populate 
        const user = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {

        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send({ error: 'no task found' })
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})


router.patch('/task/:id', auth, async (req, res) => {
    const _id = req.params.id

    const Updates = Object.keys(req.body)
    const allowedupdate = ['task_des', 'completed']
    const validation = Updates.every((update) => {
        return allowedupdate.includes(update)

    })
    if (!validation) {
        res.status(404).send({ error: 'CAN NoT UPDATE' })
    }
    try {
        //   const task =await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true}) 
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            res.status(400).send('eroor')
        }
        Updates.forEach((udpate) => task[udpate] = req.body[udpate])
        task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/task/:id', auth, async (req, res) => {
    //   const _id = req.params.id
    try {
        //  const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOneAndDelete({ id: req.body.params, owner: req.user._id })
        if (!task) {
            res.status(404).send('No Data found')
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router