const express = require('express');
const bdd = require('../bdd');
const router = express.Router();

//route création task
router.post('/createTask', (req, res) => {
    console.log(req.body);

    const { nom_task, description } = req.body;
    const insertTask = 'insert into tasks (nom_task, description) values (?,?);';
    bdd.query(insertTask, [nom_task, description], (erreur) => {
        if (erreur) throw erreur;
        res.send("user inscrit");
        // res.redirect('http://localhost:5173/createUser');
    });
});

//route lecture task
router.get('/readTask', (req, res) => {
    const readTask = "SELECT * FROM tasks;"
    bdd.query(readTask, (erreur, results) => {
        if (erreur) throw erreur;
        res.json(results);

    });
});
// route lecture task par ID
router.get('/readTaskByID/:id', (req, res) => {
    const { id } = req.params;
    const readTaskByID = 'select * from tasks where id_task=?;'
    bdd.query(readTaskByID, [id], (erreur, results) => {
        if (erreur) throw erreur;
        res.json(results);
    });
})

//route mise à jour task
router.post('/updateTask/:id', (req, res) => {
    const { id } = req.params;
    const { nom_task, description } = req.body;
    // les accolades ci dessus renvoient un fichier json 
    const updateTask = "UPDATE tasks SET nom_task = ?, description = ? WHERE id_task = ?;"
    bdd.query(updateTask, [nom_task, description, id], (erreur, results) => {
        if (erreur) throw erreur;
        res.json(results)
        // res.redirect('../update.html');
    });
});

//route suppression task
router.post('/deleteTask/:id', (req, res) => {
    const { id } = req.params
    const deleteTask = "DELETE FROM tasks WHERE id_task = ?;"
    bdd.query(deleteTask, [id], (erreur, results) => {
        if (erreur) throw erreur,
            res.json(results)
        // res.redirect('../delete.html');
    });
});


const authentification = (req, res) => {
    const token = req.headers['authorization']
    if (token) {
        console.log('token reçu', token)
        JsonWebTokenError.verify(token.split(' ')[1], 'secretkey', (error, decode) => {
            if (error) {
                console.log('erreur de vérification du token:', error)
                console.log(token)
                return res.status(401).send('token incorrect')
            } else {
                req.id_user = decode.id
                
            }

        })

    } else {

        res.status(401).send('aucun token')
    }
}




module.exports = router;