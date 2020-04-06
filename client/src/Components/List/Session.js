import React from 'react'
import './Session.css'
import Button from 'react-bootstrap/Button'

function Session(props) {

    function increase() {
        if(props.session < 60){
            props.changeSession(props.session + 1);
        }
        return
      }

    function decrease(){

        if (props.session === 0) {
            return;
        }

        props.changeSession(props.session - 1);
    }

    return (
        <section className="session-interval-container">
          <section className="session-interval">
            <Button
            disabled = {props.isPlay ? "disabled" : ""}
            onClick = {decrease}
            className="counter-btn">-</Button>
            <p className="session-time">{props.session}</p>
            <Button
            onClick = {increase}
            className="counter-btn">+</Button>
          </section>
        </section>
      )

}

export default Session