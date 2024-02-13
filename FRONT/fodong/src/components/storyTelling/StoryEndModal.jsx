import React from 'react'
import { useNavigate } from "react-router-dom";
import "./EndModal.css"


const StoryEndModal = ({onClose}) => {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        navigate("/main");
    };

   

  return (
    <div className='modal'>
    <p className='modal-title'>이야기 종료</p>
    <button onClick={handleClose}className='modal-close-btn'>종료</button>
    <button onClick={onClose} className='modal-close-btn'>뒤로가기</button></div>
  )
}

export default StoryEndModal