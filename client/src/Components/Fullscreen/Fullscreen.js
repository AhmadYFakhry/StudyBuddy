import React, { Component } from "react";
import FullScreen from 'react-request-fullscreen';
 
class Fullscreen extends Component {
  constructor(props) {
    super();
 
    this.state = {
      isFull: false,
    };
  }
 
  goFull = () => {
    this.setState({ isFull: true });
  }
 

  render() {
    return (
        <FullScreen />
    );
  }
}
 
export default Fullscreen;