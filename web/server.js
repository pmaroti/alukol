const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
const ObjectID = require('mongodb').ObjectID

var db;

MongoClient.connect('mongodb://db:27017/test', (err, client) => {
  if (err) return console.log(err)
  db = client.db('test') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(express.static('public'))
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/test',(req, res) => {
    db.collection('inventory').find().toArray(function(err, results) {
        if (err) return console.log(err)
        console.log(results)
        res.json(results)
      })
})

app.get('/items/:projectId', function(req, res) {
    console.log("projectId: ",req.params.projectId )
    db.collection('inventory').find({$and: [{ "projectnr" : Number(req.params.projectId)}, {"rowState": { $ne: "deleted"}}, {"rowState": { $ne: "preActive"}}] }).toArray(function(err, results) {
        if (err) return console.log(err)
        console.log(results)
        res.json(results)
    })
});

app.get('/maxId/:projectId', function(req, res) {
    console.log("projectId: ",req.params.projectId )
    db.collection('inventory').find({ "projectnr" : Number(req.params.projectId)}).sort({id:-1}).limit(1).toArray(function(err, results) {
        if (err) return console.log(err)
        console.log(results)
        const maxId = results[0]['id'];
        res.json(maxId)
    })
});

app.post('/items/:projectId', function(req, res) {
    console.log("projectId: ",req.params.projectId )
    console.log("item:", req.body);
    console.log("request:", req);
    db.collection('inventory').insertMany(req.body, function(err, results) {
        if (err) return console.log(err)
        console.log(results)
        res.json(results)
    })
});

app.delete('/items/:projectId', function(req, res) {
    console.log("projectId: ",req.params.projectId )
    console.log("item:", req.body);
    //console.log("request:", req);

    const itemIdsToDelete = req.body.map((trx) => {
        return (new ObjectID.createFromHexString(trx["_id"]));
    });

    console.log("item ids to delete", itemIdsToDelete);

    db.collection('inventory').updateMany({ _id: {$in : itemIdsToDelete}}, { $set: { "rowState" : "deleted" } } , function(err, results) {
        if (err) return console.log(err)
        console.log(results)
        res.json(results)
    })
});



app.get('/projects',(req, res) => {
    db.collection('inventory').aggregate(
        {"$group": { "_id": { projectnr: "$projectnr", projectname: "$projectname" } } },
        function(err, results) {
            if (err) return console.log(err)
            console.log("aaaa")
            results.toArray(function(eerr,data){
                if(eerr) {
                    console.log("bbbb")
                    return
                } else {
                    console.log(data);
                    if (err) return console.log(err)
                    const projects = data.map((trx) => {
                        return ({projectnr: trx["_id"]["projectnr"], projectname: trx["_id"]["projectname"] });
                    });
                    console.log(projects);
                    res.json(projects)
                }
            })
        }
    )
})

app.post('/test',(req, res) => {
    console.log(req.body)
    db.collection('inventory').insertOne(req.body, function(err, results) {
        if (err) return console.log(err)
        console.log(results)
        res.json(results)
      })
})

console.log("valami");
