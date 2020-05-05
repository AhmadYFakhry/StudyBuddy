import React from 'react'
import { Button, Form, Container } from "react-bootstrap";
import './Auth.css'

class SocketAuth extends React.Component {

    constructor() {
      super();
      this.state = {
        dN: null,
        code: null
      }
      this.updateCode = this.updateCode.bind(this);
      this.updateDisplayName = this.updateDisplayName.bind(this);
      this.goStudy = this.goStudy.bind(this)
    }

    goStudy(e) {
      e.preventDefault();
      console.log(this.state);
      this.props.history.push('/dashboard/group/study?name=' + this.state.dN + '?code=' + this.state.code)
    }

    updateDisplayName(e) {
      const dN = e.target.value;
      this.setState({
        dN
      })
    }

    updateCode(e) {
      const code = e.target.value;
      this.setState({
        code
      })
    }
    render() {
        return (
          <Container className="popup-joinroom">
            <h1 className="title">Join Your Group</h1>
            <br />
            <Form onSubmit={this.goStudy}> 
              <Form.Group controlId="text" action="./test.js">
                <Form.Control
                  type="text"
                  onChange={this.updateDisplayName}
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
                  onChange={this.updateCode}
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
}

export default SocketAuth;