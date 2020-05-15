import React, {useState} from 'react'
import { Button, Form, Container } from "react-bootstrap";
import './Auth.css'

export default function SocketAuth(props) {
    const [dN, setdN] = useState('');
    const [code, setCode] = useState('');
        return (
          <Container className="popup-joinroom">
            <h1 className="title">Join Your Group</h1>
            <br />
            <Form onSubmit={() => {
                props.history.push(`/dashboard/group/study?name=${dN}?code=${code}`)
            }}> 
              <Form.Group controlId="text" action="./test.js">
                <Form.Control
                  type="text"
                  onChange={e => setdN(e.target.value)}
                  placeholder="Display Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="pwdInp" >
                <Form.Control
                  // onChange={props.updatePassword}
                  type="password"
                  placeholder="Room Code"
                  onChange={e => setCode(e.target.value)}
                  required
                />
                <br />
                <Button variant="success" type="submit">
                  Join
                </Button>
                <br />
              </Form.Group>
            </Form>
        </Container >
        );
}