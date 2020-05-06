import React, {useState} from 'react'
import { Button, Grid } from '@material-ui/core';
import { MdPlayArrow, MdPause, MdRefresh } from 'react-icons/md';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import WorkIcon from '@material-ui/icons/Work';
import './Timer.css'

  let intervalHandle;
  let secondsRemaining;

export default function Timer() {
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');
  const [disabled, setDisabled] = useState(false);
  const [modeBreak, setModeBreak] = useState(false);
  const [open, setOpen] = useState(false);

  const tick = () => {
    const min = Math.floor(secondsRemaining / 60);
    const sec = (secondsRemaining - (min * 60));
    setMinutes(String(min));
    setSeconds(String(sec))
    console.log(`Mintues: ${minutes}`);
    console.log(`Seconds: ${seconds}`);
    if (sec < 10) setSeconds("0" + sec);
    if (min < 10) setMinutes("0" + min);
    if (min === 0 && sec === 0) {
      setOpen(true)
      // if (continious) { this.notification.showNotification('Timer Complete. New timer starting!'); }
      // else { this.notification.showNotification('Timer Complete. Start your new timer!'); }
      stop();
      switchMode();
    }
    secondsRemaining--;
  }

  const updateMinutes = (e) => {
    let value = e.target.value;
    if (value < 0) return;
    if (value.length > 2) return;
    setMinutes(value);

  }
  const updateSeconds = (e) => {
    let value = String(e.target.value);
    if (value < 0) return;
    if (value.length > 2) return;
    setSeconds(value);
  }

  const formatMinutes = (e) => {
    let value = String(e.target.value);
    if (value.length >= 2) {
      return;
    }
    if (value < 10) setMinutes("0" + value);
    return;
  }

  const formatSeconds = (e) => {
    const value = e.target.value;
    if (value.length >= 2) {
      return;
    }
    else if (value < 10) {
      setSeconds("0" + value);
      return;
    }
  }

  const stop = async () => {
    await clearInterval(intervalHandle);
    setDisabled(false);
  }

  const switchMode = () => {
    if (modeBreak) {
      setModeBreak(!modeBreak)
      setMinutes("25")
      setSeconds("00")
      return;
    }
    else {
      setModeBreak(!modeBreak)
      setMinutes("05");
      setSeconds("00")
      return;
    }
  }

  const start = () => {
    setDisabled(true)
    intervalHandle = setInterval(tick, 1000);
    // console.log(`Mintues: ${minutes}`);
    // console.log(`Seconds: ${seconds}`);
    let time = Number(minutes);
    secondsRemaining = time * 60 + Number(seconds);
    console.log(secondsRemaining);
  }

  const reset = () => {
    stop();
    secondsRemaining = 0;
    setSeconds("00");
    setMinutes("25");
    setModeBreak(false)
    setDisabled(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <section>
      <Snackbar  
          open={open} 
          autoHideDuration={2500} 
          onClose={handleClose}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
          <MuiAlert variant="filled" onClose={handleClose} severity="success">
              {!modeBreak? `Time's up! Congrats, its time for your break!`: `Time's up! Get back to studying!`}
          </MuiAlert>
      </Snackbar>
      {modeBreak? <FreeBreakfastIcon fontSize="large" />: <WorkIcon fontSize="large" />}

      <input onBlur={e => formatMinutes(e)} disabled={disabled} maxLength="2" max="99" className="timer" type="number" value={minutes} onChange={updateMinutes} />
      <p className="colon">:</p>
      <input onBlur={e => formatSeconds(e)} disabled={disabled} maxLength="2" max="59" className="timer" type="number" value={seconds} onChange={updateSeconds} />
      <br />
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Grid itemScope>
          <Button variant="contained" onClick={start} disabled={disabled}>
            <MdPlayArrow />
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={stop} disabled={!disabled}>
            <MdPause />
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={reset}>
            <MdRefresh />
          </Button>
        </Grid>
      </Grid>
      <br />
      <div >
        <br />
        <Button variant="contained" onClick={switchMode} disabled={disabled}>Switch Modes</Button>
      </div>
      {/* <Notification ref={ref => (this.notification = ref)} /> */}
    </section>
  )
}
