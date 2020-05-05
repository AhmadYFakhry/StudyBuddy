import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './Dashboard.css'
import Timer from '../Timer/Timer'
import SessionList from '../List/SessionList';
import { Button } from '@material-ui/core';
import FullScreen from 'react-request-fullscreen'
import Navbar from '../Navbar/Navbar';
import Cookies from 'js-cookie';

class Dashboard extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      FullScreen: false,
    }
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

  render() {
    const { isFullScreen } = this.state
    return (
      <div className="App">
        <Navbar userId={Cookies.get('uid')} />
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
        <SessionList id="sessionList" >
        </SessionList>
      </div>
    )
  }
}

export default Dashboard
