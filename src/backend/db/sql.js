var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mygamingdb'
});

const executesql = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results, fields) => {
            error ? reject(error) : resolve(results);
        })
    })
};

module.exports = {

    getScores: (gameid) => {
        let desc = 'DESC';
        if (gameid == 2) {
            desc = 'ASC';
        }
        return executesql('SELECT s.score, p.nickname, s.idgame FROM scores AS s JOIN players AS p ON s.idplayers = p.idplayers Where s.idgame = ? ORDER BY s.score ' + desc + '', [gameid]);
    },

    getCurrentPlayerScore: (idplayers, idgame) => {
        return executesql('SELECT * FROM scores WHERE idplayers = ? AND idgame = ?', [idplayers, idgame]);
    },

    getCurrentPlayerScores: (id) => {
        return executesql('SELECT * FROM scores WHERE idplayers = ?', [id]);
    },

    addNewScore: (score, idgame, idplayers) => {
        return executesql('INSERT INTO scores (score, idgame, idplayers) VALUES (?, ?, ?)', [score, idgame, idplayers]);
    },

    updateScore: (idscores, score) => {
        return executesql('UPDATE scores SET score = ? WHERE idscores = ?', [score, idscores]);
    },

    addNewUser: (username, password, nickname) => {
        return executesql('INSERT INTO players (username, password, nickname) VALUES (?, ?, ?)', [username, password, nickname]);
    },

    checkExistingUsers: (username) => {
        return executesql('SELECT * FROM players WHERE username = ?', [username]);
    }


}