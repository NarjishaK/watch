import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./forgot.module.css";
import axios from "axios";
import Navbar from "./components/navbar";
import Footrer from "./components/footer";

function forgot() {
  const [useremail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const handleForgot = async () => {
    const data = {
      useremail: useremail,
    };
    try {
      const response = await axios.post("http://localhost:8000/user/forgotpassword", data);
      const userData = {
        useremail: response.data.data.useremail,
        id: response.data.data.id,
      };
      localStorage.setItem("userDatas", JSON.stringify(userData));
      if (useremail) {
        navigate(`/otp/${userData.id}`);
      }
    } catch (err) {
      console.log(err);
      alert("user not found");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.div}>
        <div className={styles.div1}>
          <SoftBox mb={2}>
            <h4 style={{ marginLeft: "10px" }}>CHOPARD</h4>
            <p style={{ fontSize: "13px" }}>Enter your registered Email</p>
            <SoftInput
              onChange={(e) => setUserEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
          </SoftBox>
          <p className={styles.invalidd}></p>
          <SoftBox mt={4} mb={1}>
            <div className={styles.div2}>
              <Link>
                <Button variant="success" onClick={handleForgot}>
                  Done
                </Button>
              </Link>
            </div>
          </SoftBox>
        </div>
      </div>
      <Footrer />
    </>
  );
}

export default forgot;
