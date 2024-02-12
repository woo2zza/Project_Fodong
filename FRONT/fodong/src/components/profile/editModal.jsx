import React, { useState } from "react";
import { Modal, Box, Typography, Button, Input } from "@mui/material";
import "./profileStyle.css";
import { StyledInput } from "../Common";

function EditModal({ open, setOpen, profile, onEditProfile }) {
  const [newNickname, setNewNickname] = useState(profile.nickname); // 수정할 닉네임 상태

  const handleClose = () => {
    setOpen(false);
    setNewNickname(profile.nickname);
  };

  const handleSaveChanges = () => {
    onEditProfile(profile.profileId, newNickname);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="profileStyle">
        <h1>프로필 수정하기</h1>
        <Typography sx={{ mt: 5 }}>
          <StyledInput
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            placeholder="닉네임"
            color="black"
          />
        </Typography>
        {/* 이미지 업로드 필드 추가 필요 (선택 사항) */}
        <Button
          sx={{ mt: 5 }}
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
        >
          저장
        </Button>
      </Box>
    </Modal>
  );
}

export default EditModal;
