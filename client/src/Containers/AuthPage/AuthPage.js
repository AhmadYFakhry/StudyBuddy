import React from 'react'
import './AuthPage.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Alert, Modal, Button, Spinner } from "react-bootstrap";
import LoginForm from '../../Components/Login/Login.js'


class AuthPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      alert: <div></div>,
      showSpinner: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });

  }

  async handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/login", {
        email: this.state.email,
        password: this.state.password
      })
      Cookies.set('Authorization', 'Bearer ' + res.data.tk, { path: '' });
      window.location.href = "/dashboard"
    } catch (error) {
      console.log(error);
      this.setState({ alert: <Alert variant="warning">Unable to login! Could not find a matching email and password</Alert> })
    }
  }
  render() {
    return (
      < Container className="container" >
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Modal>
        <LoginForm
          loginHandler={this.handleLogin}
          updateEmail={this.updateEmail}
          updatePassword={this.updatePassword}
          spinnerHandler={this.spinnerHandler}>
        </LoginForm>
        {this.state.alert}
      </Container >
    )
  }
}

export default AuthPage;