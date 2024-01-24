import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Lottery = () => {

    const [numbers, setNumbers] = useState([]);
    const [extranumber, setExtranumber] = useState(0);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [winningNumbers, setWinningNumbers] = useState([]);
    const [start, setStart] = useState(false);

    useEffect(() => {
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
            console.log("number: ", number)
        })
        console.log("numbers: ", numbers)
        let extranumber = Math.floor(Math.random() * 40) + 1
        while (numbers.includes(extranumber)) {
            extranumber = Math.floor(Math.random() * 40) + 1
        }
        console.log("extranumber: ", extranumber)

        setNumbers(() => numbers);
        setExtranumber(extranumber);

    }

    const SelectNumber = (num) => {
        if (selectedNumbers.includes(num)) {
            setSelectedNumbers(selectedNumbers.filter(n => n !== num))
            return
        }
        if(selectedNumbers.length == 7)
        return
        
        setSelectedNumbers([...selectedNumbers, num])

    }

    const StartGame = () => {
        setStart(true)
        let winningNumbers = []
        selectedNumbers.map((num, i) => {
            if(numbers.includes(num)){
                winningNumbers.push(num)
            }
        })
        setWinningNumbers(winningNumbers)
    }

    return (
        <>
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
            <Container>
                <Row>
                    <Col>
                        <h2>Choose lottery numbers</h2>
                        {Array.from({ length: 40 }).map((_, i) => {
                            return <div onClick={() => SelectNumber(i + 1)} className={selectedNumbers.includes(i + 1) ? "selected-lottery" : "notselected-lottery"}>{i + 1}</div>
                        })}
                    </Col>
                    <Col>


                        {start ? <div>{numbers?.sort((a, b) => a - b).map((num, i) => {
                               return <div className='lotteryball'>{num}</div>
                            })}
                            <div style={{ marginLeft: "10px", fontSize: "30px" }}>+ </div>,<div className='lotteryball'>{extranumber}</div></div> : null}


                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button style={{ margin: "10px" }} onClick={() => StartGame()} disabled={selectedNumbers.length !== 7}>Start game</Button>
                        <br></br>
                        {start?<div><h2>Selected numbers: </h2> <div style={{display: "flex" }}>
                            {selectedNumbers.sort((a, b) => a - b).map((num, i) => <div className={winningNumbers.includes(num) ? 
                                "selected-lottery" : "notselected-lottery"} style={{ marginLeft: "10px", fontSize: "30px" }}>{num}</div>)}
                                    </div></div>:null}
                        </Col>
                        <Col>
                       </Col>
                </Row>
            </Container>

        </>
    )
}

export default Lottery;