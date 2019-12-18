const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task_des:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:true

    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'

    }
},{
    timestamps:true
})


// taskSchema.pre('save',async function(next){
//     const task = this
//     if(task.isModified('task_des'))
        
//     }
    
//     next()
// })

const Task = mongoose.model('tasks',taskSchema)
module.exports =Task