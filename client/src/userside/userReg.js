import React, { useState } from 'react'
import styles from './user.module.css'
import SoftInput from 'components/SoftInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function userReg() {
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
  const navigate =useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const data={
      username:username,
        userphone:userphone ,
        useremail:useremail,
        password:password,
        address:address ,
        country:country ,
        dob:dob,
        city:city,
        pincode:pincode,
        image:image ,
    };
    console.log('sending user data',data)
    try {
      const response = await axios.post("http://localhost:8000/user/createuser", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API response:", response.data);
      navigate("/user-signin");
    } catch (err) {
      console.log("API error:", err);
     
    }
  };

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

return (
  <>
    <div className={styles.body} >
  <section className="container" style={{marginInline: '34%', width: '505px',backgroundColor: 'lavenderblush',marginTop:'3%'}}>
  <header>Registration Form</header>
  <form action="#" className="form">
    <div className="input-box">
      {/* <label>Full Name</label> */}
      <SoftInput type="text" placeholder="Enter full name"
      value={username}
      onChange={(e) => setUserName(e.target.value)}
       required  className={styles.inpt}/>
    </div>
    <div className="input-box">
      <SoftInput type="text" placeholder="Enter email address"
      value={useremail}
      onChange={(e) => setUserEmail(e.target.value)}
      required className={styles.inpt} />
    </div>
    <div className="column">
      <div className="input-box">
        <SoftInput type="number" placeholder="Enter phone number"
        value={userphone}
        onChange={(e) => setUserPhone(e.target.value)}
        required className={styles.inpt} />
      </div>
      <div className="input-box">
        <SoftInput type="date" placeholder="Enter birth date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required className={styles.inpt}/>
      </div>
    </div>
  
    <div className="input-box address">
      <SoftInput type="text" placeholder="Enter street address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      required  className={styles.inpt}/>
      <div className="column">
        <div className="select-box">
        <SoftInput type="text" placeholder="Enter your city"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required className={styles.inpt}
        />
        </div>
        <SoftInput type="text" placeholder="Enter your state"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required className={styles.inpt}
        />
      </div>
      <div className="column">
        {/* <input type="text" placeholder="Enter your region" required /> */}
        <SoftInput type="number" placeholder="Enter postal code"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        required 
        className={styles.inpt}/>
      </div>
    </div>
    <SoftInput type="passsword" placeholder="Password" value={password}
    onChange={(e) => setPassword(e.target.value)} required  className={styles.inpt}/>
    <SoftInput  placeholder="photo" 
    type="file"
    onChange={handleImage}
    accept="image/*"
    required 
    className={styles.inpt}/>
    <a className={styles.loginn}>Already have an account?</a><a href='/user-signin' className={styles.login}>Login</a><br/>
    <button onClick={handleSignup} className={styles.button} style={{backgroundColor:'#f9d7dc'}}>Submit</button>
  </form>
</section>
</div>
</>
)
}

export default userReg