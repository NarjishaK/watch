import React, { useState } from "react";
import styles from "./shipping.module.css";
import { Card } from "@mui/material";
import { green } from "@mui/material/colors";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { FaRupeeSign } from "react-icons/fa";

function Shipping() {
  const [username, setUserName] = useState("");
  const [discount, setDiscount] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const userpage = JSON.parse(localStorage.getItem("userpage")) || [];
  const coupon = JSON.parse(localStorage.getItem("coupon")) || [];
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    country: "",
    address: "",
    pincode: "",
    state: "",
  });
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    country: "",
    address: "",
    pincode: "",
    state: "",
  });

  const savedCartProduct = JSON.parse(localStorage.getItem("savedCartProduct")) || [];
  const [savedCartProducts, setsavedCartProducts] = useState(savedCartProduct);
  const totalProductCount = savedCartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const subtotalPrice = savedCartProducts.reduce(
    (total, product) => total + product.offerprice * product.quantity,
    0
  );
  const discountPrice = (subtotalPrice / 100) * coupon.discount;
  const totalPrice = subtotalPrice - discountPrice;
  console.log("000000",discountPrice);
  console.log("99999",coupon.discount);

  const [isSameAddress, setIsSameAddress] = useState(false);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (isSameAddress) {
      setShippingDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (isSameAddress) {
      setBillingDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress);

    if (!isSameAddress) {
      setShippingDetails({ ...billingDetails });
    } else {
      setShippingDetails({
        name: "",
        phone: "",
        email: "",
        city: "",
        country: "",
        address: "",
        pincode: "",
        state: "",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar />
      <div className="column" style={{ display: "flex", marginInline: "12px" }}>
        <div style={{ width: "50%" }}>
          {userpage && (
            <form action>
              <p>
                {/* <i className="fas fa-shipping-fast" /> */}
                Billing Details
              </p>
              <div className="name">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={billingDetails.name}
                    placeholder="fullname"
                    className={styles.inpt}
                    onChange={handleBillingChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    value={billingDetails.phone}
                    placeholder="phone"
                    className={styles.inpt}
                    onChange={handleBillingChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="email"
                    value={billingDetails.email}
                    placeholder="e-mail"
                    className={styles.inpt}
                    onChange={handleBillingChange}
                  />
                </div>
                <div className="column">
                  <input
                    type="text"
                    name="address"
                    value={billingDetails.address}
                    placeholder="address"
                    style={{ width: "44%", marginRight: "13px" }}
                    className={styles.inpt}
                    onChange={handleBillingChange}
                  />
                  <input
                    type="text"
                    name="city"
                    value={billingDetails.city}
                    placeholder="city"
                    style={{ width: "32%" }}
                    className={styles.inpt}
                    onChange={handleBillingChange}
                  />
                </div>
              </div>
              <div className="street">
                <input
                  type="text"
                  name="state"
                  value={billingDetails.state}
                  placeholder="state"
                  className={styles.inpt}
                  onChange={handleBillingChange}
                />
              </div>
              <div className="address-info">
                <div>
                  <input
                    type="text"
                    name="country"
                    value={billingDetails.country}
                    placeholder="country"
                    className={styles.inpt}
                    onChange={handleBillingChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="pincode"
                    value={billingDetails.pincode}
                    placeholder="Zip"
                    className={styles.inpt}
                    onChange={handleBillingChange}
                  />
                </div>
              </div>
            </form>
          )}
        </div>
        <hr style={{ color: "black" }} />

        <div>
          <div className={styles.div1}>
            <p className={styles.summary}>summary</p>
            <hr style={{ color: "black" }} />
            <div className="row">
              <div style={{ width: "50%" }}>
                <p>ITEMS {totalProductCount}</p>
              </div>
              <div style={{ width: "30%" }}>
                <p>Rs.{subtotalPrice.toFixed(2)}</p>
              </div>
            </div>
            <br />

            <p className={styles.shipping}>COUPON CODE</p>
            {coupon && (
              <input
                id="code"
                placeholder="Enter your code"
                value={coupon.couponcode}
                className={styles.coupons}
                // onChange={(e) => setCouponCode(e.target.value)}
              />
            )}
            <p className={styles.shipping}>SHIPPING</p>
            <select className={styles.selct}>
              <option>standerd delivery </option>
              <option>Cash on Delivery</option>
              <option>UPI/Debit card</option>
            </select>
            <div className="row">
              <div style={{ width: "50%" }} className={styles.sub}>
                <p>Sub total</p>
                <p>Delivery (standerd)</p>
                <p>Offer Price</p>
                <strong style={{ color: "black", fontSize: "medium" }}>Total</strong>
              </div>
              <div style={{ width: "30%" }} className={styles.sub}>
                <p>Rs.{subtotalPrice.toFixed(2)}</p>
                <p style={{ color: "green", fontSize: "small" }}>Free</p>
                <p>
                  <FaRupeeSign />
                  {discountPrice.toFixed(2)}
                </p>
                <strong style={{ color: "black", fontSize: "medium" }}>
                  <FaRupeeSign />
                  {totalPrice.toFixed(2)}
                </strong>
              </div>
              <hr/>
            </div>
          </div>
          <button className={styles.order}>Place Order</button>

        </div>
      </div>
      <hr />
      <div style={{ width: "50%", marginBottom: "2px" }}>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="sameAddress"
            checked={isSameAddress}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          <p htmlFor="sameAddress" style={{ marginTop: "-45px" }}>
            Use same address for shipping
          </p>
        </div>
        <form action>
          <p>Shipping Details</p>
          <div className="name">
            <div>
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                placeholder="fullname"
                className={styles.inpt}
                onChange={handleShippingChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Mobile-No"
                value={shippingDetails.phone}
                className={styles.inpt}
                onChange={handleShippingChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="email"
                placeholder="e-mail"
                value={shippingDetails.email}
                className={styles.inpt}
                onChange={handleShippingChange}
              />
            </div>
            <div className="column">
              <input
                type="text"
                name="city"
                placeholder="City"
                style={{ width: "44%", marginRight: "13px" }}
                value={shippingDetails.city}
                className={styles.inpt}
                onChange={handleShippingChange}
              />
              <input
                type="text"
                name="state"
                placeholder="state"
                style={{ width: "32%" }}
                value={shippingDetails.state}
                className={styles.inpt}
                onChange={handleShippingChange}
              />
            </div>
          </div>
          <div className="street">
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              placeholder="street address"
              className={styles.inpt}
              onChange={handleShippingChange}
            />
          </div>
          <div className="address-info">
            <div>
              <input
                type="text"
                name="country"
                placeholder="city"
                value={shippingDetails.country}
                className={styles.inpt}
                onChange={handleShippingChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="pincode"
                placeholder="Zip/pincode"
                value={shippingDetails.pincode}
                className={styles.inpt}
                onChange={handleShippingChange}
              />
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Shipping;
