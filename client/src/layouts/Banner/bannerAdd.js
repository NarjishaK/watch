import React from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState } from "react";
import axios from "axios";

import {useNavigate, Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import styles from "../category/category.module.css"
;// Images
import curved6 from "assets/images/img1.avif";
import DashboardNavbars from "examples/Navbars/DashboardNavbar";

function bannerAdd() {

    const [title,setTitle]=useState('');
    const [subtitle1,setSubtitle1]=useState('');
    const [subtitle2,setSubtitle2]=useState('');
    const [image,setImage]=useState('');
    const[imagePreview,setImagePreview]=useState([]);
    const navigate =useNavigate('');


    const addBanner= async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append ('title',title)
        formData.append ('subtitle1',subtitle1)
        formData.append ('subtitle2',subtitle2)
        for( let i=0;i<image.length ;i++){
        formData.append ('image',image[i])
        }
        console.log(formData)
        try{
           
            const response = await axios.post(
              "http://localhost:8000/banner/bannercreate",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: window.localStorage.token,
                },
              }
            );
            console.log(response.data);
            navigate('/banner')
            
        }catch(err){
            console.log(err);
        }

    }

    const handleImage = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImage(selectedImages);
    
        const previewImages = [];
        for (let i = 0; i < selectedImages.length; i++) {
          const image = selectedImages[i];
          const imageURL = URL.createObjectURL(image);
          previewImages.push(imageURL);
        }
        setImagePreview(previewImages);
      };


  return (
    <>
     <DashboardNavbars/>
    <BasicLayout title="CHOPARD" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Add Banner
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="subtitle1"
                value={subtitle1}
                onChange={(e) => setSubtitle1(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="subtitle2"
                value={subtitle2}
                onChange={(e) => setSubtitle2(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput placeholder="image" type="file" name="image" accept="image/*" onChange={handleImage} multiple />
              {imagePreview.map((preview, index) => (
              <SoftBox mb={2} key={index}>
                <img
                  src={preview}
                  alt="Image Preview"
                  className={styles.imagePreview}
                />
              </SoftBox>
            ))}
            </SoftBox>
      
            <SoftBox mt={4} mb={1}>
              <button className={styles.btn} onClick={addBanner}>
                Add
              </button>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>

    
    </>
  )
}

export default bannerAdd