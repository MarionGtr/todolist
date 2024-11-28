const express = require('express')
const app = express()
const crudUser = require ('./routes/crudUser')
const crudTask = require ('./routes/crudTask')
const LoginCheck = require ('./routes/LoginCheck')
const chemin = require('path')
const cors = require('cors')
require('dotenv').config()

const taskRoute = require('./routes/tasks')
const bodyParser = require('body-parser')

//middleware
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded());
app.use(cors())



//localhost:5173/createUser
app.use(express.static(chemin.join(__dirname, 'front')));

// app.use('/todolist' , taskRoute, crudUser, crudTask)
app.use('todolist/user', crudUser)
app.use('/todolist/task', crudTask)


app.listen(process.env.PORT || 3000, () => {
    console.log("je suis sur le port 3000")
}) 