import React, { useState } from "react";
import { searchNickname } from "../../api/friends";
import { userStore } from "../..//store/userStore";
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
  const [nickname, setNickname] = useState("");
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장할 상태 추가

  const token = userStore((state) => state.token);
  const handleSearch = async (event) => {
    setNickname((prev) => event.target.value);
    console.log(nickname);
    if (event.target.value.trim() !== "") {
      const res = await searchNickname(event.target.value, token);
      setSearchResults(res); // 검색 결과를 상태에 저장
    } else {
      setSearchResults([]); // 입력값이 없을 경우 검색 결과를 비움
    }
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleAddFriend = (friend) => {
    if (friend) {
      setFriends([...friends, friend]);
      setSearchResults([]); // 친구 추가 후 검색 결과를 비움
      setNickname(""); // 입력 필드를 초기화
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
            value={nickname}
            onChange={(e) => handleSearch(e)}
            fullWidth
          />
          <Button
            onClick={() => handleAddFriend(nickname)}
            style={{ marginTop: 8 }}
          >
            추가
          </Button>
          <List>
            {searchResults.map((result, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleAddFriend(result)}
              >
                <ListItemText primary={result} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Slide>
    </div>
  );
}

export default Friends;
