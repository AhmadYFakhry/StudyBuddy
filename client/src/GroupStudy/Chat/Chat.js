import './Chat.css'
import React from 'react';
import Moment from 'react-moment';
import { Form, FormControl } from 'react-bootstrap'
import { ButtonBase, Grid } from '@material-ui/core';


class Chat extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      msg: "",
      chat: [],
    }
    this.socket = this.props.socket
  }

  componentDidMount = () => {
    this.socket.on("message", (obj) => {
      // Add new messages to existing messages in "chat"
      console.log(obj);
      this.setState({
        chat: this.state.chat.concat({
          username: obj.username,
          msg: obj.msg,
          createdAt: obj.createdAt
        })
      });
    });
  }

  renderMessages() {
    return this.state.chat.map((obj, index) => (
      <div key={index}>
        <span className="username">{obj.username}: </span>
        <span className="message">{obj.msg} </span>
        <Moment format="HH:mm" className="date">{obj.createdAt}</Moment>
      </div>
    ));
  }

  updateMessage = e => {
    this.setState({ msg: e.target.value });
  };

  handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!this.state.msg.length <= 0) {
      this.socket.emit("sendMessage", this.state.msg);
      this.setState({ msg: "" });
    }
  };
  render() {
    return (
      <div>
        <div className="message-box">
          <Form className="mb-3" onSubmit={this.handleMessageSubmit}>
            <Grid container spacing={1}>
              <Grid item lg={9} spacing={1}>
                <FormControl
                  placeholder="Your message"
                  aria-label="Your message"
                  aria-describedby="basic-addon2"
                  className="message-inp"
                  onChange={this.updateMessage}
                  value={this.state.msg}
                />
                <Grid item lg={1} spacing={1}>
                  <ButtonBase
                    type="submit" className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-sizeSmall"
                    disbaledElevation={true}>Send</ButtonBase>
                </Grid>
              </Grid>
            </Grid>

          </Form>
          <div className="messages">{this.renderMessages()}</div>
        </div>
      </div>
    );
  }
}

export default Chat;
