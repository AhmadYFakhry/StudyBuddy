import './GroupStudy.css'
import React, {useEffect, useState} from 'react';
import Chat from '../Chat/Chat'
import openSocket from 'socket.io-client';
import Timer from '../GroupTimer/Timer';
import url from 'url';
import Navbar from '../../Components/Navbar/Navbar'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const socket = openSocket('http://localhost:3001');

export default function GroupStudy(props) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
      let urlObject = url.parse(window.location.href);
      const name = urlObject.query.split("?")[0].split("=")[1];
      const code = urlObject.query.split("?")[1].split("=")[1];
      socket.emit("join", {
          username: name,
          room: code
        }, (error) => {
          if (error) {
            console.log(error);
            setOpen(true);
            props.history.push('/dashboard/group/auth');
          }
        }, [] )
      })

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
      }

      return(
        <div>
            <Snackbar  
              open={open} 
              autoHideDuration={2500} 
              onClose={handleClose}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
              <MuiAlert variant="filled" onClose={handleClose} severity="error">
                  That username is already in use in that room!
              </MuiAlert>
            </Snackbar>
            <Navbar />
            <Timer socket={socket}/>
            <Chat socket={socket}/>
        </div>
        )
      }
