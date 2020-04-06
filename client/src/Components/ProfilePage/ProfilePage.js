import React, { Component } from 'react';
import axios from 'axios';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            tokens: [],
            tasks: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/Task/')
        .then(response => {
          this.setState({ tasks: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    
        axios.get('http://localhost:8000/User/' + this.props.match.params.id)
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                name: response.data.name,
                email: response.data.email,
                tokens: response.data.tokens,
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
    
        const user = {
          name: this.state.username,
          email: this.state.email,
          tokens: this.state.tokens,
          tasks: this.state.tasks
        }
    
        console.log(user);
        axios.post('http://localhost:3000/update/' + this.props.match.params.id, user)
            .then(res => console.log(res.data));
    }
      
  render() {
    return (
        <div>
        <h3>Profile Page</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
            </div>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group">
            <label>Tokens: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.tokens}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Edit Profile Page" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}