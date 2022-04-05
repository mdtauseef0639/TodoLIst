import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Todolist(props) {
  return (
   <div>
       <li>{ props.text } <Button variant="text" onClick={()=>{
           props.onChecked(props.id)
       }}><DeleteIcon/></Button></li>

   </div>
  )
}
