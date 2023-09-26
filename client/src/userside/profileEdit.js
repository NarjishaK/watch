import React, { useEffect, useState } from "react";
import styles from './user.module.css'
import SoftInput from 'components/SoftInput';
import { useParams } from "react-router-dom";
import axios from "axios";

function profileEdit() {
  const [username, setUserName] = useState("");
  const [userphone, setUserPhone] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  
  useEffect(()=>{
    console.log(id)
    const fetchUser = async(e)=>{
      try{
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`http://localhost:8000/user/userediting/${id}`);
        const user = response.data;
        setUserName(user.username);
        setUserPhone(user.userphone);
        setUserEmail(user.useremail);
        setPassword(user.password);
        setAddress(user.address);
        setCountry(user.country);
        setPincode(user.pincode);
        setDob(user.dob);
        setCity(user.city);
        setImage(user.image);
      }catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  },[]);

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  }
  return (
    <>
      <div className={styles.body}>
        <section
          className="container"
          style={{
            marginInline: "34%",
            width: "505px",
            backgroundColor: "lavenderblush",
            marginTop: "3%",
          }}
        >
          <header>Registration Form</header>
          <form action="#" className="form">
            <div className="input-box">
              {/* <label>Full Name</label> */}
              <SoftInput
                type="text"
                placeholder="Enter full name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                className={styles.inpt}
              />
            </div>
            <div className="input-box">
              <SoftInput
                type="text"
                placeholder="Enter email address"
                value={useremail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className={styles.inpt}
              />
            </div>
            <div className="column">
              <div className="input-box">
                <SoftInput
                  type="number"
                  placeholder="Enter phone number"
                  value={userphone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  required
                  className={styles.inpt}
                />
              </div>
              <div className="input-box">
                <SoftInput
                  type="date"
                  placeholder="Enter birth date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className={styles.inpt}
                />
              </div>
            </div>

            <div className="input-box address">
              <SoftInput
                type="text"
                placeholder="Enter street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className={styles.inpt}
              />
              <div className="column">
                <div className="select-box">
                  <SoftInput
                    type="text"
                    placeholder="Enter your city"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className={styles.inpt}
                  />
                </div>
                <SoftInput
                  type="text"
                  placeholder="Enter your state"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className={styles.inpt}
                />
              </div>
              <div className="column">
                <SoftInput
                  type="number"
                  placeholder="Enter postal code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                  className={styles.inpt}
                />
              </div>
            </div>
            <SoftInput
              type="passsword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inpt}
            />
            <SoftInput
              placeholder="photo"
              type="file"
              onChange={handleImage}
              accept="image/*"
              required
              className={styles.inpt}
            />
            <a className={styles.loginn}>Already have an account?</a>
            <a href="/user-signin" className={styles.login}>
              Login
            </a>
            <br />
            <button
            //   onClick={handleSignup}
              className={styles.button}
              style={{ backgroundColor: "#f9d7dc" }}
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default profileEdit;
