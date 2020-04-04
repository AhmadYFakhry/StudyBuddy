import React from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { Draggable } from 'react-beautiful-dnd';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 7px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightblue' : 'white')};
`;



export default class Task extends React.Component {

  constructor(props) {
    super();
    this.props = props;
  }

  updateTask(e, state) {
    //This will allow the user to update the task within the actual database.
    //This cannot be completed until we allow the user physically manipulate how the task looks
    // i.e. Add an image, add a hyperlink, 
    e.preventDefault();
    console.log(state);
    axios.post("http://localhost:8000/task/update", state)
    .then(res => {
      console.log(res.data.tk);
      localStorage.setItem('id_token', res.data.tk);
      this.setHeader();
    })
    .catch(res => console.log(res.tk));
  }

  deleteTask(){
    
  }

  render() {
    return (
      <Draggable draggableId={this.props.task._id} index={this.props.index}>
        {(provided,snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <p className="text">{this.props.task.content}
            <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => this.props.deleteTask(this.props.task._id, this.props.listId)}>
              <ClearIcon />
          </IconButton>
          </p>
          </Container>
        )}
      </Draggable>
    );
  }
}
