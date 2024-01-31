import { Container, Grid } from "@mui/material";
import ProfileComponent from "../components/profile/userProfile";
import { useParams } from "react-router-dom";
import "../components/profile/profileStyle.css";
const Profile = () => {
  const params = useParams().id;
  console.log(params);
  return (
    <Container className="profileContainer">
      <Grid>
        <ProfileComponent />
      </Grid>
    </Container>
  );
};

export default Profile;
