import mainimage from "./image/Mainbook.png";

const MainBook = () => {
  return (
    <div style={mainBookStyle}>
      <h1>Discover Amazing Stories!</h1>
      <img src={mainimage} style={bookImageStyle} alt="main" />
    </div>
  );
};

const mainBookStyle = {
  textAlign: "center",
  margin: "20px 0",
};

const bookImageStyle = {
  display: "block",
  width: "60%",
  height: "auto",
  borderRadius: "15px",
};

export default MainBook;
