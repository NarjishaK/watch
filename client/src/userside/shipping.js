import React from "react";
import styles from './shipping.module.css'
import { Card } from "@mui/material";
import { green } from "@mui/material/colors";
import Navbar from './components/navbar';
import Footer from './components/footer'

function Shipping() {
  return (
    <div style={{backgroundColor:'white'}}>
        <Navbar/>
      <div className="column" style={{ display: "flex" ,marginInline:'12px'}}>
        <div style={{ width: "50%" }}>
              <form action>
                <p>
                  {/* <i className="fas fa-shipping-fast" /> */}
                  Billing Details
                </p>
                <div className="name" >
                <div>
                    <input type="text" name="state" placeholder="E-mail"  className={styles.inpt}/>
                  </div>
                <div>
                    <input type="text" name="state" placeholder="Mobile-No"  className={styles.inpt}/>
                  </div>
                <div>
                    <input type="text" name="state" placeholder="Full Name"  className={styles.inpt}/>
                  </div>
                  <div className="column" >
                    <input type="text" name="f-name" placeholder="City" style={{width:'44%',marginRight:'13px'}}  className={styles.inpt}/>
                    <input type="text" name="l-name" placeholder="state" style={{width:'32%'}} className={styles.inpt}/>
                  </div>
                </div>
                <div className="street">
                  <input type="text" name="address" placeholder="street address" className={styles.inpt}/>
                </div>
                <div className="address-info">
                  <div>
                    <input type="text" name="city" placeholder="city" className={styles.inpt}/>
                  </div>
                  <div>
                    <input type="text" name="zip"placeholder="Zip/pincode"  className={styles.inpt}/>
                  </div>
                </div>
              </form>
        </div>
        <hr style={{color:'black'}}/>

        <div>
             <div className={styles.div1}>
                <p className={styles.summary}>summary</p><hr style={{color: 'black'}}/>
                <div className="row">
                    <div style={{width:'50%'}}><p>ITEMS 2</p></div>
                    <div style={{width:'30%'}}><p>Rs.9000</p></div>
                </div>
                <br/>
                <p className={styles.shipping}>GIVE CODE</p>
                <input placeholder="Enter Your code" type="text" className={styles.selct}/>
                <p className={styles.shipping}>SHIPPING</p>
                <select className={styles.selct}>
                    <option>standerd delivery  </option>
                    <option>Cash on Delivery</option>
                    <option>UPI/Debit card</option>
                </select>
                <div className="row">
                    <div style={{width:'50%'}} className={styles.sub}>
                    <p>Sub total</p><p>Delivery (standerd)</p>
                    <p>Offer Price</p><strong style={{color:'black',fontSize:'medium'}}>Total</strong>
                    </div>
                    <div style={{width:'30%'}}className={styles.sub}>
                    <p>Rs.9000</p>
                    <p style={{color:'green',fontSize:'small'}}>Free</p><p>Rs.00</p><strong style={{color:'black',fontSize:'medium'}}>Rs.9000</strong>
                    </div>
                </div>
              
             </div>
        </div>

      </div>
      <hr/>
      <div style={{ width: "50%" }}>
              <form action>
                <p>
                  <i className="fas fa-shipping-fast" />
                   Shipping Details
                </p>
                <div className="name" >
                <div>
                    <input type="text" name="state" placeholder="E-mail"  className={styles.inpt}/>
                  </div>
                <div>
                    <input type="text" name="state" placeholder="Mobile-No"  className={styles.inpt}/>
                  </div>
                <div>
                    <input type="text" name="state" placeholder="Full Name"  className={styles.inpt}/>
                  </div>
                  <div className="column" >
                    <input type="text" name="f-name" placeholder="City" style={{width:'44%',marginRight:'13px'}}  className={styles.inpt}/>
                    <input type="text" name="l-name" placeholder="state" style={{width:'32%'}} className={styles.inpt}/>
                  </div>
                </div>
                <div className="street">
                  <input type="text" name="address" placeholder="street address" className={styles.inpt}/>
                </div>
                <div className="address-info">
                  <div>
                    <input type="text" name="city" placeholder="city" className={styles.inpt}/>
                  </div>
                  <div>
                    <input type="text" name="zip"placeholder="Zip/pincode"  className={styles.inpt}/>
                  </div>
                </div>
              </form>
        </div>
        <Footer/>
    </div>
  );
}

export default Shipping;
