import React from 'react'
import styles from './user.module.css'

function userReg() {
  return (
    <div >
<section className="container">
  <header>Registration Form</header>
  <form action="#" className="form">
    <div className="input-box">
      {/* <label>Full Name</label> */}
      <input type="text" placeholder="Enter full name" required />
    </div>
    <div className="input-box">
      <input type="text" placeholder="Enter email address" required />
    </div>
    <div className="column">
      <div className="input-box">
        <input type="number" placeholder="Enter phone number" required />
      </div>
      <div className="input-box">
        <input type="date" placeholder="Enter birth date" required />
      </div>
    </div>
    {/* <div className="gender-box">
      <h3>Gender</h3>
      <div className="gender-option">
        <div className="gender">
          <input type="radio" id="check-male" name="gender" defaultChecked />
          <label htmlFor="check-male">male</label>
        </div>
        <div className="gender">
          <input type="radio" id="check-female" name="gender" />
          <label htmlFor="check-female">Female</label>
        </div>
        <div className="gender">
          <input type="radio" id="check-other" name="gender" />
          <label htmlFor="check-other">prefer not to say</label>
        </div>
      </div>
    </div> */}
    <div className="input-box address">
      {/* <label>Address</label> */}
      <input type="text" placeholder="Enter street address" required />
      <input type="text" placeholder="Enter street address line 2" required />
      <div className="column">
        <div className="select-box">
          <select>
            <option hidden>Country</option>
            <option>America</option>
            <option>Japan</option>
            <option>India</option>
            <option>Nepal</option>
          </select>
        </div>
        <input type="text" placeholder="Enter your city" required />
      </div>
      <div className="column">
        {/* <input type="text" placeholder="Enter your region" required /> */}
        <input type="number" placeholder="Enter postal code" required />
      </div>
    </div>
    <button>Submit</button>
  </form>
</section>
</div>
)
}

export default userReg