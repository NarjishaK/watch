import React, { useEffect } from "react";

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./admin.module.css";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import DashboardNavbars from "examples/Navbars/DashboardNavbar";


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/img1.avif";
import axios from "axios";
function adminedit() {
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[roll,setRoll]= useState('');
  const[location,setLocation]=useState('');
  const[image,setImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate("");
  const [invalid,setInvalid]=useState(false)



  useEffect(() => {
    const fetchAdmin = async (e) => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`http://localhost:8000/admin/adminedit/${id}`);
        const admin = response.data;
        setPhone(admin.phone);
        setName(admin.name);
        setEmail(admin.email);
        setPassword(admin.password);
        setLocation(admin.location);
        setRoll(admin.roll);
        setImage(admin.image);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdmin();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!name) {
      validationErrors.name = "Name is required";
    }
    if (!phone) {
      validationErrors.phone = "Phone is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (!roll) {
      validationErrors.roll = "Role is required";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      setInvalid(validationErrors);
      return;
    }

    const requestData = { name, phone, email, password,roll,location,image };
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/updateadmin/${id}`,
        requestData,
        {
          headers: {
            'Content-Type': "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate('/AdminUsers');
    } catch (err) {
      console.log(err);
    }
  };
  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  }
  return (
    <>
    <DashboardNavbars/>
    <BasicLayout title="CHOPARD" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Edit Admin
          </SoftTypography>
        </SoftBox>

        {/* <Separator /> */}
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox mb={2}>
            <SoftInput placeholder="image" type="file" onChange={handleImage} accept="image/*" />
          </SoftBox>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {invalid.name && <p className={styles.errors}>{invalid.name}</p>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Role"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
              {invalid.roll && <p className={styles.errors}>{invalid.roll}</p>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {invalid.phone && <p className={styles.errors}>{invalid.phone}</p>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {invalid.email && <p className={styles.errors}>{invalid.email}</p>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {invalid.password && <p className={styles.errors}>{invalid.password}</p>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </SoftBox>
            {/* <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox> */}
            <SoftBox mt={4} mb={1}>
              <button className={styles.signup} onClick={handleUpdate}>
                Save
              </button>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
    </>
  );
}

export default adminedit;
