const express = require('express');
const bdd = require('../bdd');
const router = express.Router();
const jwt = require('jsonwebtoken')



//route création utilisateur
router.post('/createUser', (req, res) => {
    const { nom, mail, mdp } = req.body;
    const hashedPassword = bcrypt.hashSynch(mdp, 1)
    const insertUser = 'insert into users (nom, mail, mdp) values (?,?,?);';
    bdd.query(insertUser, [nom, mail, hashedPassword], (res, erreur) => {
        if (erreur) throw erreur;
        //res.send("user inscrit");
        // res.redirect('http://localhost:5173/createUser');
    });
});

//route lecture utilisateur

router.get('/readUser', (req, res) => {
    const readUser = "select * from users;";
    bdd.query(readUser, (erreur, results) => {
        if (erreur) throw erreur;
        res.json(results);
    });
})
// route lecture utilisateur par ID
router.get('/readUserByID/:id', (req, res) => {
    const { id } = req.params;
    const readUserByID = 'select * from users where id_user=?;'
    bdd.query(readUserByID, [id], (erreur, results) => {
        if (erreur) throw erreur;
        res.json(results);
    });
})

//route mise à jour utilisateur
router.post('/updateUser/:id', (req, res) => {
    const { id} = req.params;
    const {nom, mail, mdp} = req.body;
    // les accolades ci dessus renvoient un fichier json 
    const updateUser = "UPDATE users SET nom = ?, mail = ?, mdp = ? WHERE id_user = ?;"
    bdd.query(updateUser, [nom, mail, mdp, id], (erreur, results) => {
        if (erreur) throw erreur;
        res.json(results)
        // res.redirect('../update.html');
    });
});

//route suppression utilisateur
router.post('/deleteUser/:id', (req, res) => {
    const {id}  = req.params
    const deleteUser = "DELETE FROM users WHERE id_user = ?;"
    bdd.query(deleteUser, [id], (erreur, results) => {
        if(erreur) throw erreur,
        res.json(results)
        // res.redirect('../delete.html');
    });
});

//route connexion utilisateur
router.post('connexion' , (req,res) => {
    const {mail, mdp} = req.body

})

// const token = jwt.sign({id:user.idUser}, 'secretkey' , {expiresIn : '3h'})
//res.json({token})
// } else {
//     res.status(401).send('password incorrect')
// }




module.exports = router;