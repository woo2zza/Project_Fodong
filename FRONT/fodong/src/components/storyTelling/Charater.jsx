import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

const Charater = () => {
    const [imageSrc, setImageSrc] = useState("");
    const { page: pageParam } = useParams();
    const page = parseInt(pageParam, 10) || 1;
  const navigate = useNavigate();

  return (
    <div>Charater</div>
  )
}

export default Charater