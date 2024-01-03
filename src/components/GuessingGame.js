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
    const [score, setScore] = useState(0);
    const [newScore, setNewScore] = useState(0);
    const [player, setPlayer] = useState('');
    const [info, setInfo] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        RandomizeNumber();
        sessionStorage.getItem("token") ? setPlayer(decodeToken(sessionStorage.getItem("token"))) : window.location.href = "/home";
        GetScores();
        // GetCurrentPlayerScore();
    }, []);

    const GetScores = async () => {
        console.log("fetching");
        let response = await fetch("http://localhost:3004/scores");
        if (response.ok) {
            console.log("Scores:", response);
            let scores = await response.json();
            console.log("scores: ", scores);
            setScores(scores);
            // setScore(scores[0].score)
        }
        else {
            console.log("no scores");
            setScores([]);
        }
    }

    const AddScore = async (points) => {
        let response = await fetch("http://localhost:3004/addscores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ score: points, idgame: 1, idplayers: player.idplayers }),
        });
        if (response.ok) {
            console.log("AddingScores:", response);
            let scores = await response.json();
            console.log("addingscores: ", scores);
            GetScores();
            // setScores(scores);
            // setScore(scores[0].score)
        }
        else {
            console.log("no scores");
            // setScores([]);
        }
    }

    const RandomizeNumber = () => {
        let x = Math.floor(Math.random() * 9) + 1;
        setNumber(x);
    }
    const Guess = (e) => {
        console.log("score: ", score);
        console.log("tries: ", tries);
        console.log("event:", e)
        if (e.target.id === `win` && tries < 1 && winner === false) {
            e.target.src = '/Winner.png';
            let points = 10
            setWinner(true);
            // setNewScore(score + 5);
            AddScore(points);
            setStatus('You Win');


        }
        else if (e.target.id === `win` && tries < 2 && winner === false) {
            e.target.src = '/Winner.png';
            let points = 5
            setWinner(true);
            // setNewScore(score + 2);
            AddScore(points);
            setStatus('You Win');
        }
        else if (e.target.id === `win` && tries < 3 && winner === false) {
            e.target.src = '/Winner.png';
            let points = 2
            setWinner(true);
            // setNewScore(score + 1);
            AddScore(points);
            setStatus('You Win');

        }
        else if (e.target.id === "" && winner === false) {
            console.log("try again:", e.target.id);
            setStatus("You already guessed this block");
            // setIsSelected(false);
        }
        else if (tries === 2 && winner === false) {
            e.target.src = "/Loser.jpg";
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
            // console.log("Inner html:", e.target.innerHTML);
            e.target.src = `/Loser.jpg`;
            e.target.id = "";
        }

    }

    const ReloadPage = () => {
        window.location.reload();
    }

    return (
        <div>

            <Navbar bg="light" expand="lg" className="navbar" style={{ justifyContent: "space-between" }}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Navbar.Brand style={{ marginLeft: "10px" }}>Guessing Game</Navbar.Brand>
                        <NavDropdown title="Rules"><Nav.Item>Find the princess in three tries or less <br></br><br></br>
                            You get 10 points if you guess right away<br></br>You get 5 points if you guess in 2 tries<br></br>You get 2 points if you guess in 3 tries<br></br></Nav.Item></NavDropdown>


                        <Nav.Item>{info}</Nav.Item>


                        <Nav.Link href="/home">home</Nav.Link>
                        <Nav.Link onClick={() => ReloadPage()}>Reload</Nav.Link>

                    </Nav>
                    <Nav className="ms-auto" style={{ marginRight: "25px" }} >
                        <Nav.Item style={{ fontStyle: "italic", fontSize: "20px", textAlign: "left" }}>Welcome {player.nickname}</Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container fluid>
                <Row style={{ marginLeft: "16%", fontSize: "20px", fontStyle: "italic"  }}>{status}
                </Row>
                <Row>
                    <Col className="guessingMain">

                        {Array.from({ length: 9 }, (_, i) => (

                            <img style={{ margin: "15px" }} onClick={(e) => Guess(e)} className={`guessingBlock`} key={i + 1 * 255} id={i + 1 === number ? "win" : "lose"} src="/LandScape.png" alt="Logo" />

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