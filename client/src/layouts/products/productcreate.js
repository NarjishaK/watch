import React from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState,useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import styles from "./product.module.css";
// Images
import curved6 from "assets/images/img1.avif";
import DashboardNavbars from "examples/Navbars/DashboardNavbar";
import { InputLabel, MenuItem, Select } from '@mui/material';

function productcreate() {
    const[category,setCategory]=useState('');
    const[categorylist,setCategoryList]=useState([]);
    const[productname,setProductname]=useState('');
    const[brand,setBrand]=useState('');
    const[price,setPrice]=useState('');
    const[description,setDescription]=useState('');
    const[image,setImage]=useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const[imagePreview,setImagePreview]=useState([]);
    const navigate = useNavigate("");

    const addProduct =async(e)=>{
        e.preventDefault();

        let newValidationErrors = {};
        if (!productname) {
          newValidationErrors.productname = "productname is required";
        }
        if (!price) {
          newValidationErrors.price = "price is required";
        }
        if (!category) {
          newValidationErrors.category = "category is required";
        }
        if (!brand) {
          newValidationErrors.brand = "brand is required";
        }
        if (!image) {
          newValidationErrors.image = "image is required";
        }
        if (!description) {
          newValidationErrors.description = "description is required";
        }
           
        if (Object.keys(newValidationErrors).length > 0) {
          console.log("Validation errors:", newValidationErrors);
          setValidationErrors(newValidationErrors); // This line sets the validation errors
          return;
        }
        else{
        


          const formData = new FormData();
          formData.append ('category',category)
          formData.append ('productname',productname)
          formData.append ('brand',brand)
          formData.append ('description',description)
          formData.append ('price',price)
          for( let i=0;i<image.length ;i++){
          formData.append ('image',image[i])
          }
        console.log(formData)
        try {
          const response = await axios.post(
            "http://localhost:8000/product/productcreate",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: window.localStorage.token,
              },
            }
          );
          console.log(response.data);
          setValidationErrors({});
          
          // Log a message to verify that this code block is reached
          console.log("Navigating to /productlist");
          
          // Navigate to the "productlist" page after successful submission
          navigate("/productlist");
        } catch (err) {
          console.log(err);
        }
        
    }
  }
    useEffect(()=>{
        List();
      },[]);
    
      const List = async()=>{
        try {
          const response = await axios.get('http://localhost:8000/category/listcategory',{
            headers: {
              'Authorization': window.localStorage.token
            }
          })
          setCategoryList(response.data)
          console.log(response.data)
        }catch(err){
          console.log(err)
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
      <DashboardNavbars />
      <BasicLayout title="CHOPARD" image={curved6}>
        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Add Product
            </SoftTypography>
          </SoftBox>
          
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput
                  placeholder="Product Name"
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)}
                />
                {validationErrors.productname && (
                  <p className={styles.errors}>{validationErrors.productname}</p>
                )}
              </SoftBox>
              <SoftBox mb={2}>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  multiple                 
                />
                {validationErrors.image && (
                  <p className={styles.errors}>{validationErrors.image}</p>
                )}                       
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
              <SoftBox mb={2}>
                <InputLabel><p className={styles.input}>Category</p></InputLabel>
                <select
                  placeholder=" category"
                  value={category}
                  className={styles.category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    select category
                  </option>
                  {categorylist.map((categoryitem) => (
                    <option key={categoryitem._id} value={categoryitem.category}>
                      {categoryitem.category}
                    </option>
                  ))}
                </select>
                {validationErrors.category && (
                  <p className={styles.errors}>{validationErrors.category}</p>
                )}
              </SoftBox>
              <SoftBox mb={2}>
              <SoftInput
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {validationErrors.price && <p className={styles.errors}>{validationErrors.price}</p>}
              </SoftBox>
              <SoftBox mb={2}>
              <SoftInput
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {validationErrors.description && (
                <p className={styles.errors}>{validationErrors.description}</p>
              )}
              </SoftBox>
              <SoftInput
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              {validationErrors.brand && <p className={styles.errors}>{validationErrors.brand}</p>}
              <SoftBox mt={4} mb={1}>
                <button type='submit' onClick={addProduct} className={styles.update}>
                  {/* <Link to="/productlist">Add</Link> */}
                  Add
                </button>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </BasicLayout>
    </>
  );
}

export default productcreate;