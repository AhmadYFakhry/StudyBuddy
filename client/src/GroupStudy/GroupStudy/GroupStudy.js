import './GroupStudy.css'
import React from 'react';
import Chat from '../Chat/Chat'
import openSocket from 'socket.io-client';
import Timer from '../GroupTimer/Timer';
import url from 'url';
import { Button, Grid } from '@material-ui/core';
import LogoutButton from '../../Components/LogoutButton/LogoutButton'
const socket = openSocket('http://localhost:3001');

class GroupStudy extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.backtoDash = this.backtoDash.bind(this);
  }
  componentDidMount = () => {
    let urlObject = url.parse(window.location.href);
    const name = urlObject.query.split("?")[0].split("=")[1];
    const code = urlObject.query.split("?")[1].split("=")[1];
    socket.emit("join", {
      username: name,
      room: code
    }, (error) => {
      if (error) {
        console.log(error);
        alert(error);
        this.props.history.push('/dashboard/group/auth');
      }
    });
  }

  backtoDash() {
    this.props.history.push('/dashboard')
  }

  render() {
    return (
      <div>
        <div className="back-controls">
          <Grid container spacing={3}>
            <Grid item>
              <Button variant="contained" onClick={this.backtoDash} >Go back</Button>
            </Grid>
            <Grid item>
              <LogoutButton></LogoutButton>
            </Grid>
          </Grid>
        </div>
        <Timer socket={socket} className="timer-backdrop" />
        <Chat socket={socket} />
      </div>
    )
  }
}

export default GroupStudy;
