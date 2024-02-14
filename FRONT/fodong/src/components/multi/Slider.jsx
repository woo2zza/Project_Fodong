// import React from "react";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";

// const Slider = () => {
//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   }));

//   return (
//     <div>
//       {playState ? (
//         <Grid
//           container
//           spacing={2}
//           alignItems="center"
//           justifyContent="center"
//           style={{ overflow: "auto", height: "25vh" }}
//         >
//           <Grid item xs={12}>
//             <Grid container justifyContent="center" spacing={2}>
//               {publisher !== undefined && (
//                 <Grid item>
//                   <Item>
//                     <UserVideoComponent streamManager={publisher} />
//                   </Item>
//                 </Grid>
//               )}
//               {subscribers.map((sub, i) => (
//                 <Grid key={sub.id} item>
//                   <Item>
//                     <UserVideoComponent streamManager={sub} />
//                   </Item>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       ) : null}
//     </div>
//   );
// };
