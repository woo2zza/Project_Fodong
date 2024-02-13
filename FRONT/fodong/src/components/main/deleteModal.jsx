import React from "react";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./mainStyle.css";
function DeleteModal({ open, setOpen, profile, onDeleteProfile }) {
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    onDeleteProfile(profile.profileId);
    navigate("/profile");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal_style">
        <h2>Delete Profile</h2>
        <p>Are you sure you want to delete {profile.nickname}?</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
