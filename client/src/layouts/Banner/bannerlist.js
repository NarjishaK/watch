import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/categoryManagement/components/PlatformSettings";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import { Link } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function bannerlist() {
  const [banner,setBanner]=useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editSubtitle1, setEditSubtitle1] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(()=>{
    fetchBanner();
  },[]);

  const fetchBanner =async()=>{
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios.get('http://localhost:8000/banner/bannerlist')
    .then((response)=>{
      setBanner(response.data);
    })
    .catch((err)=>{
      console.log(err)
    });
  }

  const handleEdit = (itemId) => {
    // Find the item by ID and set the initial values for editing
    const selectedItem = banner.find((item) => item._id === itemId);
    if (selectedItem) {
      setEditTitle(selectedItem.title || '');
      setEditSubtitle(selectedItem.subtitle1 || '');
      setEditSubtitle1(selectedItem.subtitle2 || '');
      setEditingItemId(itemId);
      setOpenEditDialog(true);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingItemId(null);
  };

  const handleSaveEdit = () => {

    setOpenEditDialog(false);
    setEditingItemId(null);
  };

  return (
    <DashboardLayout>
        <Header />
        <SoftBox mt={5} mb={3}/>
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={2} px={2}>
              <SoftBox mb={0.5}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Banner
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={1}>
              </SoftBox>
            </SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={3}>
                {banner.map((items =>(
                  <Grid item xs={12} md={6} xl={3} key={items._id}>
                    <DefaultProjectCard
                      image={`http://localhost:8000/upload/${items.image}`}
                      title={items.title}
                      label={items.subtitle1}
                      description={items.subtitle2}
                      action={{}}
                      authors={[]}
                      onEdit={()=>handleEdit(items._id)}
                      onRemove={() => handleRemove(items._id)}
                    />
                  </Grid>
                  )))}
              
                <Grid item xs={12} md={6} xl={3}>
                  <Link to="/bannercreate">
                    <PlaceholderCard title={{ variant: "h5", text: "Add Category" }} outlined />
                  </Link>
                </Grid>
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Banner</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Subtitle1"
            value={editSubtitle}
            onChange={(e) => setEditSubtitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Subtitle2"
            value={editSubtitle1}
            onChange={(e) => setEditSubtitle1(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </DashboardLayout>
  )
}

export default bannerlist