
 
 import React from 'react'
 import styles from './user.module.css'
 function usersignup() {
 return (
<div className="content">
 <div className="text">
    CHOPARD LOGIN
 </div>
 <button style={{width:'400px', height:'400px'}}>
 <form action="#">
   <div className="field">
       <button type='text' style={{width:'350px'}} ><input type='text' placeholder=' Enter your email' style={{width:'350px',borderRadius:'20px',height:'50px', backgroundColor:'transparent'}}/></button>
   </div>
   <div className="field">
   <button type='text' style={{width:'350px'}} ><input type='text' placeholder=' Password' style={{width:'350px',borderRadius:'20px',height:'50px', backgroundColor:'transparent'}}/></button>
   </div>
     {/* <input type="password" required />
      <span className="fas fa-lock" />
      <label>Password</label> */}
   {/* <div className="forgot-pass">
     <a href="#">Forgot Password?</a>
   </div> */}
   <button type='text' style={{width:'350px'}} >Sign in</button>
  
   <div className="sign-up">
     Not a member?
     <a href="#">signup now</a>
   </div>
 </form>
 </button>
</div>


 )
}


export default usersignup

