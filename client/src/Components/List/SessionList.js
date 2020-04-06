import React from 'react';
import Column from './column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import axios from 'axios';
import Auth from '../../HOC/Auth'
import {Form} from 'react-bootstrap';
import './List.css'
import Button from '@material-ui/core/Button';

const Container = styled.div`
  display: flex;
`;
class SessionList extends React.Component {
  constructor(props){
    super(props);
    this.createTask = this.createTask.bind(this);
    // this.createList = this.createList.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.createList = this.createList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.handleListChange = this.handleListChange.bind(this)
  }
  state = {
    userData: [],
    newList: '',
    user: '',
    columnOrder: []
    }

  componentDidMount() {
    axios.defaults.headers = {
      Authorization: Auth.getToken()
    }  
    axios.get(`http://localhost:8000/list/getAll`)
    .then(res => {
      this.setState({userData: res.data.lists})
      // console.log(res.data.lists);
      const test = this.state.userData.map(e => {
        return e.listId;
      });
      this.setState({columnOrder: test})
      console.log('BEFORE', this.state.columnOrder);
      });
  }

  componentWillUnmount() {

  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if(!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === 'column') {
      console.log(source.index);
      console.log(destination.index);
      const newColumnOrder = [...this.state.columnOrder];
      [newColumnOrder[source.index], newColumnOrder[destination.index]] = [newColumnOrder[destination.index], newColumnOrder[source.index]];

      const data = [...this.state.userData];
      [data[source.index], data[destination.index]] = [data[destination.index], data[source.index]];

      this.setState({
        columnOrder: newColumnOrder,
        userData: data
      });
      console.log('AFTER', this.state.columnOrder);
      return;
    }
    const start = source.droppableId;
    const finish = destination.droppableId;
    if(start === finish) {
      const list = this.state.userData.filter((e) => {
        return e.listId === start;
      });
      const tasks = list[0].tasks;
      [tasks[source.index], tasks[destination.index]] = [tasks[destination.index], tasks[source.index]];

      const newUserData = [...this.state.userData];
      const ind = newUserData.findIndex((e) => {
         return e.listId === start;
      });
      newUserData[ind].tasks = tasks;
      return;
    }
    let startList = this.state.userData.filter((e) => {
      return e.listId === start;
    })[0];
    const tasks = startList.tasks;
    const task = tasks.filter(e => {
      return e._id === draggableId
    })[0];

    const finishList = this.state.userData.filter((e) => {
      return e.listId === finish;
    })[0];
    const ind = startList.tasks.findIndex(e => {
      return e._id === task._id;
    })
    startList.tasks.splice(ind, 1)
    finishList.tasks.push(task);
  };

createTask(e, content, listid){
  e.preventDefault();
  e.target.reset();
  axios.defaults.headers = {
    Authorization: Auth.getToken()
  };
  axios.post(`http://localhost:8000/task/create`, {
    content,
    listid
  })
    .then(res => {
      const newUserData = [...this.state.userData];
      const ind = newUserData.findIndex((e) => {
         return e.listId === listid;
      });
      newUserData[ind].tasks.push(res.data);
      this.setState({userData: newUserData});
    })
}  

deleteTask(taskId, listId){

  let startList = this.state.userData.filter((e) => {
    return e.listId === listId;
  })[0];

  const ind = startList.tasks.findIndex(e => {
    return e._id === taskId;
  })
  startList.tasks.splice(ind, 1)
  this.setState({});
  axios.defaults.headers = {
    Authorization: Auth.getToken()
}     
  axios.delete('http://localhost:8000/task/delete/' + taskId).then(res => {
    console.log(res.body)
  }).catch(e => {
    console.log(e);
  })
}

handleListChange(event) {
  this.setState({newList: event.target.value});
}

createList(e){ //add new list
  e.target.reset();
  e.preventDefault();
  axios.defaults.headers = {
    Authorization: Auth.getToken()
}     
  axios.post('http://localhost:8000/list/create', {
    title: this.state.newList,
  })
  .then(res => {
    console.log(res.data);
    const newList = {
      listId: res.data._id,
      listTitle: res.data.title,
      tasks: []
    }
    this.setState({userData: [
      ...this.state.userData,
      newList
    ]});
    console.log(this.state.userData);
    const test = this.state.userData.map(e => {
      return e.listId;
    });
    this.setState({columnOrder: test})
  })
}


deleteList(listId){ //delete the list permanently
  const list = this.state.userData;
  const ind = list.findIndex(e => {
    return e.listId === listId;
  })
  console.log(ind);
  this.state.userData.splice(ind, 1);
  const first = this.state.columnOrder.slice(0, ind);
  const last = this.state.columnOrder.slice(ind);
  console.log(first, last)
  this.setState({
    columnOrder: [...first, ...last]
  })
  // this.setState({})
  // axios.defaults.headers = {
  //   Authorization: Auth.getToken()
  // }     
  // axios.post('http://localhost:8000/list/delete' + listId)
}

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="list-controls">
        <Form action="submit" onSubmit={e => this.createList(e)}>
          <Form.Control
            placeholder="List Name"
            aria-label="List Name"
            aria-describedby="basic-addon1"
            onChange={this.handleListChange}
          />
          <br />
          <Button variant="contained" type="submit">Add List</Button>
        </Form>
        </div>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {provided => (
            <Container id="sessionList"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((e, index) => {
                const column = this.state.userData[index];
                console.log(index, column)
                const tasks = column.tasks;
                //maps the created lists 
                return <Column 
                  key={column.listId} 
                  column={column} 
                  tasks={tasks} 
                  index={index} 
                  createTask={this.createTask} 
                  deleteTask={this.deleteTask}
                  deleteList={this.deleteList} />;
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>

      </DragDropContext>
    );
  }
}

export default SessionList;