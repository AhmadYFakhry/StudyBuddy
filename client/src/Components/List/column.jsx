import React, {useState} from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';
import {Form} from 'react-bootstrap';
import {Button} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import './column.css'

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
  padding-top: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightgreen' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;

export default function Column(props) {
  const [newTask, setNewTask] = useState('initialState');
  return (
    <Draggable draggableId={props.column.listId} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title 
          {...provided.dragHandleProps}>
            <input onBlur={e => props.updateListName(e, props.id)} value={props.column.listTitle} className="column-title" onChange={e => props.updateListName(e, props.id)}></input>
          <IconButton color="secondary" aria-label="delete list" component="span" onClick={() => props.deleteList(props.column.listId)}>
            <ClearIcon />
          </IconButton>
          </Title>
          <Droppable droppableId={props.column.listId} type="task">
            {(provided,snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task._id} task={task} index={index} deleteTask={props.deleteTask} listId={props.column.listId} />
                ))}
                  <Form action="submit" onSubmit={e => props.createTask(e, newTask, props.column.listId)}>
                    <Form.Control
                      placeholder="Task Name"
                      aria-label="Task Name"
                      aria-describedby="basic-addon1"
                      onChange={e => {
                        setNewTask(e.target.value);
                      }}
                    />
                    {/* <input type="text" value={this.state.newTask} id="newtask" onChange={e => this.handleTaskChange(e)} /> */}
                    <br />
                    <Button variant="contained" color="primary" type="submit">Add Task</Button>
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

