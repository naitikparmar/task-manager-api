const  mongoose=require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useCreateIndex:true,
    useNewUrlParser:true
})

// 
// const task1 = new Task({task_des:'Description not available',completed:'true'})

// task1.save().then(()=>{
//     console.log('Success',task1)
// }).catch((error)=>{
//     console.log('Error',error)
// })