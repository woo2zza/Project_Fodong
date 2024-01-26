import mainimage from "./image/Mainbook.png";

const MainBook = () => {
  return (
    <div style={mainBookStyle}>
      <div>
        <h1>Discover Amazing Stories!</h1>
        {/* <img src={mainimage} style={bookImageStyle} alt="main" /> */}
      </div>
    </div>
  );
};

const mainBookStyle = {
  textAlign: "center",
  margin: "20px 0",
  display: "flex",
  justifyContent: "center",
};

const bookImageStyle = {
  display: "block",
  width: "50rem",
  height: "auto",
  borderRadius: "15px",
};

export default MainBook;
