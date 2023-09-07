import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import Card from "@mui/material/Card";
import curved6 from "assets/images/img1.avif";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./category.module.css";
import DashboardNavbars from "examples/Navbars/DashboardNavbar";

function CategoryEdit() {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [previousImagePreview, setPreviousImagePreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`http://localhost:8000/category/editcategory/${id}`);
        const catgorys = response.data;
        setCategory(catgorys.category);
        setImage(catgorys.image);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategory();
  }, [id]);

  const handleUpdate = async (e) => {
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
    const formData = new FormData();
    formData.append("category", category);
    formData.append("image", image);
    try {
      const response = await axios.put(
        `http://localhost:8000/category/updatecategory/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if(response.status=="200"){
        navigate("/category/list");
      }
       
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // const previewURL = URL.createObjectURL(selectedImage);
    // setImagePreview(previewURL);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setPreviousImagePreview('');
    };
    reader.readAsDataURL(selectedImage);
    
  };
  return (
    <>
      <DashboardNavbars />
      <BasicLayout title="CHOPARD" image={curved6}>
        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Edit Category
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
                <SoftInput
                  placeholder="image"
                  type="file"
                  onChange={handleImage}
                  accept="image/*"
                />
                {validationErrors.image && (
                  <p className={styles.errors}>{validationErrors.image}</p>
                )}
              </SoftBox>
             
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Previous"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
              {previousImagePreview && (
                <img
                  src={previousImagePreview}
                  alt="Selected"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
              <SoftBox mt={4} mb={1}>
                <button onClick={handleUpdate} id="added" className={styles.btn}>
                  save
                </button>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </BasicLayout>
    </>
  );
}

export default CategoryEdit;
