import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Figure from "react-bootstrap/Figure";
import Image from "react-bootstrap/Image";
import { useJwt, decodeToken } from "react-jwt";
import Table from "react-bootstrap/Table";


export default function FindAPair() {


    const [images, setImages] = useState([
        'Cloud.png',
        'Cloud.png',
        'Sun.png',
        'Sun.png',
        'Rainbow.png',
        'Rainbow.png',
        'Star.png',
        'Star.png',
        'Spiral.png',
        'Spiral.png',
        'Planet.png',
        'Planet.png'
    ]);
    const initialImageSources = images.map(() => "/findpair/Pohja.png");
    const [imageSources, setImageSources] = useState(initialImageSources);
    const [selectedImages, setSelectedImages] = useState([]);
    const [totalGuesses, setTotalGuesses] = useState(0);
    const [guesses, setGuesses] = useState(0);
    const [player, setPlayer] = useState();
    const [pairs, setPairs] = useState([]);
    const [currentCard, setCurrentCard] = useState();
    const [previousId, setPreviousId] = useState();
    const [info, setInfo] = useState('');
    const [scores, setScores] = useState([]);
    const [gameid, setGameid] = useState(2);


    useEffect(() => {
        sessionStorage.getItem("token") ? setPlayer(decodeToken(sessionStorage.getItem("token"))) : window.location.href = "/home";
        setImages(MakeArrayForImages())
        GetScores();
    }, [])

    const AddScore = async (total) => {
        let response = await fetch("http://localhost:3004/addscores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ score: total, idgame: gameid, idplayers: player.idplayers }),
        });
        if (response.ok) {
            GetScores();
        }
    }

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

    const MakeArrayForImages = () => {

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
        shuffleArray(images);

        return images
    }

    const changeImageSource = (index, newSource) => {
        setImageSources(prevImageSources => {
            const updatedImageSources = [...prevImageSources];
            if (index.length > 1) {
                for (let i = 0; i < index.length; i++) {
                    updatedImageSources[index[i]] = newSource;
                }
                return updatedImageSources;
            }
            else {
                updatedImageSources[index] = newSource;
                return updatedImageSources;
            }
        });
    };


    const BlockClick = (event, index) => {
        // console.log(guesses, clicks)
        if (guesses > 1 || selectedImages.includes(index)) {
            console.log("Already selected", selectedImages)
            setInfo('Already selected');
            return
        }
        if (pairs.length > 5) {
            setInfo('You won! you can start a new game by clicking "Restart"');
            return
        }
        // setTimeout(() => {
           
        // }, 2500)
        setSelectedImages([...selectedImages, index])
        setInfo('')
        setGuesses(guesses + 1)
        
        changeImageSource(index, '/findpair/' + images[index])
        event.target.src = "/findpair/" + images[event.target.id]

        if (guesses < 1) {
            setCurrentCard(event.target.src)
            setPreviousId(event.target.id)
            return
        }
        if (currentCard === event.target.src) {
            let total = totalGuesses + 1      
            setTotalGuesses(totalGuesses + 1)
            setPairs([...pairs, currentCard])
            setSelectedImages([])
            setGuesses(0)
            if (pairs.length == 5) {
                setTimeout(() => {
                    console.log("Total: " + total)
                    setInfo('You won! You can start a new game by clicking "Restart"');
                    AddScore(total);
                    return
                }, 500)

            }
            return
        }
        else {
            console.log("wrong!")
            setTotalGuesses(totalGuesses + 1)
            let ids = [previousId, index]
            setTimeout(() => {

                changeImageSource(ids, "/findpair/Pohja.png");
                setGuesses(0)
                setCurrentCard("")
                setPreviousId("")
                setSelectedImages([])
            }, 2000)
          

        }

    }

    return (
        <div>
            <Navbar className="bg-body-tertiary" expand="lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <Navbar.Brand style={{marginLeft: "10px"}}>Find a pair</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link onClick={() => window.location.reload()}>Restart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid className="justify-content-center" style={{ backgroundColor: "rgba(58, 198, 213, .1)", textShadow: "0.5px 0.5px 0.5px black", height: "100vh" }}>
                <Row>
                    <Col style={{ textAlign: "center", fontStyle: "oblique", backgroundColor: "rgba(58, 198, 213, .1)" }} className="d-flex justify-content-center"><h3>Guesses: {totalGuesses}</h3> </Col>
                    <Col style={{ textAlign: "center", fontStyle: "oblique", backgroundColor: "rgba(58, 198, 213, .1)" }} className="d-flex justify-content-center"> {info}</Col>
                </Row>
                <Row className="d-flex justify-content-space-between">
                    <Col id="findapair">
                        {images?.map((image, index) => (
                            <Image
                                className={selectedImages.includes(index) ? "selected" : "not-selected"} src={imageSources[index]} alt="FindAPair" rounded id={index} key={index} onClick={(e) => BlockClick(e, index)} />
                        ))}
                    </Col>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Guesses</th>
                                    <th>Player name</th>

                                </tr>
                            </thead>
                            <tbody>
                                {scores?.map((score, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{score.score}</td>
                                        <td>{score.nickname}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}