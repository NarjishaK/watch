import React from 'react'
import styles from './forgot.module.css'
import { useState } from 'react'
import SoftBox from 'components/SoftBox';
import SoftInput from 'components/SoftInput';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar'
import Footrer from './components/footer'


function otp() {
    const [otp,setOtp]=useState('');

  return (
    <>
    <Navbar/>
    <div className={styles.div}>
    <div className={styles.div1}>
      <SoftBox mb={2}>
      
        <h4 style={{marginLeft:'10px'}}>CHOPARD</h4>
        <p style={{ fontSize: '13px' }}>Enter your OTP</p>
        <SoftInput  onChange={(e) => setOtp(e.target.value)} type="text" placeholder="OTP" />
      </SoftBox>
        {/* {invalid && ( */}
         <p className={styles.invalidd}>
        {/* {invalid} */}
         </p>

              {/* )} */}
      {/* <SoftBox mt={4} mb={1}>
        <div className={styles.div2}>
          <Link >
            <Button variant="success" onClick={handleForgot}>Done</Button>
          </Link>
        </div>
      </SoftBox> */}
    </div>
  </div>
  <Footrer/>
  </>
  )
}


export default otp