import React, { useEffect, useState } from "react";

import Todolist from "./Todolist";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [item, setItem] = useState(JSON.parse(localStorage.getItem("list")));

  const [toggleEdit, setToggleEdit] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);
  function handleChange(e) {
    setInputText(e.target.value);
  }

  function handleClick() {
    if (!inputText) {
      alert("add item first....");
    } else if (inputText && toggleEdit) {
      setItem(
        item.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, value: inputText };
          }
          return elem;
        })
      );
      setToggleEdit(false);
      setInputText("");
      setIsEditItem(null);
    } else {
      const listItem = {
        id: new Date().getTime().toString(),
        value: inputText,
      };
      setItem((preValue) => {
        return [...preValue, listItem];
      });
      setInputText(" ");
    }
  }

  function deleteItem(id) {
    setItem((prevItem) => {
      return prevItem.filter((item) => {
        return item.id !== id;
      });
    });
  }

  function editItem(id) {
    let newEditItem = item.find((elem) => {
      return elem.id === id;
    });

    setInputText(newEditItem.value);
    setIsEditItem(id);
    setToggleEdit("true");
  }
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(item));
  }, [item]);

  return (
    <div className="container">
      <input type="text" value={inputText} onChange={handleChange} />
      {toggleEdit ? (
        <Button onClick={handleClick}>
          <EditIcon />
        </Button>
      ) : (
        <Button onClick={handleClick} variant="contained">
          Add
        </Button>
      )}

      <ul>
        {item.map((item) => {
          console.log(item);
          return (
            <Todolist
              key={item.id}
              id={item.id}
              text={item.value}
              onChecked={deleteItem}
              onEdit={editItem}
            />
          );
        })}
      </ul>
    </div>
  );
}
