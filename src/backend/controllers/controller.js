var jwt = require('jsonwebtoken');
const sql = require('../db/sql');

module.exports = {

    getScores: async (req, res) => {
        let scores = await sql.getScores(req, res);
        console.log("scores: ", scores);
        if (scores.length > 0) {
            res.status(200).json(scores);
        }
        else {
            res.status(400).json({ error: 'No scores found' });
        }
    },

    addNewScore: async (req, res) => {

        console.log("req.body: ", req.body);
        let newScore = await sql.addNewScore(req.body.score, req.body.idgame, req.body.idplayers);
        console.log("newScore: ", newScore);
        if (newScore.insertId > 0) {
            res.status(200).json(newScore);
        }
        else {
            res.status(400).json({ error: 'Oops something went wrong' });
        }
    },

    getCurrentPlayerScore: async (req, res) => {

        let scores = await sql.getCurrentPlayerScore(req.body.idplayers);
        console.log("scores: ", scores);
        if (scores.length > 0) {
            res.status(200).json(scores);
        }
        else {
            res.status(404).json({ error: 'No scores found' });
        }
    },

    addNewUser: async (req, res) => {

        console.log("req.body: ", req.body);
        let user = await sql.checkExistingUsers(req.body.username, req.body.password);
        console.log("user: ", user);
        if (user.length > 0) {
           return res.status(400).json({ error: 'User already exists' });
        }
        else {
            let newUser = await sql.addNewUser(req.body.username, req.body.password, req.body.nickname);
            console.log("newUser: ", newUser);
            if (newUser.insertId > 0) {
                res.status(200).json(newUser);
            }
            else {
                res.status(400).json({ error: 'Oops something went wrong' });
            }
        }
    },

    loginUser: async (req, res) => {

        let user = await sql.checkExistingUsers(req.body.username, req.body.password);
        console.log("user: ", user);
        if (user.length > 0) {
            let token = jwt.sign({ nickname: user[0].nickname, idplayers: user[0].idplayers }, 'catn1p0t');
            res.status(200).json({ token: token });
        }
        else{
            res.status(400).json({ error: 'User not found' });
        }
    }

    
}