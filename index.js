const express = require('express')
const app = express()
const crudUser = require ('./routes/crudUser')
const crudTask = require ('./routes/crudTask')
const chemin = require('path')
require('dotenv').config()

const taskRoute = require('./routes/tasks')

//middleware
app.use(express.json())
app.use(express.urlencoded());

//localhost:5173/createUser
app.use(express.static(chemin.join(__dirname, 'front')));
app.use('/todolist' , taskRoute, crudUser, crudTask)

app.listen(process.env.PORT || 3000, () => {
    console.log("je suis sur le port 3000")
}) 