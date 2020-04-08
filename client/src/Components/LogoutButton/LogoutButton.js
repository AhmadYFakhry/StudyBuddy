import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Auth from '../../HOC/Auth';
import Cookies from 'js-cookie';

class LogoutButton extends React.Component {

    constructor(props) {
        super()
        this.props = props;
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        const tk = Auth.getToken();
        try {
            axios.defaults.headers = {
                Authorization: tk
            }
            await axios.post('http://localhost:8000/user/logout');
            window.location.href = "/";
            const cookie = Cookies.remove('Authorization', { path: '/' });
            console.log(cookie);
        } catch (error) {
            console.log(error);
        }
    }
    render() {

        return (<Button variant="contained" onClick={this.handleLogout}>Logout</Button>);
    }
}

export default LogoutButton;

