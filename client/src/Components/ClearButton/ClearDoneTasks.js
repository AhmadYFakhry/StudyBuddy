import React from 'react'
import UIfx from 'uifx'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import './ClearDoneTasks.css'
import { MdClearAll } from 'react-icons/md';
//npm install axios

class ClearDoneTasks extends React.Component {
  constructor() {
    super()

    this.clear = this.clear.bind(this);

    this.state = {
      tasks: [],
    }
  }

  clear() {
      //store all the tasks in a list
      axios.get('http://localhost:3000/Task/')
      .then(response => {
          if (response.data.length > 0) {
              this.setState({
                tasks: response.data,
              })
          }
      })
      .catch((error) => {
          console.log(error);
      })
      //loop over all tasks in database and delete the ones with a completed status of true
      for (var key in this.tasks) {
        if (this.tasks.hasOwnProperty(key)) {
            if (this.tasks[key].completed) {
                this.deleteTask(this.tasks[key]._id);
            }
        }
     };  
  }

  deleteTask(id){
    //delete the task from the database
    axios.delete('http://localhost:3000/Task/delete/task/'+id)
      .then(res => console.log(res.data));
    //Removes the task from the list 'tasks'
    // this.setState({
    //     tasks: this.state.tasks.filter(el => el._id !== id)
    // })
  }

  render() {
    return (
        <Button variant="contained" ref="clearBtn" onClick={this.clear}>
          <MdClearAll></MdClearAll>
        </Button>
    )
  }
}
export default ClearDoneTasks