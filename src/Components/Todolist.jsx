import React from 'react'

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';




export default function Todolist(props) {
  const [editClicked, setEditClicked] = React.useState(false);
  return (
  <Card sx={{ width: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.title?props.title[0]:"A"}
          </Avatar>
        }
        
        title={props.title}
        subheader={props.time}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.task}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" onClick={()=>{setEditClicked(true)}}>
          <EditIcon onClick={()=>{
      props.onEdit(props.id)}}></EditIcon>
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon onClick={()=>{
           props.onChecked(props.id)}}></DeleteIcon>
        </IconButton>
      </CardActions>
      
    </Card>
    
  )

}
