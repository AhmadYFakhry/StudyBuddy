import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import './Gateway.css'
import GroupIcon from '@material-ui/icons/Group';
import { Grid, Container } from '@material-ui/core';

export default class Gateway extends Component {
    constructor() {
        super();
        this.state = {
            groupCode: null
        }
        this.submitCode = this.submitCode.bind(this);
    }

    submitCode(e){
        e.preventDefault();
        console.log(this.state.groupCode)
    }

    groupHandler = (e) => {
        this.setState({
            groupCode: e.target.value
        })
    }

    render() {
        return (
            <Container>
                <h1 className="title-1">How do you want to study?</h1>
                <br />
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                    >   
                    <Container className="contain">
                        <h2 className="subtitle-left">
                            Solo Studying
                        </h2>                        
                        <p className="container-text">Study by yourself with just an adjustable timer and task manager.</p>
                        <a href="/dashboard/solo">
                            <Button variant="contained">Start Studying</Button>
                        </a>
                        <div>
                        </div>
                    </Container>
                    <br />
                    <Container className="contain">
                        <h2 className="subtitle-right">
                            Group Studying
                        </h2>
                        <p className="container-text">Study with your team with the standard timer and with an added group chat!</p>
                        <a href="/dashboard/group/auth">
                            <Button variant="contained">Join a Room</Button>
                        </a>
                    </Container>
                </Grid>
            </Container>
        )
    }
}
