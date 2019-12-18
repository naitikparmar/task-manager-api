//CRUD create read update delete

const mongodb = require('mongodb')
const mongoclient = mongodb.MongoClient
const {ObjectID}=require('mongodb')

//destrucring object 
//const { mongodb , MongoClient } = require('mongodb')

//const connectionURL = ''
const databaseName = 'task-manger'

mongoclient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log(error)
    }
    
    const db = client.db(databaseName)
})


