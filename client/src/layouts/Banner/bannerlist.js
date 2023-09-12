import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
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
import styles from "../category/category.module.css"

function bannerlist() {
  const [banner,setBanner]=useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle1, setSubtitle1] = useState('');
  const [subtitle2, setSubtitle2] = useState('');
  const [image,setImage]=useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [imagePreview,setImagePreview]=useState([]);
  const navigate=useNavigate();
  const{id}=useParams();

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
      setTitle(selectedItem.title || '');
      setSubtitle1(selectedItem.subtitle1 || '');
      setSubtitle2(selectedItem.subtitle2 || '');
      setImage(selectedItem.image || '');
      setEditingItemId(itemId);
      setOpenEditDialog(true);
    }
  };
  

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingItemId(null);
  };

  const handleSaveEdit =async (e) => {
    e.preventDefault();

  
    const formData = new FormData();
    for(let i =0;i<image.length;i++){
      formData.append ('image',image[i])
    }
    formData.append ('title',title)
    formData.append ('subtitle1',subtitle1)
    formData.append ('subtitle2',subtitle2)
    console.log(editingItemId)
    console.log(id)
    try{
      const response = await axios.put(`http://localhost:8000/banner/bannerupdate/${editingItemId}`,
      formData,{
        headers:{
          'Content-Type' :"multipart/form-data",
          
        },
      });
      console.log(response.data);
      console.log('looooooooo')
      window.location.href='/banner'
    }catch(err){
      console.log(err);
    }  
  };
  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImage(selectedFiles);

    const previewImages = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const image = selectedFiles[i];
        const imageURL = URL.createObjectURL(image);
        previewImages.push(imageURL);
      }
      setImagePreview(previewImages);

  };

const handleRemove =async(id)=>{
  const confirmation = window.confirm("Are you sure you want to delete this  category?");
  if (confirmation) {
  try{
    const response = await axios.delete(`http://localhost:8000/banner/bannerdelete/${id}`)
    fetchBanner();
  }catch(err){
    console.log(err);
  }
}
}

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3} />
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Banner
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}></SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {banner.map((items) => (
                <Grid item xs={12} md={6} xl={3} key={items._id}>
                  <DefaultProjectCard
                    image={`http://localhost:8000/upload/${items.image[0]}`}
                    title={items.title}
                    label={items.subtitle1}
                    description={items.subtitle2}
                    action={{}}
                    authors={[]}
                    onEdit={() => handleEdit(items._id)}
                    onRemove={() => handleRemove(items._id)}
                  />
                </Grid>
              ))}

              <Grid item xs={12} md={6} xl={3}>
                <Link to="/bannercreate">
                  <PlaceholderCard title={{ variant: "h5", text: "Add Banner" }} outlined />
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Subtitle1"
            value={subtitle1}
            onChange={(e) => setSubtitle1(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Subtitle2"
            value={subtitle2}
            onChange={(e) => setSubtitle2(e.target.value)}
            fullWidth
            margin="normal"
          />

          <input accept="image/*" type="file" name="image" onChange={handleImage} multiple />
          {imagePreview.map((preview, index) => (
            
              <img key={index} src={preview} alt="Image Preview" className={styles.imagePreview} />
           
          ))}
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
  );
}

export default bannerlist;