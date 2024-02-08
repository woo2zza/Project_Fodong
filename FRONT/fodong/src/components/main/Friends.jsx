import React, { useState } from "react";
import {
  Fab,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Slide,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function Friends() {
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleAddFriend = () => {
    if (newFriend) {
      setFriends([...friends, newFriend]);
      setNewFriend("");
    }
  };

  const handleDeleteFriend = (index) => {
    const newFriends = [...friends];
    newFriends.splice(index, 1);
    setFriends(newFriends);
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1050 }} // Ensure FAB also has high z-index
        onClick={handleToggle}
      >
        <PersonAddIcon />
      </Fab>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={4}
          style={{
            position: "fixed",
            bottom: 80,
            right: 16,
            width: 300,
            maxHeight: "80%",
            overflow: "auto",
            padding: "16px",
            zIndex: 1050, // Set z-index to ensure it's on top
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleToggle}
            style={{ position: "absolute", right: 8, top: 8, zIndex: 1100 }} // Ensure close button is above the paper
          >
            <CloseIcon />
          </IconButton>
          <List>
            {friends.map((friend, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteFriend(index)}
                    style={{ zIndex: 1100 }} // Ensure delete button is above the paper
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={friend} />
              </ListItem>
            ))}
          </List>
          <TextField
            label="친구 추가"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddFriend} style={{ marginTop: 8 }}>
            추가
          </Button>
        </Paper>
      </Slide>
    </div>
  );
}

export default Friends;
