import React from 'react'
import UIfx from 'uifx'
import mp3File from './beep.mp3'
import Button from '@material-ui/core/Button';
import { MdPlayArrow, MdPause, MdRefresh } from 'react-icons/md';
import './Timer.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Notification from '../../Components/Notification/index'

class Timer extends React.Component {
  constructor(props) {
    super()
    this.props = props;
    this.state = {
      minutes: "25",
      seconds: "00",
      disabled: false,
      sound: true,  //play the sound whenever reset
      break: false,
      continious: false
    }

    this.socket = this.props.socket

    this.beep = new UIfx(mp3File);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.updateMinutes = this.updateMinutes.bind(this);
    this.formatMinutes = this.formatMinutes.bind(this);
    this.updateSeconds = this.updateSeconds.bind(this);
    this.formatSeconds = this.formatSeconds.bind(this);
    this.switchMode = this.switchMode.bind(this);
    this.switchContinue = this.switchContinue.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickPause = this.handleClickPause.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.handleSwitchModes = this.handleSwitchModes.bind(this);
    this.handleSwitchContinue = this.handleSwitchContinue.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.socket.on('play', (id) => {
      if(id === this.socket.id) {
      } else {
        this.start();
      }
    });
    this.socket.on('pause', (id) => {
      if(id === this.socket.id) {
      } else {
        this.stop();
      }
    });
    this.socket.on('reset', (id) => {
      if(id === this.socket.id) {
      } else {
        this.reset();
      }
    });
    this.socket.on('switchModes', (id) => {
      if(id === this.socket.id) {
      } else {
        console.log("Test")
        this.switchMode();
      }
    });
    this.socket.on('switchContinue', (id) => {
      if(id === this.socket.id) {
      } else {
        console.log("Test")
        this.switchContinue();
      }
    });
  }

  switchMode() {
    // this.setState({
    //   break: !this.state.break,
    // });
    // if(!this.state.break) {
    //   this.setState({
    //     minutes: "05"
    //   });
    //   return;
    // }
    // else this.setState({
    //   minutes: "25"
    // });
    if(this.state.break === true) {
      this.setState({
          break: !this.state.break,
        });
        this.setState({
        minutes: "25"
        });
        return;
    }
    else {
      this.setState({
        break: !this.state.break,
      });
      this.setState({
      minutes: "05"
      });
      return;
    }
  }

  updateMinutes(e) {
    let value = e.target.value;
    if(value < 0) {
      return;
    }
    if( value.length > 2) {
      return;
    }
    this.setState({minutes: value});

  }
  updateSeconds(e) {
    let value = e.target.value;
    console.log(value);
    if(value < 0) {
      return;
    }
    if( value.length > 2) {
      return;
    }
    this.setState({seconds: value});
  }

  tick() {
    const min = Math.floor(this.secondsRemaining / 60);
    const sec = (this.secondsRemaining - (min * 60));
    this.setState({
      minutes: min,
      seconds: sec
    })
    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds,
      })
    }
    if (min < 10) {this.setState({
      minutes: "0" + min,
    })
    }
    if (min === 0 & sec === 0) {
      if (this.state.continious) {this.notification.showNotification('Timer Complete. New timer starting!');}
      else {this.notification.showNotification('Timer Complete. Start your new timer!');}
      
      this.stop();
      this.switchMode();
      if(this.state.continious) {
        this.start()
      }
    }
    this.secondsRemaining--
  }

  stop() {
    clearInterval(this.intervalHandle);
    this.setState({
      disabled: false,
    })
  }

  handleClickPlay() {
    this.socket.emit('sendPlay');
    this.start();
  }

  handleClickPause() {
    this.socket.emit('sendPause');
    this.stop();
  }

  handleClickReset() {
    this.socket.emit('sendReset');
    this.reset();
  }

  handleSwitchModes() {
    this.socket.emit('sendSwitchModes');
    this.switchMode();
  }

  handleSwitchContinue() {
    this.socket.emit('sendSwitchContinue');
    this.switchContinue();
  }

  start() {
    this.setState({
      disabled: true,
      sound: true
    })
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    this.secondsRemaining = time * 60 + Number(this.state.seconds);
    // this.socket.emit('sendPlay');
  }

  reset() {
    this.stop();
    this.setState({
      seconds: '00',
      minutes: '25',
      sound: true,
      break: false
    });
    this.setState({disabled: false})
  }

  formatMinutes(e) {
    const value = e.target.value;
    if( value.length >= 2) {
      return;
    }
    if(value < 10) {
      this.setState({
        minutes: "0" + value
      })
    }
    return;
  }

  formatSeconds(e) {
    const value = e.target.value;
    if( value.length >= 2) {
      return;
    }
    else if(value < 10) {
      this.setState({
        seconds: "0" + value
      })
      return;
    }
  }

  switchContinue() {
    this.setState({
      continious: !this.state.continious
    })
  }

  render() {
    return (
      
      <section className="timer-backdrop">
          <input onBlur={this.formatMinutes} disabled maxLength="2" max="99" className="timer" type="number" value={this.state.minutes} onChange={this.updateMinutes} />
          <p className="colon">:</p>
          <input onBlur={this.formatSeconds} disabled maxLength="2" max="59" className="timer" type="number" value={this.state.seconds} onChange={this.updateSeconds} />
          <br />
          <div className="controls">
            <Button variant="contained" ref="btn" onClick={this.handleClickPlay} disabled={this.state.disabled}>
            <MdPlayArrow />
            </Button>
            <Button variant="contained" onClick={this.handleClickPause} disabled={!this.state.disabled}>
              <MdPause />
            </Button>
            <Button variant="contained" onClick={this.handleClickReset}>
              <MdRefresh />
            </Button>
          </div>
          <br />

            <Button variant="contained" ref="btn" onClick={this.handleSwitchModes} disabled={this.state.disabled}>Switch Modes {this.state.br}</Button>
            <Notification ref={ref => (this.notification = ref)} />
          <br />
          <FormControlLabel
              control={
                <Switch
                  checked={this.state.continious}
                  onChange={this.handleSwitchContinue}
                  name="checkedB"
                  color="default"
                />
              }
              label={<p className="switch-label">Continuous Mode {this.state.continious === true ? "Enabled": "Disabled"}</p>}
            />
      </section>
    )
  }
}
export default Timer
