import './Chat.css'
import React, {useState} from 'react';
import Moment from 'react-moment';
import { Form, FormControl } from 'react-bootstrap'
import { ButtonBase, Grid } from '@material-ui/core';

export default function Chat(props) {

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  
  props.socket.on("message", (obj) => {
    // Add new messages to existing messages in "chat"
    setChat([...chat, {
      username: obj.username,
      msg: obj.msg,
      createdAt: obj.createdAt
    }])
  });

  const renderMessages = () => {
      return chat.map((obj, index) => (
      <div key={index}>
        <span className="username">{obj.username}: </span>
        <span className="message">{obj.msg} </span>
        <Moment format="HH:mm" className="date">{obj.createdAt}</Moment>
      </div>
    ));
  }

  return (
    <div>
      <div className="message-box">
        <Form className="mb-3" onSubmit={e => {
          e.preventDefault();
          console.log(message.length)
          if (message.length > 0) {
            props.socket.emit("sendMessage", message);
            setMessage("")
          }
        }}>
          <Grid container spacing={3} direction="row">
            <Grid item lg={11} >
              <FormControl
                placeholder="Your message"
                aria-label="Your message"
                aria-describedby="basic-addon2"
                className="message-inp"
                onChange={e => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
            </Grid>
              <Grid item lg={1} >
                <ButtonBase
                  type="submit" className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-sizeMedium adjusted"
                  >Send</ButtonBase>
              </Grid>
          </Grid>
        </Form>
        <div className="messages">{renderMessages()}</div>
      </div>
    </div>
  )
}