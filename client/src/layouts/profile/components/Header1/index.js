

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import axios from "axios";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";


// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import { useNavigate, useParams } from "react-router-dom";

import  React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Header1() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const navigate =useNavigate();


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token =localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"]=token;
    axios.get("http://localhost:8000/admin/profile",{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    }) 
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [invalid, setInvalid] = useState('')
  const userprofile = JSON.parse(localStorage.getItem('userprofile'));
  const [userDetailsChange, setUserDetailsChange] = useState(userprofile)
  const [successMessage, setSuccessMessage] = useState('');
  const {id} =useParams();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);

    const datas ={
      oldPassword:oldPassword,
      newPassword:newPassword
    }

    try {
      // Replace with your API endpoint for changing the password
      const response = await axios.post(`http://localhost:8000/admin/change-password/${userDetailsChange.id}`,datas);
        setOpen(false)
        setInvalid('')
        const data = await response.data
      if (response.data.success) {
        setSuccessMessage('Password changed successfully.');
        setOldPassword('');
        setNewPassword('');
      } else {
        setError('Failed to change password. Please check your old password.');
      }
    } catch (err) {
      setInvalid('old password is wrong or admin not found')
    }
  };
  return (
    <>
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        {userDetails && (
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              src={`http://localhost:8000/upload/${userDetails.image}`}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              {/* <SoftTypography variant="h5" fontWeight="medium"> */}
                <h5 style={{textTransform:'capitalize',color:'black'}}>
              {userDetails.name}
              </h5>
              {/* </SoftTypography> */}
              {/* <SoftTypography variant="button" color="text" fontWeight="medium"> */}
              <h6 style={{textTransform:'capitalize'}}>
               {userDetails.roll}
               </h6>
              {/* </SoftTypography> */}
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="App" icon={<Cube />} />
                <Tab label="change password" icon={<Document />}  onClick={handleClickOpen} />
                <Tab label="Settings" icon={<Settings />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        )}
      </Card>
    </SoftBox>
    <div>
      
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
           changePassword
          </DialogContentText>
          <TextField
          onChange={(e)=> setOldPassword(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Old password"
            type="password"
            fullWidth
            variant="standard"
          />
           <TextField
            onChange={(e)=> setNewPassword(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="New password"
            type="password"
            fullWidth
            variant="standard"
          />

          {invalid && (
            <p style={{ color:'red', fontSize:'11px'}}>{invalid}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangePassword}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}

export default Header1;
