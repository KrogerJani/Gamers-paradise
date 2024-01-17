var jwt = require('jsonwebtoken');
const sql = require('../db/sql');
const bcrypt = require('bcrypt');

module.exports = {

    getScores: async (req, res) => {
        let gameid = req.query.gameid
        let scores = await sql.getScores(gameid);
        if (scores.length > 0) {
            res.status(200).json(scores);
        }
        else {
            res.status(400).json({ error: 'No scores found' });
        }
    },

    addNewScore: async (req, res) => {
        let newScore = await sql.addNewScore(req.body.score, req.body.idgame, req.body.idplayers);
        if (newScore.insertId > 0) {
            res.status(200).json(newScore);
        }
        else {
            res.status(400).json({ error: 'Oops something went wrong' });
        }
    },

    updateScore: async (req, res) => {
        console.log(req.body)
        let updatedScore = await sql.updateScore(req.body.idscores, req.body.score);
        if (updatedScore.affectedRows > 0) {
            res.status(200).json(updatedScore);
        }
        else {
            res.status(400).json({ error: 'Oops something went wrong' });
        }
    },

    getCurrentPlayerScore: async (req, res) => {

        let scores = await sql.getCurrentPlayerScore(req.query.idplayers, req.query.idgame);
        if (scores.length > 0) {
            res.status(200).json(scores);
        }
        else {
            res.status(400).json({ error: 'No scores found' });
        }
    },

    getCurrentPlayerScores: async (req, res) => {
        let scores = await sql.getCurrentPlayerScores(req.params.id);
        if (scores.length > 0) {
            res.status(200).json(scores);
        }
        else {
            res.status(400).json({ error: 'No scores found' });
        }
    },

    addNewUser: async (req, res) => {

        let user = await sql.checkExistingUsers(req.body.username);

        if (user.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        else {
            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            let newUser = await sql.addNewUser(req.body.username, hashedPwd, req.body.nickname);

            if (newUser.insertId > 0) {
                res.status(200).json(newUser);
            }
            else {
                res.status(400).json({ error: 'Oops something went wrong' });
            }
        }
    },

    loginUser: async (req, res) => {

        let user = await sql.checkExistingUsers(req.body.username);

        if (user.length > 0) {
            console.log(user)
            const match = await bcrypt.compare(req.body.password, user[0].password);
            if (match) {
                let token = jwt.sign({ nickname: user[0].nickname, idplayers: user[0].idplayers }, 'catn1p0t');
                res.status(200).json({ token: token });
            }
        }
        else {
            res.status(400).json({ error: 'User not found' });
        }
    }


}