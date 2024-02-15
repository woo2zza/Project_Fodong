import React from 'react'
import { useNavigate } from "react-router-dom";
import "./EndModal.css"
import end from "./img/end.webp"


const StoryEndModal = ({onClose, onBack, onRecording}) => {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        onRecording()
        navigate("/main");
    };


  return (
    <div className='modal'>
    <h1 className='modal-title'>이야기 종료</h1>
    <img src={end} alt="마무리" className='modal-image' />
    <div className='modal-buttons'>
    <button onClick={onBack} className='modal-close-btn'>뒤로가기</button>
    <button onClick={handleClose}className='modal-close-btn'>종료</button>
    </div>
    </div>
  )
}

export default StoryEndModal