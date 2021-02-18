import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function TodoApp() {
  const [inputval, setInputval] = useState("");
  const [items, setItems] = useState([]);
  const [getEditItem, setGEtEditItem] = useState("");
  const [open, setOpen] = React.useState(false);
  const [editedItem, setEditedItem] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSaveAndClose = (itemId) => {
    axios
      .post(
        "http://localhost:5000/editItem",
        { editedItem },
        {
          params: {
            itemId,
          },
        }
      )
      .then((editedItem) => {
        setItems(editedItem.data);
      })
      .catch((err) => console.log(err));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/collectalldata")
      .then((allDatas) => {
        setItems(allDatas.data);
      })
      .catch((err) => {
        console.log("check error", err);
      });
  }, []);

  const sendInuptVal = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/sendinputval", { inputval })
      .then((res) => {
        setItems(res.data);

        setInputval("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (itemId) => {
    axios
      .get("http://localhost:5000/deleteItems", {
        params: {
          itemId,
        },
      })
      .then((items) => {
        setItems(items.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editItem = (itemId) => {
    axios
      .get("http://localhost:5000/getItem", {
        params: {
          itemId,
        },
      })
      .then((item) => {
        setGEtEditItem(item.data);
      })
      .catch((err) => console.log(err));

    setOpen(true);
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>

      <form className="input-section" onSubmit={(event) => sendInuptVal(event)}>
        <input
          type="text"
          placeholder="Enter items..."
          value={inputval}
          onChange={(event) => setInputval(event.target.value)}
        />
      </form>

      <ul className="ul-section">
        {items.map((data, index) => (
          <li className="list" key={index}>
            {data.inputval}
            <div className="handleChanges">
              <CreateIcon onClick={() => editItem(data._id)} />
              <DeleteIcon
                className="deleteIcon"
                onClick={() => deleteItem(data._id)}
              />
            </div>
          </li>
        ))}
      </ul>

      <div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>Edit Item</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                onChange={(event) => setEditedItem(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => handleSaveAndClose(getEditItem._id)}
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
