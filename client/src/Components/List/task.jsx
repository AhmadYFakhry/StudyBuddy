import React from 'react';
import styled from 'styled-components';
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

export default function Task(props) {
    return (
      <Draggable draggableId={props.task._id} index={props.index}>
        {(provided,snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}>
            <p className="text">{props.task.content}
            <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => props.deleteTask(props.task._id, props.listId)}>
              <ClearIcon />
          </IconButton>
          </p>
          </Container>
        )}
      </Draggable>
    );
}
