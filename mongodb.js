//CRUD - Create, Read, Update, Delete

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Task-Manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error)
        return console.log('Error occured with database')
    
    //select if present else create database with the databaseName
    const db = client.db(databaseName);

    // to Adding any document into the collection
    // inserting one document with 4 fields by insertOne function
    db.collection('Main').insertOne({
        task: 'Say hello to Meredith',
        taskStatus: true
    }).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })

    //to Read the data from collection
    const res = db.collection('Main').find({ taskStatus: true })
    res.toArray().then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    //To Update any value in the collection
    db.collection('Main').updateOne({ _id: ObjectId("5f70e7e765e24e3cc875159b") }, { $set: { taskStatus: false } }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })

    //to Delete any value in the collection
    db.collection('Main').deleteOne({ _id: ObjectId("5f70e7e765e24e3cc875159b") }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
})


    // db.collection('task-manager').insertMany([{
    //     description: 'Say hello to Ms. Martini',
    //     completed: false
    // },
    // {
    //     description: 'Complete OS assignment',
    //     completed: true
    // },
    // {
    //     description: 'Complete this course ASAP',
    //     completed: false
    // }],(error, result) => {
    //     if (error)
    //         return console.log('Cant establish database')
    //     console.log(result.ops)
    // })