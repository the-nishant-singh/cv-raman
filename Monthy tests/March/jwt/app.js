const express = require('express');
const app = express();
const port = process.env.PORT || 3650
const cors = require('cors');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongourl = "mongodb://localhost:27017"
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let db;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {AccessToken, RefreshToken} = require('./generateToken')
require('dotenv').config()



app.get('/', (req, res) => {
    return res.send('Server is running')
})

app.post('/register', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.send('Provide email and password')
    } else {
        db.collection('users').findOne({ email: req.body.email }, (err, collection) => {
            if (err) throw err
            if (collection) {
                return res.send('Email already Taken')
            } else {
                let hash = bcrypt.hashSync(req.body.password)
                db.collection('users').insert({ email: req.body.email, password: hash }, (err, user) => {
                    if (err) throw err
                    return res.send('User Registered')
                })
            }
        })
    }
})


app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.send('Provide email and password')
    }else{
        db.collection('users').findOne({ email: req.body.email }, (err, collection) => {
            if(err) throw err
            if(!collection){
                return res.send('Email not registered')
            }else{
                const passIsValid = bcrypt.compareSync(req.body.password, collection.password)
                if(!passIsValid){
                    return res.send('Incorrect Password')
                }else{
                    console.log(collection)
                    const Accesstoken = AccessToken(collection._id)
                    const Refreshtoken = RefreshToken(collection._id)
                    return res.send({Accesstoken, Refreshtoken})
                }
            }
        })
    }
})

app.get('/user', (req, res) => {
    let accesstoken = req.headers['x-access-token']
    if(!accesstoken) return res.status(500).send("No token Provided")
    jwt.verify(accesstoken,process.env.ACCESS_SECRET, (err, data) => {
        if(err) return res.send('Token Expired OR Invalid')
        return res.send('Hello Token is Valid')
    })
})


app.get('/newaccess', (req, res) => {
    let refreshtoken = req.headers['x-refresh-token']
    if(!refreshtoken) return res.status(500).send("No token Provided")
    jwt.verify(refreshtoken,process.env.REFRESH_SECRET, (err, data) => {
        if(err) return res.send('Token Expired OR Invalid')
        let newrefreshtoken = RefreshToken(data.id)
        let newaccesstoken = AccessToken(data.id)

        return res.send({Accesstoken : newaccesstoken, Refreshtoken : newrefreshtoken})
    })
})


MongoClient.connect(mongourl, (err, connection) => {
    if (err) throw err
    db = connection.db('jwttest')
})


app.listen(port, (err, live) => {
    if (err) throw err
    console.log('listening on port ' + port)
})

