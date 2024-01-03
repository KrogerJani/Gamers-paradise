import { React, useState } from "react";
import { NavLink, Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Figure from "react-bootstrap/Figure";

const MainView = () => {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [info, setInfo] = useState('');

    // const [timer, setTimer] = useState(new Date().toLocaleTimeString());

    // const Timer = () => {
    //     return (
    //         setTimer(new Date().toLocaleTimeString())
    //     );
    // }
    

    const Logout = () => {
        sessionStorage.removeItem('token');
        setInfo('Logout successful!');
        setPassword('');
        setUsername('');
    }

    const Login = async () => {

        let response = await fetch('http://localhost:3004/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if (response.ok) {
            let data = await response.json();
            sessionStorage.setItem('token', data.token);
            setInfo('Login successful!');
            setPassword('');
            setUsername('');
        }
        if (!response.ok) {
            let data = await response.json();
            setInfo(data.error);
        }
    }
    // setInterval(Timer, 1000);

    return (
        <div id="frontpage" >


            <Navbar expand="lg" className="bg-body-tertiary">
                <Navbar.Brand style={{marginLeft: "10px"}} href="/">Gamers paradise</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    {!sessionStorage.getItem('token') ?<NavDropdown  title="Login" id="basic-nav-dropdown">
                            
                                <Form>
                                    <FormControl
                                        type="text"
                                        placeholder="Username"
                                        style={{ marginBottom: "2px" }}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <FormControl
                                        type="password"
                                        placeholder="Password"
                                        style={{ marginBottom: "2px" }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button style={{marginBottom: "2px"}} onClick={() => Login()} value="Login">Login</Button><br></br>
                                    <Form.Text style={{ margin: "5px", fontSize: "15px", textAlign: "center" }}>{info}</Form.Text>

                                </Form>
                        </NavDropdown>
                           
                        :<Nav.Link onClick={() => Logout()}>Logout</Nav.Link>}
                         {!sessionStorage.getItem('token')?<Nav.Link href="/register" >Register</Nav.Link>:null}
                    
                        {/* <NavDropdown title="Register" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => window.location.href = "http://localhost:3000/register"}>
                                        <Button>Register</Button>
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                        <Nav.Link href="/about" >About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            <br />
            <div className="d-flex justify-content-around">
                <Card className="games">
                    <Card.Body>
                        <Card.Title style={{ textAlign: "center" }}>Games</Card.Title>
                        {sessionStorage.getItem('token')?<div>
                        <Figure onClick={() => window.location.href = "/guessinggame"}>
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="171x180"
                                src="Guess.jpg"
                            />
                            <Figure.Caption href="/guessinggame" style={{ textAlign: "center" }}>Guessing game</Figure.Caption>
                        </Figure>
                        </div>:<p style={{ textAlign: "center" }}>Login to play</p>}

                        {/* <NavLink to={"/guessinggame"} style={{ margin: "10px" }}> Guessing game</NavLink> */}
                    </Card.Body>
                </Card>
            </div>



        </div>

    )
}



export default MainView;