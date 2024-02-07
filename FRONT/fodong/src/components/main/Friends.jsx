import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function App() {
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
        style={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleToggle}
      >
        <PersonAddIcon />
      </Fab>
      <Dialog open={open} onClose={handleToggle}>
        <DialogTitle>
          친구 목록
          <IconButton
            aria-label="close"
            onClick={handleToggle}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List>
            {friends.map((friend, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteFriend(index)}
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
