import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [info, setInfo] = useState('');


    const Register = async () => {
        if (username.length < 6) {
            setInfo('Username must be at least 6 characters long');
            return;
        }
        if (password.length < 6) {
            setInfo('Password must be at least 6 characters long');
            return;
        }
        if (nickname.length < 3) {
            setInfo('Nickname must be at least 3 characters long');
            return;
        }

        let response = await fetch('http://localhost:3004/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                nickname: nickname
            })
        })

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            setNickname('');
            setPassword('');
            setUsername('');
            window.location.href = "http://localhost:3000/home";
        }

        if (!response.ok) {
            let data = await response.json();
            console.log("data: ", data)
            setInfo(data.error)
            setNickname('');
            setPassword('');
            setUsername('');
        }
    }

    return (
        <div id='register' className='d-flex justify-content-center' >
            <Form style={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.97)' }}>
                <Form.Group>
                    <Form.Text style={{ margin: '10px', textAlign: 'center', fontStyle: 'oblique', fontSize: '30px' }}>Register</Form.Text><br></br>
                    <Form.Text style={{ margin: '10px', textAlign: 'center', fontStyle: 'italic', fontSize: '15px' }}>Please fill in this form to create an account.</Form.Text><br></br>
                    <Form.Text style={{ margin: '10px', textAlign: 'center', fontStyle: 'italic', fontSize: '15px', color: 'red' }}>{info}</Form.Text>
                </Form.Group>
                <Form.Group style={{ margin: '10px', justifyContent: 'space-around' }}>
                    <Form.Control style={{ margin: '5px' }} type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" minLength={6} required />
                    <Form.Control style={{ margin: '5px' }} type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" minLength={6} required />
                    <Form.Control style={{ margin: '5px' }} type="text" name="nickname" onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" minLength={3} required />
                    <Button style={{ margin: '5px' }} onClick={() => Register()}>Register</Button>
                    {/* <input type="submit" formAction='http://localhost:3004/register' method="POST" value="Register"  /> */}
                    <a href="http://localhost:3000/" style={{ margin: '10px', fontStyle: "italic" }}>Home</a>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Register;