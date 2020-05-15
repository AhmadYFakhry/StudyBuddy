import React, {useState} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Container } from "react-bootstrap";
import LoginForm from '../../Components/Login/Login.js'
import './AuthPage.css'

export default function AuthPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/login", {
        email,
        password
      })
      Cookies.set('uid', res.data.user._id);
      Cookies.set('Authorization', 'Bearer ' + res.data.tk, { path: '' });
      props.history.push("/dashboard")
    } catch (error) {
      setOpen(true)
    }
  }
  return (
    <Container className="container" >
      <Snackbar  
          open={open} 
          autoHideDuration={2500} 
          onClose={handleClose}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
          <MuiAlert variant="filled" onClose={handleClose} severity="error">
              Could not find a valid account with that email and password combination. Please register if you haven't
          </MuiAlert>
      </Snackbar>
      <LoginForm
        loginHandler={handleLogin}
        updateEmail={e => setEmail(e.target.value)}
        updatePassword={e => setPassword(e.target.value)}>
      </LoginForm>
    </Container >
  )
}
