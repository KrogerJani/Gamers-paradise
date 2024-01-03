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
    
    getScores: () => {
        return executesql('SELECT s.score, p.nickname, s.idgame FROM scores AS s JOIN players AS p ON s.idplayers = p.idplayers ORDER BY s.score desc');
    },

    getCurrentPlayerScore: (idplayers) => {
        return executesql('SELECT * FROM scores WHERE idplayers = ?', [idplayers]);
    },

    addNewScore: (score, idgame, idplayers) => {
        return executesql('INSERT INTO scores (score, idgame, idplayers) VALUES (?, ?, ?)', [score, idgame, idplayers]);
    },

    addNewUser: (username, password, nickname) => {
        return executesql('INSERT INTO players (username, password, nickname) VALUES (?, ?, ?)', [username, password, nickname]);
    },

    checkExistingUsers: (username, password) => {
        return executesql('SELECT * FROM players WHERE username = ? AND password = ?', [username, password]);
    }


}