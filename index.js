const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const fileUpload = require('express-fileupload')


const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bmktyor.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect();
        const database = client.db("Nijosso");
        const usersCollection = database.collection('users');

        app.get("/users", async (req, res) => {
            // const users = usersCollection.find({});

            res.send(usersCollection);

        })
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Nijosso')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})