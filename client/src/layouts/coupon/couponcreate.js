import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState, useEffect } from "react";
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
import styles from "../products/product.module.css";
// Images
import curved6 from "assets/images/img1.avif";
import DashboardNavbars from "examples/Navbars/DashboardNavbar";
import { InputLabel, MenuItem, Select } from "@mui/material";

function couponcreate() {
  const [couponname, setCouponname] = useState("");
  const [couponcode, setCouponcode] = useState("");
  const [discount, setDiscount] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    const data = {
      couponname: couponname,
      couponcode: couponcode,
      discount: discount,
    };
    try {
      const response = await axios.post("http://localhost:8000/coupon/couponcreate", data);

      navigate("/couponlist");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <DashboardNavbars />
      <BasicLayout title="CHOPARD" image={curved6}>
        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Coupon
            </SoftTypography>
          </SoftBox>
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput
                  placeholder="Coupon Name"
                  value={couponname}
                  onChange={(e) => setCouponname(e.target.value)}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  placeholder="Coupon code"
                  value={couponcode}
                  onChange={(e) => setCouponcode(e.target.value)}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  placeholder="Discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <button className={styles.update} onClick={handleSave}>
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

export default couponcreate;
