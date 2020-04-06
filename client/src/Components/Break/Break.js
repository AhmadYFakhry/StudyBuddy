import React from 'react'
import './Break.css'
import Button from 'react-bootstrap/Button'

function Break(props) {

    function increase() {
        if(props.break < 60){
            props.changeBreak(props.break+ 1);
        }
        return
      }

    function decrease(){

        if (props.break === 0) {
            return;
        }

        props.changeBreak(props.break - 1);
    }

 
    return (
        <section className="break-interval-container">
          <h4>Break Timer</h4>
          <section className="break-time-interval">
            <Button
            onClick = {decrease}
            className='counter-btn'
            >-</Button>
            <p className="break-time">{props.break}</p>
            <Button
            onClick = {increase}
            className="counter-btn">+</Button>
          </section>
        </section>
    )
}


export default Break