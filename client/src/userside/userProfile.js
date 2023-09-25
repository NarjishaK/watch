import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import Navbar from './components/navbar'
import Footrer from './components/footer'

function userProfile() {
    
    const userpage =JSON.parse(localStorage.getItem('userpage')) || [];
    console.log(userpage)
   

  return (
    <div>
        <Navbar/>
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        {" "}
        {userpage &&(
        <div className="card p-4" style={{ width: '427px'}} >
          {" "}
          <div className=" image d-flex flex-column justify-content-center align-items-center">
            {" "}
            <button className="btn btn-secondary">
              {" "}
              <img src={`http://localhost:8000/upload/${userpage.image}`} height={100} width={100} />
            </button>{" "}
            <span className="name mt-3">{userpage.username}</span>
            <div className="text mt-3">
              {" "}
              <span>
                {userpage.address}<br/>{userpage.pincode}
                <br />
                {userpage.city} ,{userpage.country}
              </span>{" "}
            </div>{" "}
            {/* <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              {" "}
              <span>
                <i className="fa fa-twitter" />
              </span>{" "}
              <span>
                <i className="fa fa-facebook-f" />
              </span>{" "}
              <span>
                <i className="fa fa-instagram" />
              </span>{" "}
              <span>
                <i className="fa fa-linkedin" />
              </span>{" "}
            </div>{" "} */}
            <div className=" px-2 rounded mt-4 date ">
              {" "}
              <span className="join">{userpage.dob}</span>{" "}
            </div>{" "}
            <div className=" px-2 rounded mt-4 date ">
              {" "}
              <span className="join">{userpage.userphone}</span>{" "}
            </div>{" "}
            
            <div className=" d-flex mt-2">
              {" "}
              <button className={styles.button}>Edit Profile</button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        )}
      </div>
      <Footrer/>
    </div>
  );
}

export default userProfile