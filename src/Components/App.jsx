import React, { useState } from 'react'

import Todolist from './Todolist';
import Button from '@mui/material/Button';

export default function App() {
  const [inputText,setInputText] = useState("")
  const [item,setItem] = useState([
    
  ])
  function handleChange(e)
  {
    setInputText(e.target.value)
  }

  function handleClick()
  {
    setItem(preValue=>{
      return[...preValue,inputText]
    });
  }

  function deleteItem(id){
    setItem(prevItem=>{
      return prevItem.filter((item,index)=>{
        return index!==id;
      });
    })
  }
  console.log(item)


  return (
    <div className='container'>
      
       <input type="text" value={inputText} onChange={handleChange}/>
       <Button onClick={handleClick} variant="contained">Contained</Button>
       <ul>{
         item.map((item,index)=>{
            return(<Todolist key ={index} id={index} text={item} onChecked={deleteItem}/>)
         })
       }
       </ul>
       
        
      
    </div>
  )
}
