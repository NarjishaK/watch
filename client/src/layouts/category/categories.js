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


function Category() {

  const navigate=useNavigate();
  const [category,setCategory]= useState([]);

  useEffect(()=>{
    List();
  },[]);

  const List = async()=>{
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get('http://localhost:8000/category/listcategory')
      setCategory(response.data)
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }
  const handleEdit =(id)=>{
    navigate(`/category/edit/${id}`)
  }
  
  const handleRemove =async(id)=>{
    const confirmation = window.confirm("Are you sure you want to delete this  category?");
    if (confirmation) {
    try{
      const response = await axios.delete(`http://localhost:8000/category/deletecategory/${id}`)
      List();
    }catch(err){
      console.log(err);
    }
  }
  }
  
  
    return (
      <DashboardLayout>
        <Header />
        <SoftBox mt={5} mb={3}/>
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={2} px={2}>
              <SoftBox mb={0.5}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Categories
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={1}>
              </SoftBox>
            </SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={3}>
                {category.map((item => (
                  <Grid item xs={12} md={6} xl={3} key={item._id}>
                    <DefaultProjectCard
                      // style={{ height: "700px" }}
                      image={`http://localhost:8000/upload/${item.image}`}
                      
                      label={item.category}
                      // description={category.description}
                      action={{}}
                      authors={[]}
                      onEdit={()=>handleEdit(item._id)}
                      onRemove={() => handleRemove(item._id)}
                    />
                  </Grid>
                )))} 
                <Grid item xs={12} md={6} xl={3}>
                  <Link to="/category/create">
                    <PlaceholderCard title={{ variant: "h5", text: "Add Category" }} outlined />
                  </Link>
                </Grid>
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
      </DashboardLayout>
    );
  }
  
  export default Category;