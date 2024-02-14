// ChangePageContext.js
import React, { useState, createContext, useContext } from "react";
// import { useSocket } from "./SocketContext.js";
const MultiStoryContext = createContext();

export const useMultiStoryContext = () => useContext(MultiStoryContext);

export const MultiStoryProvider = ({ children, sendChangePageRequest }) => {
  return (
    <>
      <MultiStoryContext.Provider value={sendChangePageRequest}>
        {children}
      </MultiStoryContext.Provider>
    </>
  );
};

// const [page, setPage] = useState(1);
// const [scriptIndex, setScriptIndex] = useState(0);

// useEffect(()=>{})
// const value = {
//   page,
//   scriptIndex,
//   setPage,
//   setScriptIndex,
//   sendChangePageRequest,
// };
// const value = { sendChangePageRequest, page, scriptIndex };
