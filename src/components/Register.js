import { useEffect, useState } from 'react';
import { NavLink } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const USER_REGEX = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,16}[a-zA-Z0-9]$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const NICKNAME_REGEX = /^[a-zA-Z0-9]{3,18}$/;

const usernameErrorMessage = "Username must be between 6 and 18 characters long and may contain letters, numbers, dots, and underscores.";
const passwordErrorMessage = "Password must be between 6 and 24 characters long and must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
const nicknameErrorMessage = "Nickname must be between 3 and 18 characters long and may contain letters and numbers.";
const passwordConfirmErrorMessage = "Passwords do not match.";

const Register = () => {

    const [username, setUsername] = useState('');
    const [validusername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [validpassword, setValidPassword] = useState(false);
    const [nickname, setNickname] = useState('');
    const [validnickname, setValidNickname] = useState(false);
    const [info, setInfo] = useState('');

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
       
    },[username]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
    },[password]);

    useEffect(() => {
        setValidNickname(NICKNAME_REGEX.test(nickname));
    }, [nickname]);


    const Register = async (e) => {
        e.preventDefault();

        if(!validusername || !validpassword || !validnickname || passwordConfirm != password) {
            return;
        }

        try {
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
            setPasswordConfirm('');
            window.location.href = "http://localhost:3000/home";
        }

        if (!response.ok) {
            let data = await response.json();
            console.log("data: ", data)
            setInfo(data.error)
        }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id='register' className='d-flex justify-content-center' >
            <Form style={{backgroundColor: 'rgba(255, 255, 255, 0.97)' }}>
                <Form.Group style={{textAlign: 'center'}}>
                    <Form.Text style={{ margin: '10px', fontStyle: 'oblique', fontSize: '30px' }}>Register</Form.Text><br></br>
                    <Form.Text style={{ margin: '10px', fontStyle: 'italic', fontSize: '15px' }}>Please fill in this form to create an account.</Form.Text><br></br>
                    <Form.Text style={{ margin: '10px', fontStyle: 'italic', fontSize: '15px', color: 'red' }}>{info}</Form.Text>
                </Form.Group>
                <Form.Group style={{ margin: '10px'}}>
                    <label htmlFor="username" style={{ margin: '5px' }}>Username</label>
                    <Form.Control style={{ margin: '5px' }} id='username' type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" minLength={6} autoComplete='off' required />
                    {!username.length == 0 && !validusername ? <div className='infobox'>{usernameErrorMessage}</div> : <div></div>}
                    <label htmlFor="password" style={{ margin: '5px' }}>Password</label>
                    <Form.Control style={{ margin: '5px' }} id='password' type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" minLength={6} autoComplete='off' required />
                    {!password.length == 0 && !validpassword ? <div className='infobox'>{passwordErrorMessage}</div> : <div></div>}
                    <label htmlFor="passwordConfirm" style={{ margin: '5px' }}>Confirm Password</label>
                    <Form.Control style={{ margin: '5px' }} id='passwordConfirm' type="password" name="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Confirm Password" minLength={6} autoComplete='off' required />
                    {!passwordConfirm.length == 0 && passwordConfirm != password ? <div className='infobox'>{passwordConfirmErrorMessage}</div> : <div></div>}
                    <label htmlFor="nickname" style={{ margin: '5px' }}>Nickname</label>
                    <Form.Control style={{ margin: '5px' }} type="text" name="nickname" onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" minLength={3} autoComplete='off' required />
                    {!nickname.length == 0 && !validnickname ? <div className='infobox'>{nicknameErrorMessage}</div> : <div></div>}
                    <Button onClick={(e) => Register(e)} style={{ margin: '5px'}} disabled={!(validusername && validpassword && validnickname)} >Register</Button>
                    <a href="/" style={{ margin: '10px', fontStyle: "italic" }}>Home</a>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Register;