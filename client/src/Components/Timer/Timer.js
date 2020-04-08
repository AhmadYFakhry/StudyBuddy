import React from 'react'
import UIfx from 'uifx'
import mp3File from './beep.mp3'
import { Button, Grid } from '@material-ui/core';
import { MdPlayArrow, MdPause, MdRefresh } from 'react-icons/md';
import './Timer.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Notification from '../Notification'

class Timer extends React.Component {
  constructor() {
    super()

    this.state = {
      minutes: "25",
      seconds: "00",
      disabled: false,
      sound: true,  //play the sound whenever reset
      break: false,
      continious: false
    }

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

    this.tick = this.tick.bind(this);
  }

  switchMode() {
    this.setState({
      break: !this.state.break,
    });
    if (!this.state.break) {
      this.setState({
        minutes: "05"
      });
      return;
    }
    else this.setState({
      minutes: "25"
    });
  }

  updateMinutes(e) {
    let value = e.target.value;
    if (value < 0) {
      return;
    }
    if (value.length > 2) {
      return;
    }
    this.setState({ minutes: value });

  }
  updateSeconds(e) {
    let value = e.target.value;
    console.log(value);
    if (value < 0) {
      return;
    }
    if (value.length > 2) {
      return;
    }
    this.setState({ seconds: value });
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
    if (min < 10) {
      this.setState({
        minutes: "0" + min,
      })
    }
    if (min === 0 & sec === 0) {
      if (this.state.continious) { this.notification.showNotification('Timer Complete. New timer starting!'); }
      else { this.notification.showNotification('Timer Complete. Start your new timer!'); }

      this.stop();
      this.switchMode();
      if (this.state.continious) {
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

  start() {
    this.setState({
      disabled: true,
      sound: true
    })
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    this.secondsRemaining = time * 60 + Number(this.state.seconds);

  }

  reset() {
    this.stop();
    this.setState({
      seconds: '00',
      minutes: '25',
      sound: true,
      break: false
    });
    this.setState({ disabled: false })
  }

  formatMinutes(e) {
    const value = e.target.value;
    if (value.length >= 2) {
      return;
    }
    if (value < 10) {
      this.setState({
        minutes: "0" + value
      })
    }
    return;
  }

  formatSeconds(e) {
    const value = e.target.value;
    if (value.length >= 2) {
      return;
    }
    else if (value < 10) {
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

      <section>
        <input onBlur={this.formatMinutes} disabled={this.state.disabled} maxLength="2" max="99" className="timer" type="number" value={this.state.minutes} onChange={this.updateMinutes} />
        <p className="colon">:</p>
        <input onBlur={this.formatSeconds} disabled={this.state.disabled} maxLength="2" max="59" className="timer" type="number" value={this.state.seconds} onChange={this.updateSeconds} />
        <br />
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item spacing={1}>
            <Button variant="contained" ref="btn" onClick={this.start} disabled={this.state.disabled}>
              <MdPlayArrow />
            </Button>
          </Grid>
          <Grid item spacing={1}>
            <Button variant="contained" onClick={this.stop} disabled={!this.state.disabled}>
              <MdPause />
            </Button>
          </Grid>
          <Grid item spacing={1}>
            <Button variant="contained" onClick={this.reset}>
              <MdRefresh />
            </Button>
          </Grid>

        </Grid>
        <br />
        <div >
          <FormControlLabel
            control={
              <Switch
                checked={this.state.continious}
                onChange={this.switchContinue}
                name="checkedB"
                color="default"
              />
            }
            label={<p className="switch-label">Continuous Mode {this.state.continious === true ? "Enabled" : "Disabled"}</p>}
          />
          <br />
          <Button variant="contained" ref="btn" onClick={this.switchMode} disabled={this.state.disabled}>Switch Modes {this.state.br}</Button>
        </div>
        <Notification ref={ref => (this.notification = ref)} />
      </section>
    )
  }
}
export default Timer
