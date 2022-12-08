const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
// const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000



// userName : myPortfolio
// password : xPUwp2gJQLPC56Xf



const uri = "mongodb+srv://myPortfolio:xPUwp2gJQLPC56Xf@cluster0.w4v9v80.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const projectCollection = client.db('project').collection('allProjects')

        app.get('/allproject', async (req, res) => {
            const query = {}
            const result = await projectCollection.find(query).toArray()
            res.send(result)
        })


        app.get('/projects', async (req, res) => {
            const query = req.query.catagory
            const search = { catagory: query }
            console.log(query)
            const result = await projectCollection.find(search).toArray()
            console.log('data', result)
            res.send(result)
        })
    }
    finally { }

}

run().catch(e => console.log(e))

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`server running port is ${port}`)
})