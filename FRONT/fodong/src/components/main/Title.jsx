const Title = () => {
  return <div style={titleStyle}>Welcome to Kid's World!</div>; // 타이틀 변경
};

const titleStyle = {
  fontSize: "36px", // 글꼴 크기 변경
  fontWeight: "bold",
  color: "#ff6347", // 글자 색상 변경
  textAlign: "center",
  marginBottom: "20px", // 여백 추가
};

export default Title;
