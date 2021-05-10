const express = require('express')
let app = express()
const cors = require('cors')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const mongourl = "mongodb://localhost:27017"
const port = process.env.PORT || 9700
let db
const validation = require('./validation/validator')
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


app.use(express.static(__dirname + '/public'))
app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/health', (req, res) => {
    return res.send('Health OK')
})


app.get('/', (req, res) => {
    let errmessage = req.query.errmessage ? req.query.errmessage : ""
    let succmessage = req.query.succmessage ? req.query.succmessage : ""
    data = {
        name: req.query.name ? req.query.name : "",
        email: req.query.email ? req.query.email : "",
        scale: req.query.scale ? req.query.scale : "",
        emotion: req.query.emotion ? req.query.emotion : "",
        description: req.query.description ? req.query.description : ""
    }
    console.log(data)
    return res.render('index', { errmessage, succmessage, data })
})

app.post('/postsurvey', (req, res) => {
    let details = {
        name: req.body.name,
        email: req.body.email,
        scale: req.body.scale,
        time: req.body.time,
        emotion: req.body.emotion,
        place: req.body.place,
        description: req.body.description,
    }

    errmessage = validation(details)

    if (errmessage) {
        res.redirect(`/?errmessage=${errmessage}&name=${details.name}&email=${details.email}&scale=${details.scale}&palce=${details.place}&description=${details.description}`)
    } else {
        db.collection('data').insert(details, (err, success) => {
            if (err) throw err
            console.log(details)
            return res.redirect('/?succmessage=Your Response Has Been Recorded, Thankyou!')
        })
    }
})

app.get('/getdata', (req, res) => {
    db.collection('data').find({}).toArray((err, result) => {
        if(err) throw err
        const json2csvParser = new Json2csvParser({ header: true });
        const csvData = json2csvParser.parse(result);
        fs.writeFile("./exports/exportedfile.csv", csvData, (error) => {
            if (error) throw error;
            return res.redirect('/?succmessage=Data Exported!')
          });
    })
})

MongoClient.connect(mongourl, (err, connection) => {
    if (err) throw err
    db = connection.db('test')
})


app.listen(port, (err) => {
    if (err) throw err
    console.log(`Server is running on port ${port}!`)
})
