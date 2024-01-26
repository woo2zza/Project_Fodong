import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import UserProfile from "../components/profile/userProfile";
import { useParams } from "react-router-dom";
const Profile = () => {
  const params = useParams().id;
  console.log(params);
  return (
    // <Container  spacing={2}>
    <Container style={containerStyle}>
      <Grid container spacing={2}>
        <UserProfile />
      </Grid>
    </Container>
  );
};

const containerStyle = {
  // height: "100vh",
  // margin: "0 auto",
  backgroundColor: "#f0e68c",
  padding: "100px",
  display: "flex",
  justifyContent: "center",
  direction: "column",
  height: "102vh",

  // direction: "column",
};
export default Profile;
