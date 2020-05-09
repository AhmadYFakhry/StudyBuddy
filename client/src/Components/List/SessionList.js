import React, {useEffect, useState} from 'react';
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

export default function SessionList() {
  const [userData, setUserData] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      axios.defaults.headers = {
        Authorization: Auth.getToken()
      }  
      const res = await axios.get(`http://localhost:8000/list/getAll`);
      setUserData(res.data.lists);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Testing")
    console.log(userData);
    const test = userData.map(e => e.listId);
    setColumnOrder(test);
  }, [userData])

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if(!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    if (type === 'column') {
      const data = [...userData];
      [data[source.index], data[destination.index]] = [data[destination.index], data[source.index]];
      setUserData(data);
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    if(start === finish) {
      const list = [...userData.filter((e) => e.listId === start)]
      const tasks = [...list[0].tasks];
      console.log(source.index, destination.index);
      [tasks[source.index], tasks[destination.index]] = [tasks[destination.index], tasks[source.index]];

      const newUserData = [...userData];
      const ind = newUserData.findIndex((e) => {
         return e.listId === start;
      });
      newUserData[ind].tasks = tasks;
      setUserData(newUserData);
      return;
    }

    let startList = userData.filter((e) => {
      return e.listId === start;
    })[0];
    const tasks = startList.tasks;
    const task = tasks.filter(e => {
      return e._id === draggableId
    })[0];

    const finishList = userData.filter((e) => {
      return e.listId === finish;
    })[0];
    const ind = startList.tasks.findIndex(e => {
      return e._id === task._id;
    })
    startList.tasks.splice(ind, 1)
    finishList.tasks.push(task);
  };

  const createTask = (e, content, listid) => {
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
        const newUserData = [...userData];
        const ind = userData.findIndex((e) => {
           return e.listId === listid;
        });
        newUserData[ind].tasks.push(res.data);
        // console.log(newUserData);
        setUserData(newUserData);
      })
  }  
  
  const deleteTask = async (taskId, listId) => {
    const currentData = [...userData];
    let startList = currentData.filter((e) => {
      return e.listId === listId;
    })[0];
  
    const ind = startList.tasks.findIndex(e => {
      return e._id === taskId;
    })
    startList.tasks.splice(ind, 1)
    const listIndex = currentData.findIndex(e => {
      return e.listId === listId;
    });

    currentData[listIndex] = startList;
    setUserData(currentData);
    try {
      axios.defaults.headers = {
        Authorization: Auth.getToken()
      }
      await axios.delete('http://localhost:8000/task/delete/' + taskId);
    } catch (error) {
        console.log(error) 
    }
  }
  
  const createList = async () => { //add new list
    axios.defaults.headers = {
      Authorization: Auth.getToken()
  }     
    const res = await axios.post('http://localhost:8000/list/create', {
      title: 'List Title',
    })
    const newList = {
      listId: res.data._id,
      listTitle: 'List Title',
      tasks: []
    }
    setUserData([...userData, newList]);
  }
  
  const deleteList = (listId) => { //delete the list permanently
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
    const list = userData;
    const ind = list.findIndex(e => {
      return e.listId === listId;
    })
    list.splice(ind, 1);
    const first = columnOrder.slice(0, ind);
    const last = columnOrder.slice(ind);
    setColumnOrder([...first, ...last]);
  }
  
  const handleTitleChange = (e, id) => {
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
    const ind = userData.findIndex((e) => {
      return e.listId === id;
    });
    const newList = [...userData];
    newList[ind].listTitle = e.target.value;
    setUserData(newList);
  }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {provided => (
              <Container id="sessionList"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columnOrder.map((e, index) => {
                  if(!userData[index]) return null;
                  const column = userData[index];
                  const tasks = column.tasks;
                  return <Column 
                    key={column.listId}
                    id={column.listId} 
                    column={column} 
                    tasks={tasks} 
                    index={index} 
                    createTask={createTask} 
                    deleteTask={deleteTask}
                    deleteList={deleteList}
                    updateListName={handleTitleChange}/>;
                })}
                {provided.placeholder}
                {loading? (
                <Grid container alignItems="center" justify="center" spacing={1}>
                  <Grid item>
                    <CircularProgress color="inherit" />
                  </Grid>
                </Grid>): (
                  <IconButton className="test" onClick={createList}>
                    <AddBoxIcon fontSize="large"></AddBoxIcon>
                  </IconButton>
                )}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      );   
    }
  
          