
import React, { useState } from 'react'
import styles from './whishlist.module.css'
import Footer from './components/footer'
import { Card, Col, Row } from 'react-bootstrap';
import SoftButton from 'components/SoftButton';
import { BiSolidCartAdd } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import Navbar from './components/navbar'
import { useNavigate } from 'react-router-dom';

function whishlist() {
  const [savedProduct,setSavedProducts]=useState();
  const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
  
  const navigate =useNavigate();

  const handleDiscover = async (id) => {
    navigate(`/about-product/${id}`);
  };

//remove product
  const handleRemove = (productId) => {
    const updatedProducts = savedProducts.filter(product => product.id !== productId);
    setSavedProducts(updatedProducts);
    localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
  };
  //clearwishlist
  const clearWishlist =()=>{
     setSavedProducts ([]);
     localStorage.removeItem ('savedProducts')
  }
  //addcart
  const handleAddcart = (product) => {
    const savedCartProduct = {
      id: product.id,
      productname: product.productname,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    };
  
    const existingAddcart = JSON.parse(localStorage.getItem("savedCartProduct")) || [];
    const isProductAlreadyAdded = existingAddcart.some(
      (item) => item.id === savedCartProduct.id
    );
  
    if (!isProductAlreadyAdded) {
      const updatedAddcartProducts = [...existingAddcart, savedCartProduct];
      localStorage.setItem("savedCartProduct", JSON.stringify(updatedAddcartProducts));
    }
  };
  
  return (
    <>
    <Navbar/>
    <div className="container padding-bottom-3x mb-2">
      <div className="row">
        <div className={styles.wishlist}>
          <div className="padding-top-2x mt-2 hidden-lg-up" />
          {/* Wishlist Table*/}
          <div className="table-responsive wishlist-table margin-bottom-none">
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th className="text-center">
                    <a className="btn btn-sm btn-outline-danger" href="#" onClick={clearWishlist}>
                      Clear Wishlist
                    </a>
                  </th>
                </tr>
              </thead>
            </table>

            <Row>
              {savedProducts.map((product) => (
                <Col lg={3} mg={3} xs={12} key={product.id}>
                  <Card>
                    <SoftButton onMouseEnter={(e) => (e.target.style.color = "green")}  onClick={() => handleAddcart(product)}>ADD TO CART</SoftButton>
                    <Card.Body  onClick={() => handleDiscover(product.id)} className={styles.cards}>
                      <Card.Img src={product.image}  />
                      <Card.Title className={styles.titles}>Rs.{product.price}</Card.Title>
                      <p style={{color:'green'}} className={styles.titles}>In stock</p>
                    </Card.Body>
                    <SoftButton
                      style={{ color: "brown", }}
                      id={styles.clear}
                      onMouseEnter={(e) => (e.target.style.color = "white")}
                      onMouseLeave={(e) => (e.target.style.color = "brown")}
                      onClick={() => handleRemove(product.id)}
                    >
                      REMOVE
                    </SoftButton>
                  </Card>
                  <br />
                </Col>
              ))}
            </Row>
          </div>
          <hr className="mb-4" />
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}

export default whishlist