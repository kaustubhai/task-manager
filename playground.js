require('./src/database/mongoose')
const Tasks = require('./src/models/tasks')

// Tasks.findByIdAndDelete("5f7420508027d033ecfda33f").then((res) => {
//     console.log(res)
//     return Tasks.countDocuments({'completed' : false})
// }).then((res) => {
//     console.log(res)
//     return res
// }).catch((e) => {
//     console.log(e)
// })

// const fun = async () => {
//     const update = await Tasks.updateMany({ completed: true }, { completed: false })
//     const count = await Tasks.countDocuments({completed: true})
//     return count;
// }

// fun().then((res) => {
//     console.log(res)
// }).catch((e) => {
//     console.log(e)
// })

const fun2 = async (id) => {
    const task = await Tasks.findOneAndDelete(id);
    const count = await Tasks.countDocuments();
    return count
}

fun2("5f741d28eb9f7d1b103d5071").then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
})



// {
    // "_id" : ObjectId("5f741d28eb9f7d1b103d5071"),
    // "completed" : true,
    // "desc" : "Say hi to Michaell",
    // "__v" : 0
// }