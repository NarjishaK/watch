import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import Navbar from "./components/navbar";
import { useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";
import { Card } from "react-bootstrap";
import Footer from "./components/footer";
function Addtocart() {
  const [savedCartProducts, setsavedCartProducts] = useState([]);
  const savedCartProduct = JSON.parse(localStorage.getItem("savedCartProduct")) || [];
  const navigate = useNavigate();

  //product quantity
  const initialQuantities = JSON.parse(localStorage.getItem("quantities")) || {};

  savedCartProduct.forEach((product) => {
    if (initialQuantities[product.id] === undefined) {
      initialQuantities[product.id] = 1;
    }
  });
  const [quantities, setQuantities] = useState(initialQuantities);

  const updateQuantity = (productId, newQuantity) => {
    const updatedQuantities = { ...quantities, [productId]: newQuantity };
    setQuantities(updatedQuantities);
  };

  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  // Remove a specific product from the cart
  const handleRemove = (productId) => {
    const updatedProducts = savedCartProduct.filter((product) => product.id !== productId);
    localStorage.setItem("savedCartProduct", JSON.stringify(updatedProducts));
  };

  //clear all product
  // const handleRemove = (productId) => {
  //   const updatedProducts = savedCartProducts.filter(product => product.id !== productId);
  //   localStorage.setItem('savedCartProduct', JSON.stringify(updatedProducts));
  //   setsavedCartProducts(updatedProducts); // Update the state
  // };
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
                      <button
                        className="btn btn-icon btn-light"
                        type="button"
                        style={{ height: "37px" }}
                        onClick={() => {
                          if (quantities[product.id] > 1) {
                            updateQuantity(product.id, quantities[product.id] - 1);
                          }
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
                        placeholder=""
                        value={quantities[product.id]}
                        readOnly
                      />
                      <button
                        className="btn btn-icon btn-light"
                        type="button"
                        style={{ height: "37px" }}
                        onClick={() => {
                          updateQuantity(product.id, quantities[product.id] + 1);
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
                      Rs.{product.price}
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
