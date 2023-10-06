import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import Navbar from "./components/navbar";
import { Link, useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";
import { Card } from "react-bootstrap";
import Footer from "./components/footer";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";

function Addtocart() {
  const [couponCode, setCouponCode] = useState("");
  const [discount,setDiscount]=useState('');
  const savedCartProduct = JSON.parse(localStorage.getItem("savedCartProduct")) || [];
  const [savedCartProducts, setsavedCartProducts] = useState(savedCartProduct);
  const [updatedCart, setupdatedCart]= useState(savedCartProduct);
  const [isupdatedCart, setIsupdatedcart]=useState(false);
  const navigate = useNavigate();
  
  const totalProductCount = savedCartProducts.reduce((total, product) => total + product.quantity, 0);

  const subtotalPrice = savedCartProducts.reduce((total, product) => total + product.offerprice* product.quantity, 0);
  const discountPrice = (subtotalPrice/100)*discount;
  const totalPrice = subtotalPrice-discountPrice;
  console.log(discountPrice);
  console.log(discount);

  

  const handleIncrement = (productId)=> {
    console.log("hiii", productId)
    const updatedCart = savedCartProducts.map((item)=>{
      if(item.id===productId){
        return{
          ...item,
          quantity: item.quantity+1,
        };
      }
      return item;
    })
    console.log("kiiii", updatedCart)
    setsavedCartProducts(updatedCart);
    setupdatedCart(updatedCart);
    setIsupdatedcart(true);
    localStorage.setItem("savedCartProduct", JSON.stringify(updatedCart));
    setIsupdatedcart(false);
  }
  const handleDecrement = (productId)=> {
    const updatedCart = savedCartProducts.map((item)=>{
      if(item.id===productId){
        return{
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        };
      }
      return item;
    })
    setsavedCartProducts(updatedCart);
    setupdatedCart(updatedCart);
    setIsupdatedcart(true);
    localStorage.setItem("savedCartProduct", JSON.stringify(updatedCart))
    setIsupdatedcart(false);
  }
  

  

  // Remove a specific product from the cart
  const handleRemove = (productId) => {
    const updatedProducts = savedCartProduct.filter((product) => product.id !== productId);
    localStorage.setItem("savedCartProduct", JSON.stringify(updatedProducts));
    setsavedCartProducts(updatedProducts);
  };

  //clear all product
  const handleClear = () => {
    setsavedCartProducts([]);
    localStorage.removeItem('savedCartProduct');
  };
  // Function to handle applying the coupon code
  const handleApplyCoupon = async () => {
    console.log(couponCode)
    const formdata = {
      couponcode: couponCode,
    }
    try {
      const response = await axios.post("http://localhost:8000/coupon/couponcheck", formdata);
      console.log(response.data);
      localStorage.setItem("coupon", JSON.stringify(response.data))
      setDiscount(response.data.discount);

    } catch (error) {
      alert("Network error. Please check your internet connection.");
    }
  }
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
                  <div className="col align-self-center text-right text-muted">{totalProductCount}items</div>
                  <button className={styles.clear} onClick={handleClear}>clear</button>
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
                      <div className="row" style={{textDecoration:'line-through'}}>{product.price}</div>
                      <div className="row">{product.offerprice}</div>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-icon btn-light"
                        type="button"
                        style={{ height: "37px" }}
                        onClick={() => {
                            handleDecrement(product.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          fill="#999"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 13H5v-2h14v2z" />
                        </svg>
                      </button>
                      <input
                        className=" text-center"
                        style={{ width: "23%", height: "35px", backgroundColor: "white" }}
                        // placeholder={product.quantity}
                        value={product.quantity || 1}
                      />
                      <button
                        className="btn btn-icon btn-light"
                        type="button"
                        style={{ height: "37px" }}
                        onClick={() => {
                          handleIncrement(product.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          fill="#999"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="col">
                    <FaRupeeSign/>{product.offerprice*product.quantity}
                      <button className={styles.close} onClick={() => handleRemove(product.id)}>
                        <span className="close" style={{ color: "red" }}>
                          ✕
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4 summary" id={styles.shipping}>
              <Card style={{ paddingInline: "10px" }}>
                <div>
                  <h5>
                    <b>Summary</b>
                  </h5>
                </div>
                <hr />
                <div className="row">
                  <div className="col" style={{ paddingLeft: " 10" }}>
                    ITEMS {totalProductCount}
                  </div>
                  <div className="col text-right"><FaRupeeSign/>{subtotalPrice.toFixed(2)}</div>
                </div>
                <form>
                  <p>SHIPPING</p>
                  <select>
                    <option className="text-muted">Standard-Delivery- <FaRupeeSign/>5.00</option>
                  </select>
                  <p>COUPON CODE</p>
                  <input id="code" placeholder="Enter your code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)} />
                  <button type="button" onClick={handleApplyCoupon}>
                    Apply Coupon
                  </button>
                </form>
                <div
                  className="row"
                  style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
                >
                  <div className="col">SUB TOTAL PRICE</div>
                  <div className="col text-right"><FaRupeeSign/>{subtotalPrice.toFixed(2)}</div>
                </div>
                <div
                  className="row"
                  style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
                >
                  <div className="col">DISCOUNT PRICE</div>
                  <div className="col text-right"><FaRupeeSign/>{discountPrice.toFixed(2)}</div>
                </div>
                <div
                  className="row"
                  style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
                >
                  <div className="col">TOTAL PRICE</div>
                  <div className="col text-right"><FaRupeeSign/>{totalPrice.toFixed(2)}</div>
                </div>
                <button className="btn"><Link to ='/shipping'> CHECKOUT </Link></button>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Addtocart;
