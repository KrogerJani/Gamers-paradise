import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Error = () => {
    return (
        <div id="error" className="d-flex justify-content-around">
        <Container className="d-flex justify-content-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", width: "25%"}}>
            <Row>
                <Col style={{ textAlign: "center", fontStyle: "oblique" }}>
            <h1 style={{ textAlign: "center", fontStyle: "oblique" }}>Error</h1>
            <p style={{ textAlign: "center", fontStyle: "italic" }}>The page you are looking for doesn't exist</p>
            <a style={{ textAlign: "center", fontStyle: "italic" }} href="/home">Home page</a>
            </Col>
            </Row>
        </Container>
        </div>
    )
}

export default Error;