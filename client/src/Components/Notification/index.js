import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #2F96B4;
    color: white;
    padding: 16px;
    position: absolute;
    top: ${props => props.top}px;
    right: 70px;
    z-index: 999;
    transition: top 0.5s ease;
    border-radius: 8px;
    font-size: 16px;
    width: 325px;
    text-align: right;

    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=");

    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=90);
    filter: alpha(opacity=90);
    background-position: 15px center !important;
    background-repeat: no-repeat !important;

    // Prevent annoying text selection
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;     /* Firefox all */
    -ms-user-select: none;      /* IE 10+ */
    user-select: none;          /* Likely future */
`;


export default class Notification extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            top: -100,
            text: 'empty',
        };
    }

    showNotification = (input) => {
        this.setState({
            top: 75,
            text: input,
        }, () => {
            setTimeout(() => {
                this.setState({
                    top: -100,
                })
            }, 3000);
        });
    }

    render () {
        return (
            <Container top={this.state.top}>{this.state.text}</Container>
        );
    }

}
