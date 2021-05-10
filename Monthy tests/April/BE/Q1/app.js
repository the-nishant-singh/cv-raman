const express = require('express');
const port = process.env.PORT || 9700;
const users = require('./users.json')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    return res.render('form')
})

app.post('/addUser', (req, res) => {
    users.push(req.body)
    return res.render('form')
})

app.get('/allUsers', (req, res) => {
    return res.send(users)
})

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})