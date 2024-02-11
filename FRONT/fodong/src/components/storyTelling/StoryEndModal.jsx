import React from 'react'
import { useNavigate } from "react-router-dom";
import "./EndModal.css"


const StoryEndModal = ({onClose}) => {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        navigate("/");
    };

  return (
    <div className='modal'>
    <p className='modal-title'>이야기 종료</p>
    <button onClick={handleClose}className='modal-close-btn'>닫기</button></div>
  )
}

export default StoryEndModal