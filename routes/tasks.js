const express = require('express')
const router = express.Router()
const bdd = require('../bdd')

router.get('/task', (req, res) => {
    const getAllTasks = "SELECT * FROM tasks"

    bdd.query(getAllTasks, (error, result) => {
        if (error) throw error
        res.json(result)
    })
})


module.exports = router;