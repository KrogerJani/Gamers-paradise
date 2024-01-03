import React from "react";
import Card from "react-bootstrap/Card";

const About = () => {

    return (
        <div id="about" className="d-flex justify-content-center">
            <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.98)"}}>
                <Card.Body>
                    <Card.Title style={{ textAlign: "center", fontStyle: "oblique" }}>About</Card.Title>
                    <Card.Header style={{ textAlign: "center", fontStyle: "italic" }}><p>This website contains variety of games suitable for all ages <br></br>
                        New games appear occasionally</p></Card.Header>
                    
                    <Card.Footer style={{ textAlign: "center", fontStyle: "italic" }}><a href="/home">Home</a></Card.Footer>

                </Card.Body>
            </Card>
        </div>
    )
}
export default About;