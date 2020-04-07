import React from 'react'
import Cookies from 'universal-cookie'
import decode from 'jwt-decode'
import "bootstrap/dist/css/bootstrap.min.css";
import './Dashboard.css'
import Timer from '../Timer/Timer'
import SessionList from '../List/SessionList';
import { Button, Grid } from '@material-ui/core';
import FullScreen from 'react-request-fullscreen'
import LogoutButton from '../LogoutButton/LogoutButton'

class Dashboard extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      loggedIn: false,
      timerRunning: false,
      timerMinute: 25,
      break: 5,
      session: 25,
      counter: false,
      flipper: true,
      FullScreen: false,
    }
    this.backtoDash = this.backtoDash.bind(this);
  }

  onFullScreenChange(isFullScreen) {
    this.setState({
      isFullScreen
    })
  }
  requestOrExitFullScreen() {
    this.fullScreenRef.fullScreen()
  }

  requestOrExitFullScreenByElement() {
    this.elFullScreenRef.fullScreen(this.elRef)
  }

  getToken() {
    const cookies = new Cookies();
    const cookie = cookies.get('Authorization');
    return cookie;
  }

  isLoggedIn() {
    try {
      const tk = this.getToken();
      const decoded = decode(tk);
      if (decoded.exp < Date.now() / 1000) {
        this.setState({ loggedIn: false })
      }
      this.setState({ loggedIn: true })
    } catch (error) {
      this.setState({ loggedIn: false })
    }
  }

  backtoDash() {
    this.props.history.push('/dashboard')
  }
  render() {
    const { isFullScreen } = this.state
    return (
      <div className="App">
        {/* <Navbar /> */}
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

        <div className="timer-backdrop">
          <Timer />
          <br></br>
          <FullScreen ref={ref => { this.fullScreenRef = ref }} onFullScreenChange={this.onFullScreenChange.bind(this)}>
            <div className='rq'>
              <Button onClick={this.requestOrExitFullScreen.bind(this)} variant="contained">
                {!isFullScreen ? 'Go Fullscreen' : 'Exit FullScreen'}
              </Button>
            </div>
          </FullScreen>
        </div>
        <SessionList id="sessionList" ></SessionList>
      </div>
    )
  }
}

export default Dashboard
