import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

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
import { InputLabel, MenuItem, Select } from "@mui/material";
import { Preview } from "@mui/icons-material";

function productedit() {
    const[category,setCategory]=useState('')
    const[categorylist,setCategoryList]=useState([]);
    const[productname,setProductname]=useState('');
    const[brand,setBrand]=useState('');
    const[price,setPrice]=useState('');
    const[description,setDescription]=useState('');
    const[image,setImage]=useState('');
    const[offerprice,setOfferprice]=useState('');
    // const [validationErrors, setValidationErrors] = useState({});
    const {id}= useParams();
    const navigate =useNavigate();
    const [invalid,setInvalid]=useState(false)
    const [imagePreview, setImagePreview] = useState([]);
    const [previousImagePreview, setPreviousImagePreview] = useState([]);


    useEffect(()=>{
        List();
      },[]);
    
      const List = async()=>{
        try {
          const token = localStorage.getItem("token");
           axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.get('http://localhost:8000/category/listcategory')
          setCategoryList(response.data)
          console.log(response.data)
        }catch(err){
          console.log(err)
        }
      }

      useEffect(()=>{
        const fetchProduct =async()=>{
            try {
              const token = localStorage.getItem("token");
              axios.defaults.headers.common["Authorization"] = token;
                const response= await axios.get(`http://localhost:8000/product/productedit/${id}`);
                const products = response.data;
                setCategory(products.category);
                setBrand(products.brand);
                setDescription(products.description);
                setPrice(products.price);
                setOfferprice(products.offerprice);
                const image= products.image;
                if (image) {
                  setImage([image]);
          
                  const previewImages = [];
                  for (let i = 0; i < image.length; i++) {
                    const imageURL = `http://localhost:8000/upload/${image[i]}`;
                    previewImages.push(imageURL);
                  }
                  setImagePreview(previewImages);
                } else {
                  setImage([]);
                  setImagePreview([]);
                }
                setProductname(products.productname);
            }catch(err){
                console.log(err);
            }
        };fetchProduct()
      },[id]);


      const handleUpdate= async(e)=>{
        e.preventDefault();
        let validationErrors = {};

    if (!productname) {
      validationErrors.productname = "productname is required";
    }
    if (!price) {
      validationErrors.price = "price is required";
    }
    if (!category) {
      validationErrors.category = "category is required";
    }
    if (!brand) {
      validationErrors.brand = "brand is required";
    }
    if (!image) {
      validationErrors.image = "image is required";
    }
    if (!description) {
      validationErrors.description = "description is required";
    }
    if (!offerprice) {
      validationErrors.offerprice = "offerprice is required";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      setInvalid(validationErrors);
      return;
    }
        
    
        const formData = new FormData();

        for(let i =0;i<image.length;i++){
          formData.append ('image',image[i])
        }
        formData.append ('category',category)
        formData.append ('productname',productname)
        formData.append ('brand',brand)
        formData.append ('description',description)
        formData.append ('price',price)
        formData.append ('offerprice',offerprice)
        
        try{
          const response =await axios.put(`http://localhost:8000/product/updateproduct/${id}`,
          formData,
          {
            headers:{
              'Content-Type' :"multipart/form-data",
              
            },
          });
          console.log(response.data);
          navigate('/productlist')
        }catch(err){
          console.log(err);
        }
      }


    const handleImage = (e) => {
      const selectedImages =Array.from(e.target.files);
      console.log(selectedImages)
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
              Edit Product
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
                {invalid.productname && <p className={styles.errors}>{invalid.productname}</p>}
              </SoftBox>
              <SoftBox mb={2}>
                <input
                  placeholder="image"
                  type="file"
                  id='added'
                  onChange={handleImage}
                  accept="image/*"
                  multiple
                />
                {invalid.image && <p className={styles.errors}>{invalid.image}</p>}
              </SoftBox>
              {imagePreview.map((Preview,index)=>(
                <img
                key={index}
                src={Preview}
                alt="imagePreview"
                className={styles.imagePreview}
                />
              ))}
         
              <SoftBox mb={2}>
                <InputLabel ><p className={styles.input}>Category</p></InputLabel>
                <select
                  placeholder=" category"
                  value={category}
                  className={styles.category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                {invalid.category && <p className={styles.errors}>{invalid.category}</p>}
                  <option value="" disabled>
                    select category
                  </option>
                  {categorylist.map((categoryitem) => (
                    <option key={categoryitem._id} value={categoryitem.category}>
                      {categoryitem.category}
                    </option>
                  ))}
                </select>
              </SoftBox>
              <SoftBox mb={2}>
              <SoftInput
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
                {invalid.price && <p className={styles.errors}>{invalid.price}</p>}
              </SoftBox>
              <SoftBox mb={2}>
              <SoftInput
                placeholder="offerprice"
                value={offerprice}
                onChange={(e) => setOfferprice(e.target.value)}
              />
                {invalid.price && <p className={styles.errors}>{invalid.price}</p>}
              </SoftBox>
              <SoftBox mb={2}>
              <SoftInput
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
                {invalid.description && <p className={styles.errors}>{invalid.description}</p>}
              </SoftBox>
              <SoftInput
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
                {invalid.brand && <p className={styles.errors}>{invalid.brand}</p>}
              <SoftBox mt={4} mb={1}>
                <button onClick={handleUpdate} className={styles.update}>
                Update
                </button>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </BasicLayout>
    </>
  );
}

export default productedit;
