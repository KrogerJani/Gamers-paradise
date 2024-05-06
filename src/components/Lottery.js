import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { decodeToken } from "react-jwt";

const Lottery = () => {

    const [numbers, setNumbers] = useState([]);
    const [allDrawnLotteryNumbers, setAllDrawnLotteryNumbers] = useState([]);
    const [tries, setTries] = useState(0);
    const [cost, setCost] = useState(1);
    const [extranumber, setExtranumber] = useState(0);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [winningNumbers, setWinningNumbers] = useState([]);
    const [start, setStart] = useState(false);
    const [player, setPlayer] = useState('');

    useEffect(() => {
        sessionStorage.getItem("token") ? setPlayer(decodeToken(sessionStorage.getItem("token"))) : window.location.href = "/home";
        GenerateNumbers();
    }, []);

    const GenerateNumbers = () => {
        let numbers = [];
        Array.from({ length: 7 }).map((_, i) => {
            let number = Math.floor(Math.random() * 40) + 1
            while (numbers.includes(number)) {
                number = Math.floor(Math.random() * 40) + 1
            }
            numbers.push(number)
        })
        let extranumber = Math.floor(Math.random() * 40) + 1
        while (numbers.includes(extranumber)) {
            extranumber = Math.floor(Math.random() * 40) + 1
        }
        setNumbers(() => numbers);
        setExtranumber(extranumber);

    }

    const SelectNumber = (num) => {
        if (start) {
            return;
        }
        if (selectedNumbers.includes(num)) {
            setSelectedNumbers(selectedNumbers.filter(n => n !== num))
            return
        }
        if (selectedNumbers.length == 7)
            return

        setSelectedNumbers([...selectedNumbers, num])

    }

    const StartGame = () => {
        if (start) {
            return;
        }
        setStart(true)
        let winningNumbers = []
        selectedNumbers.map((num, i) => {
            if (numbers.includes(num)) {
                winningNumbers.push(num)
            }
        })
        setWinningNumbers(winningNumbers)
    }

    const CheckHowManyTriesItTakes = () => {
        let localCheck = false
        let tries = 0;
        let allLotteryNumbers = [];
        let numbers = []
        try {
            if (start) {
                return;
            }
           
            while (!localCheck && tries < 50000000) {
                let winningNumbers = []    
                selectedNumbers.forEach((num) => {
                    if (numbers.includes(num)) {
                        winningNumbers.push(num)
                       
                    }
                })
                numbers.forEach((num) => {
                    allLotteryNumbers.push(num)
                })
            
                if (winningNumbers.length == 7) {
                    localCheck = true
                    console.log("Winning Numbers: ", winningNumbers)
                    console.log("WINNER WINNER CHICKEN DINNER, IT TOOK: ", tries, " TRIES")
                    setWinningNumbers(winningNumbers)
                    setTries(tries)
                    setCost(tries * cost)
                    setStart(true)
                    setAllDrawnLotteryNumbers(allLotteryNumbers)
                    return;
                }
                tries++;
                allLotteryNumbers.push([...numbers ,numbers])
                numbers = []
                Array.from({ length: 7 }).map((_, i) => {
                    let number = Math.floor(Math.random() * 40) + 1
                    while (numbers.includes(number)) {
                        number = Math.floor(Math.random() * 40) + 1
                    }
                    numbers.push(number) 
                })
            }
            if(tries == 50000000){
                console.log("RIP, it took too many tries")
            }
        } catch (error) {
            console.log(error)
        }

    }

    const calculateFrequency = (numbers) => {
        console.log(numbers.length)
        let frequencyMap = {};
        const selectedSet = new Set(selectedNumbers);

        numbers.forEach((num) => {
            if(selectedSet.has(num)){
                frequencyMap[num] = (frequencyMap[num] || 0) + 1;
            }
          
        });
        console.log(frequencyMap);
        return frequencyMap;
    }
    const ResetGame = () => {
        setStart(false)
        GenerateNumbers()
        setSelectedNumbers([])
        setWinningNumbers([])
        setCost(1)
        setTries(0)
    }

    return (
        <div style={{ backgroundColor: "rgba(255,215,0, 0.1)" }}>
            <Navbar className="bg-body-tertiary" expand="lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <Navbar.Brand style={{ marginLeft: "10px" }}>Lottery</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link onClick={() => window.location.reload()}>Restart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container >
                <Row>
                    <Col>
                        <h2>Choose seven lottery numbers</h2>
                        {Array.from({ length: 40 }).map((_, i) => {
                            return <div onClick={() => SelectNumber(i + 1)} className={selectedNumbers.includes(i + 1) ? "selected-lottery" : "notselected-lottery"}>{i + 1}</div>
                        })}
                    </Col>
                    <Col>
                        {start && winningNumbers.length == 7 ? <div>{winningNumbers?.sort((a, b) => a - b).map((num, i) => {
                            return <div className='lotteryball'>{num}</div>
                        })}
                            <div style={{ marginLeft: "10px", fontSize: "30px" }}>+ </div>,<div className='lotteryball'>{extranumber}</div></div> : start ? <div>{numbers?.sort((a, b) => a - b).map((num, i) => {
                            return <div className='lotteryball'>{num}</div>
                        })}
                            <div style={{ marginLeft: "10px", fontSize: "30px" }}>+ </div>,<div className='lotteryball'>{extranumber}</div></div> : null }
                      
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className='btn btn-success' style={{ margin: "10px" }} onClick={() => StartGame()} disabled={selectedNumbers.length !== 7}>Start game</Button>
                        <Button className='btn btn-warning' style={{ margin: "10px" }} onClick={() => CheckHowManyTriesItTakes()} disabled={selectedNumbers.length !== 7}>Draw lottery numbers until you get 7 correct</Button>
                        <Button className='btn btn-danger' style={{ margin: "10px" }} onClick={() => ResetGame()}>Reset game</Button>
                        <br></br>
                        {start ? <div><h2>Selected numbers: </h2> <div style={{ display: "flex" }}>
                            {selectedNumbers.sort((a, b) => a - b).map((num, i) => <div className={winningNumbers.includes(num) ?
                                "selected-lottery" : "notselected-lottery" ? extranumber == num ? "extranumber-lottery" : "notselected-lottery" : null} style={{ marginLeft: "10px", fontSize: "30px" }}>{num}</div>)}
                        </div></div> : null}
                    </Col>
                    <Col>
                    {start && tries > 1 ?<div style={{textAlign: "center", marginBottom: "0px", justifyContent: "bottom", fontFamily: "fantasy"}}>
                            <h2>It took {tries} tries</h2>
                            <h2>And cost {cost} €</h2>
                            {/* <h3>{calculateFrequency(allDrawnLotteryNumbers).toString()}</h3> */}
                        </div> : null}
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Lottery;