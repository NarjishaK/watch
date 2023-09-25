
 
 import React, { useEffect, useState } from 'react'
 import styles from './user.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Password } from '@mui/icons-material';
 function usersignup() {

  const[useremail,setUserEmail]=useState('');
  const[password,setPassword]=useState('');

  const handleSignIn =(e)=>{
    e.preventDefault ();
    const data={
      useremail:useremail,
      password:password
    };
    axios.post("http://localhost:8000/user/usersignin", data,{
      headers:{
        Authorization:`Bearer${localStorage.getItem('token')}`
      }
      })
      .then((response) => {
        if (response.status === 200) {
          const token =response.data.token
          localStorage.setItem("token", token);
          const userpage = response.data.userpage
          localStorage.setItem('userpage',JSON.stringify(userpage))
          console.log('token stored in local storage:',token)
          window.location.href = "/homepage";

        }
      })
      .catch((error) => {});
  }
  
 return (
   <div className="content" style={{ placeItems: "center", marginTop: "3%" }}>
     <div className="text">CHOPARD LOGIN</div>
     <button style={{ width: "400px", height: "400px" }} className={styles.button}>
       <form action="#">
         <div className="field">
           <button type="text" style={{ width: "350px" }} className={styles.button}>
             <input
               type="text"
               placeholder=" Enter your email"
               style={{
                 width: "350px",
                 borderRadius: "20px",
                 height: "50px",
                 backgroundColor: "transparent",
               }}
               onChange={(e) => setUserEmail(e.target.value)}
             />
           </button>
         </div>
         <div className="field">
           <button type="text" style={{ width: "350px" }} className={styles.button}>
             <input
               type="text"
               placeholder=" Password"
               style={{
                 width: "350px",
                 borderRadius: "20px",
                 height: "50px",
                 backgroundColor: "transparent",
               }}
               onChange={(e) => setPassword(e.target.value)}
             />
           </button>
         </div>
         <div className="forgot-pass">
           <a href="/forgot">Forgot Password?</a>
         </div>
         <button
           type="text"
           style={{ width: "350px" }}
           className={styles.button}
           onClick={handleSignIn}
         >
           Sign in
         </button>

         <div className="sign-up">
           Not a member?
           <a href="/user-register">signup now</a>
         </div>
       </form>
     </button>
   </div>
 );
}


export default usersignup

