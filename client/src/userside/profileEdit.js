import React from "react";
import styles from './user.module.css'
import SoftInput from 'components/SoftInput';

function profileEdit() {
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
                // value={username}
                // onChange={(e) => setUserName(e.target.value)}
                required
                className={styles.inpt}
              />
            </div>
            <div className="input-box">
              <SoftInput
                type="text"
                placeholder="Enter email address"
                // value={useremail}
                // onChange={(e) => setUserEmail(e.target.value)}
                required
                className={styles.inpt}
              />
            </div>
            <div className="column">
              <div className="input-box">
                <SoftInput
                  type="number"
                  placeholder="Enter phone number"
                //   value={userphone}
                //   onChange={(e) => setUserPhone(e.target.value)}
                  required
                  className={styles.inpt}
                />
              </div>
              <div className="input-box">
                <SoftInput
                  type="date"
                  placeholder="Enter birth date"
                //   value={dob}
                //   onChange={(e) => setDob(e.target.value)}
                  required
                  className={styles.inpt}
                />
              </div>
            </div>

            <div className="input-box address">
              <SoftInput
                type="text"
                placeholder="Enter street address"
                // value={address}
                // onChange={(e) => setAddress(e.target.value)}
                required
                className={styles.inpt}
              />
              <div className="column">
                <div className="select-box">
                  <SoftInput
                    type="text"
                    placeholder="Enter your city"
                    // value={country}
                    // onChange={(e) => setCountry(e.target.value)}
                    required
                    className={styles.inpt}
                  />
                </div>
                <SoftInput
                  type="text"
                  placeholder="Enter your state"
                //   value={city}
                //   onChange={(e) => setCity(e.target.value)}
                  required
                  className={styles.inpt}
                />
              </div>
              <div className="column">
                <SoftInput
                  type="number"
                  placeholder="Enter postal code"
                //   value={pincode}
                //   onChange={(e) => setPincode(e.target.value)}
                  required
                  className={styles.inpt}
                />
              </div>
            </div>
            <SoftInput
              type="passsword"
              placeholder="Password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inpt}
            />
            <SoftInput
              placeholder="photo"
              type="file"
            //   onChange={handleImage}
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
