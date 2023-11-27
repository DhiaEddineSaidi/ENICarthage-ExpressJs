const  express = require('express');

const cors = require('cors')

const  {connectToDb , getDb} = require('./db')

const port = 3000

const app = express()

let db 

connectToDb((err)=>{
  if(!err){
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
  })
  db = getDb()
  }

})

app.use(cors())
app.use(express.json())


  app.route('/users')
    .get((req, res)=> {
      db.collection('person').find().toArray().then(results=>{
        console.log(results);
        res.contentType('application/json');
        res.status(200).json(results)
      })
    })

    app.route('/users')
    .post((req, res) => {
      console.log(req.body);
      db.collection('person').insertOne(req.body);
      res.contentType('application/json');
      res.status(201).json(req.body)
    })

    app.route('/users/:_id')
    .get((req, res) => {
      console.log(req.params);
      db.collection('person').findOne({_id: parseInt(req.params._id) }).then(result => {
        console.log(result);
        res.contentType('application/json');
        res.status(200).json(result)
      })
    })
    // .put((req, res) => {
    //   console.log(req.params);
    //   db.collection('person').findOneAndUpdate({
    //     _id: ObjectId(req.body._id)
    //   }, {
    //     $set: { nom: req.body.nom, prenom: req.body.prenom }
    //   }).then(result => {
    //     res.contentType('application/json');
    //     res.status(200).json(JSON.stringify(result))
    //   })
    // })
    // .delete((req, res) => {
    //   console.log(req.body);
    //   db.collection('person').deleteOne({
    //     _id: ObjectId(req.body._id)
    //   }).then(result => {
    //     console.log("deleting Object with : ", req.body._id);
    //     if (result.deletedCount === 0) {
    //       res.contentType('application/json')
    //       res.status(200).json(JSON.stringify({ status: req.body._id + " is deleted" }))
    //     }
    //   })
    // })



 const me = {
     nom: 'Saidi',
     prenom: 'DhiaEddine',
     age: 31,
     dateNaissance: new Date(2023, 11, 29)
 }

app.get('/me', (req, res) => {
    console.log(req)
    res.json(me)
})

// app.post('/me', async  (req,res)=> {
//     const data = req.body    
//     const client = new MongoClient("mongodb://127.0.0.1:27017");
//           try {
//             await  client.connect();
//             const database = client.db('me-database'); // Choose a name for your database
//             const collection = database.collection('person'); // Choose a name for your collection
//             console.log(req)
//             await collection.insertOne(data);
//             res.status(201).json({ message: 'Data saved successfully!' });
//           } catch (error) {
//             res.status(500).json({ message: 'Something went wrong!' });
//           } finally {
//             await client.close();
//           }   
// })

