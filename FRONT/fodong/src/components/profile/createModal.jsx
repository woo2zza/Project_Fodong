import React, { useState } from "react";
import { Modal, Box, Typography, Button, Input } from "@mui/material";
import "./profileStyle.css";

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
            <Typography>프로필 생성하기</Typography>
          </div>
          <Typography sx={{ mt: 5 }}>
            <Input
              value={newNickname}
              placeholder="닉네임"
              onChange={(e) => setNewNickname(e.target.value)}
            ></Input>
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
