import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./admin.module.css";

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

// Images
import curved6 from "assets/images/img1.avif";
import axios from "axios";
import DashboardNavbars from "examples/Navbars/DashboardNavbar";

function SignUp() {
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [invalid, setInvalid] = useState("");

  const hansleSignup = async (e) => {
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
    const data = {
      name: name,
      phone: phone,
      email: email,
      password: password,
      roll: roll,
      image: image,
      location: location,
    };
    console.log("Sending data:", data);
    try {
      const response = await axios.post("http://localhost:8000/admin/createadmin", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API response:", response.data);
      setInvalid({});
      window.location.href = "/AdminUsers";
    } catch (err) {
      console.log("API error:", err);
      setInvalid({ email: "Email is already in use" });
    }
  };
  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <>
      <DashboardNavbars />

      <BasicLayout title="CHOPARD" image={curved6}>
        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Register
            </SoftTypography>
          </SoftBox>
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput
                  placeholder="image"
                  type="file"
                  onChange={handleImage}
                  accept="image/*"
                />
              </SoftBox>
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
                  placeholder="Phone.No"
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

              <SoftBox mt={4} mb={1}>
                <button onClick={hansleSignup} className={styles.signup}>
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

export default SignUp;
