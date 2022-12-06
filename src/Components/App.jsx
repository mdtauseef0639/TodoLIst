import React, { useEffect, useState } from "react";

import Todolist from "./Todolist";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

export default function App() {
  const [inputTask, setInputTask] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputTime, setInputTime] = useState("");

  const [item, setItem] = useState();

  const [toggleEdit, setToggleEdit] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);


  function handleChange(e) {
    setInputTask(e.target.value);
  }

  function handleTimeChange(e) {
    setInputTime(e.target.value);
  }

  function handleTitleChange(e) {
    setInputTitle(e.target.value);
  }

  const handleClick = async e=> {
    if (!inputTask) {
      alert("add item first....");
    } else if (inputTask && toggleEdit) {
      const body = {title:inputTitle,task:inputTask,time:inputTime}
      try{
        const response = await fetch(`http://localhost:8000/todos/${isEditItem}`,{
          method:"PUT",
          headers:{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'},
          body:JSON.stringify(body),
          mode:"cors"
        });
        console.log(response);
      }
      catch(e){

      }
      
      setToggleEdit(false);
      setInputTask("");
      setInputTime("");
      setInputTitle("");


      setIsEditItem(null);
    } else {
      const listItem = {
        todo_id: new Date().getTime().toString(),
        task: inputTask,
        time:inputTime,
        title:inputTitle
      };

      try{
          const body ={todo_id:listItem.todo_id,title:listItem.title,task:listItem.task,time:listItem.time}
          const response = await fetch("http://localhost:8000/todos",{
            method:"POST",
            headers:{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'},
            body:JSON.stringify(body),
            mode:"cors"
          });
          console.log(response);
      }
      catch(e){

      }
      setInputTask(" ");
      setInputTime("");
      setInputTitle("");
    }
  }

  const deleteItem = async (id)=> {

    try{
      const response = await fetch(`http://localhost:8000/todos/${id}`,{
        method:"DELETE"
      });
      console.log(response);
    }
    catch(e){

    }

    setItem((prevItem) => {
      return prevItem.filter((item) => {
        return item.todo_id !== id;
      });
    });
  }

  function editItem(id) {
    let newEditItem = item.find((elem) => {
      return elem.todo_id === id;
    });

    setInputTask(newEditItem.task);
    setIsEditItem(id);
    setToggleEdit("true");
    setInputTime(newEditItem.time);
    setInputTitle(newEditItem.title);
      
  }

const getTodos = async () => {
  try{
    const response =await fetch("http://localhost:8000/todos");
    const jsonData = await response.json();
    setItem(jsonData);
  }
  catch(err){
    console.log(err.message);
  }
}

  useEffect(() => {
    
    getTodos();
    
  },[item]);

  return (
    <div className="container">
      <input type="text" value={inputTitle} onChange={handleTitleChange} placeholder="Enter Title" />
      <input type="text" value={inputTask} onChange={handleChange} placeholder="Enter Task" />
      <input type="time" value={inputTime} onChange={handleTimeChange}  />
      {toggleEdit ? (
        <Button onClick={handleClick} variant="contained">
          Save
        </Button>
      ) : (
        <Button onClick={handleClick} variant="contained">
          Add
        </Button>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',columnGap: 3,
    rowGap: 2, }}>
        {item?.map((item) => {
          return (
            <Todolist
              key={item.todo_id}
              id={item.todo_id}
              task={item.task}
              title={item.title}
              time={item.time}
              onChecked={deleteItem}
              onEdit={editItem}
            />
          );
        })}
      </Box>
    </div>
  );
}
