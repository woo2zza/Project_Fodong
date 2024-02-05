import React, { useState } from "react";
import axios from "axios";
import DeleteModal from "./deleteModal";
import { useNavigate } from "react-router-dom";
import "./mainStyle.css";
import { userStore } from "../../store/userStore";

const API_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${API_URL}/profiles`;
const token = localStorage.getItem("Token");
const config = {
  headers: {
    Authorization: `${token}`,
  },
};

const DropdownButton = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const useProfileId = userStore((state) => state.profileId);

  const [profiles, setProfiles] = useState([]);
  const [deleteProfile, setDeleteProfile] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const handleToggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const onClickProfile = () => {
    navigate("/profile");
  };

  const handleDeleteClick = (profile) => {
    setDeleteProfile(profile);
    setOpenDelete(true);
  };

  const handleDeleteProfile = (profileId) => {
    axios
      .delete(`${API_BASE_URL}/${useProfileId}`, config)
      .then(() => {
        setOpenDelete(false);
      })
      .catch((error) => {
        console.error("프로필 삭제 실패:", error);
      });
  };

  return (
    <div className="dropdown-container">
      <button className="toggle-button" onClick={handleToggleButtons}>
        profile
      </button>
      {showButtons && (
        <div className="additional-buttons">
          <button className="cute-button" onClick={onClickProfile}>
            프로필 변경
          </button>
          <button
            className="cute-button"
            variant="contained"
            color="secondary"
            onClick={handleDeleteClick}
          >
            프로필 삭제
          </button>
          {deleteProfile && (
            <DeleteModal
              open={openDelete}
              setOpen={setOpenDelete}
              profile={deleteProfile}
              onDeleteProfile={handleDeleteProfile}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default DropdownButton;
