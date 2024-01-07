const GetScores = async () => {
    console.log("fetching");
    let response = await fetch("http://localhost:3004/scores?gameid=" + gameid);
    if (response.ok) {
        let scores = await response.json();
        setScores(scores);
    }
    else {
        setScores([]);
    }
}

const AddScore = async (points) => {
    let response = await fetch("http://localhost:3004/addscores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: points, idgame: gameid, idplayers: player.idplayers }),
    });
    if (response.ok) {
        GetScores();
    }

}