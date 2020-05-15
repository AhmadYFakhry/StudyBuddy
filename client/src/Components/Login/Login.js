import React from "react";
import { Button, Form, Container } from "react-bootstrap";
import "./Login.css";

const LoginForm = (props) => {
  return (
    <Container className="popup">
      <h1 className="title">Welcome</h1>
      <h2 className="subtitle">StudyBuddy</h2>
      <br />
      <Form onSubmit={props.loginHandler}>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            onChange={props.updateEmail}
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="pwdInp">
          <Form.Control
            onChange={props.updatePassword}
            type="password"
            placeholder="password"
          />
          <br />
          <Button variant="success" type="submit" onSubmit={props.loginHandler}>
            Login
           </Button>
          <br />
        </Form.Group>
      </Form>
      <a href="/register" className="special-link">Not registered? Register here</a>
    </Container >
  );
}
export default LoginForm;