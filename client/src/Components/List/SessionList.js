import React from 'react';
import Column from './column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import axios from 'axios';
import Auth from '../../HOC/Auth'
import { Grid } from '@material-ui/core';
import './List.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

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
    this.toggleLoading = this.toggleLoading.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }
  state = {
    userData: [],
    newList: '',
    user: '',
    columnOrder: [],
    loading: false
    }

  componentDidMount() {
    this.toggleLoading();
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
      this.toggleLoading();
    });
    }

  componentDidUpdate() {
    console.log("Test");
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
      const newColumnOrder = [...this.state.columnOrder];
      [newColumnOrder[source.index], newColumnOrder[destination.index]] = [newColumnOrder[destination.index], newColumnOrder[source.index]];

      const data = [...this.state.userData];
      [data[source.index], data[destination.index]] = [data[destination.index], data[source.index]];

      this.setState({
        columnOrder: newColumnOrder,
        userData: data
      });
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
    //TODO: Log a notifaction that the task was successfully deleted
  }).catch(e => {
     //TODO: Log a notifaction that the task was not successfully deleted
  })
}

toggleLoading() {
  this.setState({loading: !this.state.loading})
}

handleListChange(event) {
  this.setState({newList: event.target.value});
}

createList(e){ //add new list
  axios.defaults.headers = {
    Authorization: Auth.getToken()
}     
  axios.post('http://localhost:8000/list/create', {
    title: 'List Title',
  })
  .then(res => {
    //TODO: Log a notifaction that the list was successfully added
    const newList = {
      listId: res.data._id,
      listTitle: 'List Title',
      tasks: []
    }
    this.setState({userData: [
      ...this.state.userData,
      newList
    ]});
    const test = this.state.userData.map(e => {
      return e.listId;
    });
    this.setState({columnOrder: test})
  })
  //TODO: Log a notifaction that the list was not succesfully deleted
}


deleteList(listId){ //delete the list permanently
  this.setState({})
  axios.defaults.headers = {
    Authorization: Auth.getToken()
  }     
  axios.delete('http://localhost:8000/list/delete/' + listId)
  .then((res) => {
      console.log(res);
      //TODO: Log a notifaction that the list was successfully deleted
    })
  .catch(res => {
      //TODO: Log a notifaction that the list was not successfully deleted
  })
  const list = this.state.userData;
  const ind = list.findIndex(e => {
    return e.listId === listId;
  })
  this.state.userData.splice(ind, 1);
  const first = this.state.columnOrder.slice(0, ind);
  const last = this.state.columnOrder.slice(ind);
  this.setState({
    columnOrder: [...first, ...last]
  })
}

handleTitleChange(e, id) {
  if(e.type === 'blur') {
    axios.defaults.headers = {
      Authorization: Auth.getToken()
    }
    axios.post('http://localhost:8000/list/update/' + id, {
      title: e.target.value
    }).then(
      (res) => {
        console.log(res);
      }
    ).catch(
      // Display an error
    )
  }
  const ind = this.state.userData.findIndex((e) => {
    return e.listId === id;
  });
  const newList = [...this.state.userData];
  newList[ind].listTitle = e.target.value;
  this.setState({userData: newList});
}

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {provided => (
            <Container id="sessionList"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((e, index) => {
                if(!this.state.userData[index]) return null;
                const column = this.state.userData[index];
                const tasks = column.tasks;
                //maps the created lists 
                return <Column 
                  key={column.listId}
                  id={column.listId} 
                  column={column} 
                  tasks={tasks} 
                  index={index} 
                  createTask={this.createTask} 
                  deleteTask={this.deleteTask}
                  deleteList={this.deleteList}
                  updateListName={this.handleTitleChange}/>;
              })}
              {provided.placeholder}
              {this.state.loading? (
              <Grid container alignItems="center" justify="center" spacing={1}>
                <Grid item>
                  <CircularProgress color="inherit" />
                </Grid>
              </Grid>): (
                <IconButton className="test" onClick={ e => this.createList(e)} disabled={this.state.userData.length >= 5}>
                  <AddBoxIcon fontSize="large"></AddBoxIcon>
                </IconButton>
              )}
    
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default SessionList;