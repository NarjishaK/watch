import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState } from "react";
import axios from "axios";

import {useNavigate, Link } from "react-router-dom";

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
import styles from "./category.module.css";
// Images
import curved6 from "assets/images/img1.avif";
import DashboardNavbars from "examples/Navbars/DashboardNavbar";

function categorycreate() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate =useNavigate();
  const addCategory = async (e) => {
    e.preventDefault();
    
    const newValidationErrors = {};

    if (!category) {
      newValidationErrors.category = "Category is required";
    }
    if (!image) {
      newValidationErrors.image = "Image is required";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      return;
    }
    const data = {
      category: category,
      image: image,
    };
    console.log(window.localStorage.token);
    try {
      const response =await
      axios
        .post("http://localhost:8000/category/categorycreate", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization":window.localStorage.token,
          },
        });

        navigate('/category/list')
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  return (
    <>
    <DashboardNavbars/>
    <BasicLayout title="CHOPARD" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Add Category
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {validationErrors.category && (
                <p className={styles.errors}>{validationErrors.category}</p>
              )}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput placeholder="image" type="file" onChange={handleImage} accept="image/*" />
              {validationErrors.image && <p className={styles.errors}>{validationErrors.image}</p>}
            </SoftBox>
      
            <SoftBox mt={4} mb={1}>
              <button onClick={addCategory} className={styles.btn}>
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

export default categorycreate;
