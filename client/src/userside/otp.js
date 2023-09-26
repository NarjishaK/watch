import React, { useEffect } from "react";
import styles from "./forgot.module.css";
import { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar";
import Footrer from "./components/footer";
import axios from "axios";

function otp() {
  const [otp, setOtp] = useState("");
  const [enterotp, setEnterotp] = useState("");
  const [showCountdown, setShowCountdown] = useState(true);
  const [showgetOtp, setGetOtp] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const getEmail = JSON.parse(localStorage.getItem("userDatas")) || {};
    setOtp(getEmail);
    let timer;
    if (showCountdown) {
      timer = setInterval(() => {
        if (countdown === 0) {
          clearInterval(timer);
          setGetOtp(true);
          setShowCountdown(false);
          return;
        }
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [showCountdown, countdown]);

  const datas = {
    useremail: `${otp.useremail}`,
    enterotp: enterotp,
  };
  axios
    .post("http://localhost:8000/user/getotp", datas)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <>
      <Navbar />
      <div className={styles.div}>
        <div className={styles.div1}>
          <SoftBox mb={2}>
            <h4 style={{ marginLeft: "10px" }}>CHOPARD</h4>
            <p style={{ fontSize: "13px" }}>Enter your OTP</p>
            <SoftInput onChange={(e) => setOtp(e.target.value)} type="text" placeholder="OTP" />
            {showCountdown && (
              <p style={{ fontSize: "10px", color: "green" }}>{`OTP valid till ${countdown}`}</p>
            )}
          </SoftBox>
          <p className={styles.invalidd}></p>
          <SoftBox mt={4} mb={1}>
            <div className={styles.div2}>
              <Link>
                <Button variant="success">Done</Button>
              </Link>
            </div>
          </SoftBox>
        </div>
      </div>
      <Footrer />
    </>
  );
}

export default otp;
