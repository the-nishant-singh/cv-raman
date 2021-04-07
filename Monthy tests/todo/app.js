const express = require('express');
const app = express();
const port = process.env.PORT || 4000
const cors = require('cors');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongourl = "mongodb://localhost:27017"
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const session = require("express-session")
let db;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()

app.use(express.static(__dirname + '/public'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(session({ secret: 'youcangiveanythinghere'}))


app.get('/', (req, res) => {
    if (req.session.token) {
        return res.redirect('/todos')
    }
    let succmessage = req.query.succmessage ? req.query.succmessage : ""
    let errmessage = req.query.errmessage ? req.query.errmessage : ""
    return res.render('login', { errmessage, succmessage })
})

app.get('/registeruser', (req, res) => {
    let errmessage = req.query.errmessage ? req.query.errmessage : ""
    return res.render('register', { errmessage })
})


//register user
app.post('/register', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.redirect('/registeruser/?errmessage=Provide email and password')
    } else {
        db.collection('users').findOne({ email: req.body.email }, (err, collection) => {
            if (err) throw err
            if (collection) {
                return res.redirect('/registeruser/?errmessage=Email already Taken')
            } else {
                let hash = bcrypt.hashSync(req.body.password)
                db.collection('users').insert({ email: req.body.email, password: hash }, (err, user) => {
                    if (err) throw err
                    return res.redirect('/?succmessage=Your are registered, try to login')
                })
            }
        })
    }
})

//login user
app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.redirect('/?errmessage=Provide email and password')
    } else {
        db.collection('users').findOne({ email: req.body.email }, (err, collection) => {
            if (err) throw err
            if (!collection) {
                return res.redirect('/?errmessage=Email not registered')
            } else {
                const passIsValid = bcrypt.compareSync(req.body.password, collection.password)
                if (!passIsValid) {
                    return res.redirect('/?errmessage=Incorrect Password')
                } else {
                    let token = jwt.sign({ id: collection._id, email: collection.email }, process.env.ACCESS_SECRET, { expiresIn: '1y' })
                    req.session.token = token
                    return res.redirect('/todo')
                }
            }
        })
    }
})


//logoutuser
app.get('/logout', (req, res) => {
    req.session.token = null
    return res.redirect('/?succmessage=Logout Successfull')
})


//todos
app.get('/todo', (req, res) => {
    let succmessage = req.query.succmessage ? req.query.succmessage : ""
    let errmessage = req.query.errmessage ? req.query.errmessage : ""
    if (req.session.token) {
        let token = req.session.token
        jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
            console.log(data)
            db.collection('tasks').find({ email: data.email, done: false }).toArray((err, notdone) => {
                if (err) throw err
                db.collection('tasks').find({ email: data.email, done: true }).toArray((err, completed) => {
                    if (err) throw err
                    return res.render('todo', { errmessage, succmessage, notdone: notdone.reverse(), completed : completed.reverse() })
                })
            })
        })
    } else {
        return res.redirect('/?errmessage= Login First')
    }

})

//add todos
app.post('/addtodo', (req, res) => {
    if (req.session.token) {
        let token = req.session.token
        jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
            db.collection('users').findOne({ email: data.email }, (err, user) => {
                if (err) throw err
                if (!req.body.details) {
                    return res.redirect('/todo/?errmessage="Enter Something"')
                }
                db.collection('tasks').insert({
                    email: user.email,
                    details: req.body.details,
                    date: new Date(),
                    done: false
                }, (err, task) => {
                    if (err) throw err
                    return res.redirect('/todo/?succmessage="Todo Added"')
                })
            })
        })
    } else {
        return res.redirect('/?errmessage= Login First')
    }
})

//checkposts
app.get('/check/:id', (req, res) => {
    if (req.session.token) {
        let token = req.session.token
        jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
            db.collection('users').findOne({ email: data.email }, (err, user) => {
                if (err) throw err
                db.collection('tasks').update({ email: user.email, _id: mongodb.ObjectId(req.params.id) }, {
                    $set: {
                        done: true
                    }
                }, (err, result) => {
                    if (err) throw err
                    return res.redirect('/todo/?succmessage=Marked as Completed')
                })
            })
        })
    } else {
        return res.redirect('/?errmessage= Login First')
    }
})

//uncheck todo status
app.get('/uncheck/:id', (req, res) => {
    if (req.session.token) {
        let token = req.session.token
        jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
            db.collection('users').findOne({ email: data.email }, (err, user) => {
                if (err) throw err
                db.collection('tasks').update({ email: user.email, _id: mongodb.ObjectId(req.params.id) }, {
                    $set: {
                        done: false
                    }
                }, (err, result) => {
                    if (err) throw err
                    return res.redirect('/todo/?succmessage=Marked as Not Completed')
                })
            })
        })
    } else {
        return res.redirect('/?errmessage= Login First')
    }
})

//edit todos
app.post('/edit/:id', (req, res) => {
    console.log("body>>>>", req.body)
    console.log("params>>>>", req.params)
    if(!req.body.details){
        return res.redirect('/todo/?errmessage= enter something')
    }
    if (req.session.token) {
        let token = req.session.token
        jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
            db.collection('users').findOne({ email: data.email }, (err, user) => {
                if (err) throw err
                db.collection('tasks').update({ email: user.email, _id: mongodb.ObjectId(req.params.id) }, {
                    $set: {
                        details: req.body.details
                    }
                }, (err, result) => {
                    if (err) throw err
                    return res.redirect('/todo/?succmessage= todo updated')
                })
            })
        })
    } else {
        return res.redirect('/?errmessage= Login First')
    }
})

//delete todo
app.get('/delete/:id', (req, res) => {
    if (req.session.token) {
        let token = req.session.token
        jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
            db.collection('users').findOne({ email: data.email }, (err, user) => {
                if (err) throw err
                db.collection('tasks').remove({ email: user.email, _id: mongodb.ObjectId(req.params.id) },(err,result) => {
                    if (err) throw err
                    return res.redirect('/todo/?succmessage=Todo Deleted')
                })
            })
        })
    } else {
        return res.redirect('/?errmessage= Login First')
    }
})

MongoClient.connect(mongourl, (err, connection) => {
    if (err) throw err
    db = connection.db('todos')
})

app.listen(port, (err, connection) => {
    if (err) throw err
    console.log(`server is running on port ${port}!!`)
})