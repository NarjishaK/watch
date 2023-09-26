import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import Navbar from './components/navbar'
import Footrer from './components/footer'
import { Link, useNavigate } from 'react-router-dom';

function userProfile() {
    
    const userpage =JSON.parse(localStorage.getItem('userpage')) || [];
    console.log(userpage)
    const navigate =useNavigate();
    
    // const handleEdit=()=>{
    //     navigate ('/profile-editing/:id')
    // }
   

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
            <div className=" px-2 rounded mt-4 date ">
              {" "}
              <span className="join">{userpage.dob}</span>{" "}
            </div>{" "}
            <div className=" px-2 rounded mt-4 date ">
              {" "}
              <span className="join">{userpage.userphone}</span>{" "}<br/>
              <span className="join">{userpage.useremail}</span>{" "}
            </div>{" "}
            <div className=" d-flex mt-2">
              {" "}
              <button className={styles.button} > <Link to={`/profile-editing/${userpage.id}`} >Edit Profile</Link></button>{" "}
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