const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task')
const user_router = require('./routers/user_route')
const task_router = require('./routers/task_route')
// const Task = require('./models/task')
const bcryptjs = require('bcryptjs')

const app = express()
const port = process.env.PORT 
//const router = express.Router()

//register route using app.use
app.use(express.json())
app.use(user_router)
app.use(task_router)

app.listen(port, () => {
    console.log('Server Starting running on ', port)
})

//multer example

// const multer = require('multer')

// const upload = multer({
//     dest: 'images',
//     limits:1000000,
//     fileFilter(req,file,cb){
      
//    if ( !file.originalname.match(/\.(doc|docx)$/)){
//        cb(new Error('please upload doc or docx file'))
//    }
//    cb(undefined,true)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()

// })

// const run = async () => { 
//     const task = await Task.findById('5df150a24202762ba8fa539e')
//    await task.populate('owner').execPopulate()
//     console.log(task.tasks)
// //     const user = await User.findById('5df150a24202762ba8fa539e')
// //     await user.populate('tasks').execPopulate()
// //     console.log(user.tasks)
// }
// run()


