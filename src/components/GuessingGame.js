import { React, useEffect, useState } from "react";
import { NavLink, Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useJwt, decodeToken } from "react-jwt";
import Table from 'react-bootstrap/Table'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



function GuessingGame() {
    const [number, setNumber] = useState(0);
    const [tries, setTryTimes] = useState(0);
    const [winner, setWinner] = useState(false);
    const [scores, setScores] = useState([]);
    const [playerScores, setPlayerScores] = useState([]);
    const [player, setPlayer] = useState('');
    const [info, setInfo] = useState('');
    const [status, setStatus] = useState('');
    const [gameid, setGameid] = useState(1);

    useEffect(() => {
        RandomizeNumber();
        sessionStorage.getItem("token") ? setPlayer(decodeToken(sessionStorage.getItem("token"))) : window.location.href = "/home";
        GetScores();
        GetPlayerScores(decodeToken(sessionStorage.getItem("token")));
        // console.log("playerscores: ", playerScores)
    }, []);

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

    const UpdateScore = async (score) => {
        console.log("updating: ", playerScores, " ", score);
        let response = await fetch("http://localhost:3004/updatescores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idscores: playerScores[0].idscores, score: score + playerScores[0].score }),
        });
        if (response.ok) {
            GetScores();
        }
    }

    const GetPlayerScores = async (player) => {
        console.log("fetching: ", player);
        let response = await fetch("http://localhost:3004/playerscores?idplayers=" + player.idplayers + "&idgame=" + gameid);
        if (response.ok) {
            let scores = await response.json();
            setPlayerScores(scores);
        }
        else {
            setPlayerScores([]);
        }
    }

    const RandomizeNumber = () => {
        let x = Math.floor(Math.random() * 9) + 1;
        setNumber(x);
    }
    const Guess = (e) => {

        if (e.target.id === number.toString() && tries < 1 && winner === false) {
            e.target.src = '/guessing/Winner.png';
            let points = 10
            setWinner(true);
            playerScores.length > 0 ? UpdateScore(points) : AddScore(points);
            setStatus('You Win');


        }
        else if (e.target.id === number.toString() && tries < 2 && winner === false) {
            e.target.src = '/guessing/Winner.png';
            let points = 5
            setWinner(true);
            playerScores.length > 0 ? UpdateScore(points) : AddScore(points);
            setStatus('You Win');
        }
        else if (e.target.id === number.toString() && tries < 3 && winner === false) {
            e.target.src = '/guessing/Winner.png';
            let points = 2
            setWinner(true);
            playerScores.length > 0 ? UpdateScore(points) : AddScore(points);
            setStatus('You Win');

        }
        else if (e.target.id === "" && winner === false) {
            setStatus("You already guessed this block");
        }
        else if (tries === 2 && winner === false) {
            e.target.src = "/guessing/Loser.jpg";
            setTryTimes(tries + 1);
            setStatus('Game over');

        }
        else if (tries > 2 && winner === false) {
            setStatus('Game over, try again by reloading the page');
        }
        else if (winner) {
            setStatus('You won, try again by reloading the page');
        }
        else {
            setTryTimes(tries + 1);
            e.target.src = `/guessing/Loser.jpg`;
            e.target.id = "";
        }

    }

    return (
        <div>

            <Navbar bg="light" expand="lg" className="navbar" style={{ justifyContent: "space-between" }}>
                <Navbar.Brand style={{ marginLeft: "10px" }}>Guessing Game</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Rules"><Nav.Item>Find the hidden figure in three tries or less <br></br><br></br>
                            You get 10 points if you guess right away<br></br><br></br>You get 5 points if you guess in 2 tries<br></br><br></br>You get 2 points if you guess in 3 tries<br></br></Nav.Item></NavDropdown>
                        <Nav.Item>{info}</Nav.Item>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link onClick={() => window.location.reload()}>Restart</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto" style={{ marginRight: "25px" }} >
                        <Nav.Item style={{ fontStyle: "italic", fontSize: "20px", textAlign: "left" }}>Welcome {player.nickname}</Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container className="background" fluid style={{ textShadow: "0.5px 0.5px 0.5px black" }}>
                <Row style={{ marginLeft: "16%", fontSize: "20px", fontStyle: "italic" }}>{status}
                </Row>
                <Row>
                    <Col className="guessingMain">

                        {Array.from({ length: 9 }, (_, i) => (
                            <Image roundedCircle style={{ margin: "15px" }} onClick={(e) => Guess(e)} className={`guessingBlock`} key={i + 1 * 255} id={i + 1 === number ? number : i + 1} src="/guessing/LandScape.png" alt="Logo" />
                        ))}
                    </Col>
                    <Col>
                        <Table>
                            <thead>
                                <tr><th>#</th><th>Score</th><th>Player name</th></tr>
                            </thead>
                            <tbody>
                                {scores ? scores.map((score, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{score.score}</td>
                                        <td>{score.nickname}</td>
                                    </tr>
                                )) : <p>No scores</p>}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}

export default GuessingGame