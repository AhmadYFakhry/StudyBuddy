import React, {useState} from "react";
import { Form, Container, Button, OverlayTrigger, Popover } from "react-bootstrap";
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Cookies from 'js-cookie';
import "./Register.css";


export default function RegistrationForm(props) {
    const [nameState, setNameState] = useState('');
    const [emailState, setEmailState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [validState, setValidState] = useState(false);
    const [open, setOpen] = useState(false)

    const validateForm = () => {
        var emailReg = /\S+@\S+/;
        const passReg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{4,})/;
        if ((nameState.length > 0 && emailReg.test(emailState))) 
            if (passReg.test(passwordState)) setValidState(true)
        else {
            setValidState(false);
        }
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/create/user", {
            name: nameState,
            email: emailState,
            password: passwordState
        })
            .then(res => {
                Cookies.set('Authorization', 'Bearer ' + res.data.tk);
                props.history.push('/dashboard');
            })
            .catch(res => {
                setOpen(true);
            });
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return (
        <Container className="left-side-reg">
            <Container className="inner-form">
                <h3 className="subtitle">Registration</h3>
                <br></br>
                <Form onSubmit={e => handleRegistration(e)} >
                    <Form.Group controlId="name" className="inp-top">
                        <Form.Control
                            autoFocus
                            type="text"
                            onChange={e => {
                                setNameState(e.target.value);
                                validateForm();
                            }}
                            placeholder="name"
                        />
                    </Form.Group>
                    <Form.Group controlId="email" className="test">
                        <Form.Control
                            type="email"
                            onChange={e => {
                                setEmailState(e.target.value)
                                validateForm();
                            }}
                            placeholder="email"
                        />
                    </Form.Group>
                    <OverlayTrigger
                        placement="right"
                        trigger="focus"
                        overlay={
                            <Popover id={`popover-positioned-bottom`}>
                                <Popover.Title as="h3">Password Guidelines</Popover.Title>
                                <Popover.Content>
                                    <ul>
                                        <li>More than 5 characters</li>
                                        <li>At least one number</li>
                                        <li>At least one uppercase letter</li>
                                        <li>At least one lowercase letter</li>
                                    </ul>
                                </Popover.Content>
                            </Popover>
                        }>
                        <Form.Group controlId="password" className="test1">
                            <Form.Control
                                type="password"
                                onChange={e => {
                                    setPasswordState(e.target.value)
                                    validateForm();
                                }}
                                placeholder="password"
                            />
                        </Form.Group>
                    </OverlayTrigger>
                    <br></br>
                    <Button variant="primary" type="submit" disabled={!validState}>Submit</Button>
                    <Snackbar  
                        open={open} 
                        autoHideDuration={6000} 
                        onClose={handleClose}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                        <MuiAlert variant="filled" onClose={handleClose} severity="error">
                            This email is already in use! Please login or use another email.
                        </MuiAlert>
                    </Snackbar>
                </Form>
            </Container>
        </Container>
    )
}