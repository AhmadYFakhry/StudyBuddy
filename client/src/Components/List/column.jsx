import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';
import {Button, Form} from 'react-bootstrap';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const Container = styled.div`
  margin: 8px;
  border: 2px solid white;
  border-radius 7px;
  background-color: white;
  width: 30%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightgreen' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;

export default class Column extends React.Component {
  constructor(props){
    super(props);
    this.handleTaskChange.bind(this);
  }

  state = {
    newTask: '',
  }

  handleTaskChange(event) {
    this.setState({newTask: event.target.value});
  }

  render() {
    return (
      <Draggable draggableId={this.props.column.listId} index={this.props.index}>
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title 
            {...provided.dragHandleProps}>
            <input value="Test"/>
            <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => this.props.deleteList(this.props.column.listId)}>
              <ClearIcon />
            </IconButton>
            
            </Title>
            <Droppable droppableId={this.props.column.listId} type="task">
              {(provided,snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.tasks.map((task, index) => (
                    <Task key={task._id} task={task} index={index} deleteTask={this.props.deleteTask} listId={this.props.column.listId} />
                  ))}
                    <Form action="submit" onSubmit={e => this.props.createTask(e, this.state.newTask, this.props.column.listId)}>
                      <Form.Control
                        placeholder="Task Name"
                        aria-label="Task Name"
                        aria-describedby="basic-addon1"
                        onChange={e => this.handleTaskChange(e)}
                      />
                      {/* <input type="text" value={this.state.newTask} id="newtask" onChange={e => this.handleTaskChange(e)} /> */}
                      <Button variant="outline-primary" type="submit">Add Task</Button>
                    </Form>
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
