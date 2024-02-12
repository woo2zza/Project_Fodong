import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./profileStyle.css";
import { StyledInput } from "../Common";

function BasicModal({ open, setOpen, onCreateProfile }) {
  const [newNickname, setNewNickname] = useState("");

  const handleClose = () => {
    setOpen(false);
    setNewNickname("");
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="profileStyle">
          <div>
            <h1>프로필 생성하기</h1>
          </div>
          <Typography sx={{ mt: 5 }}>
            <StyledInput
              value={newNickname}
              placeholder="닉네임"
              color="black"
              onChange={(e) => setNewNickname(e.target.value)}
            ></StyledInput>
          </Typography>
          <Button
            sx={{ mt: 5 }}
            variant="contained"
            color="primary"
            onClick={() => onCreateProfile(newNickname)}
          >
            확인
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
