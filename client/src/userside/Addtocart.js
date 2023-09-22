import React from "react";
import styles from "./cart.module.css";
import Navbar from "./components/navbar";
import { useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";
function Addtocart() {

    const savedCartProduct = JSON.parse(localStorage.getItem('savedCartProduct')) || [];
   const navigate =useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container bootstrap snippets bootdey">
        <hr />
        <div className="card">
          <div className="row">
            <div className="col-md-8 cart">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                  <div className="col align-self-center text-right text-muted">3 items</div>
                </div>
              </div>
              <div className="row border-top border-bottom">
              {savedCartProduct.map((product) => (
                <div className="row main align-items-center" key={product.id}>
                  <div className="col-2">
                    <img className="img-fluid" src={product.image} />
                  </div>
                  <div className="col">
                    <div className="row text-muted">{product.productname}</div>
                    <div className="row">{product.price}</div>
                  </div>
                  <div className="col">
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>
                  </div>
                  <div className="col">
                    Rs. 44.00 
                    {/* <span className="close">✕</span> */}
                    <button className={styles.close}><span className="close" style={{color:'red'}}>✕</span></button>
                  </div>
                </div>
              ))}
              </div>
              {/* <div className="row">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img className="img-fluid" src="https://i.imgur.com/ba3tvGm.jpg" />
                  </div>
                  <div className="col">
                    <div className="row text-muted">Shirt</div>
                    <div className="row">Cotton T-shirt</div>
                  </div>
                  <div className="col">
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>
                  </div>
                  <div className="col">
                    € 44.00 <span className="close">✕</span>
                  </div>
                </div>
              </div> */}
              {/* <div className="row border-top border-bottom">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img className="img-fluid" src="https://i.imgur.com/pHQ3xT3.jpg" />
                  </div>
                  <div className="col">
                    <div className="row text-muted">Shirt</div>
                    <div className="row">Cotton T-shirt</div>
                  </div>
                  <div className="col">
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>
                  </div>
                  <div className="col">
                    € 44.00 <span className="close">✕</span>
                  </div>
                </div>
              </div> */}
              <div className="back-to-shop">
                <a href="#">←</a>
                <span className="text-muted">Back to shop</span>
              </div>
            </div>
            <div className="col-md-4 summary">
              <div>
                <h5>
                  <b>Summary</b>
                </h5>
              </div>
              <hr />
              <div className="row">
                <div className="col" style={{ paddingLeft: " 0" }}>
                  ITEMS 3
                </div>
                <div className="col text-right">€ 132.00</div>
              </div>
              <form>
                <p>SHIPPING</p>
                <select>
                  <option className="text-muted">Standard-Delivery- €5.00</option>
                </select>
                <p>GIVE CODE</p>
                <input id="code" placeholder="Enter your code" />
              </form>
              <div
                className="row"
                style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
              >
                <div className="col">TOTAL PRICE</div>
                <div className="col text-right">€ 137.00</div>
              </div>
              <button className="btn">CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addtocart;
