import React, { useEffect, useState } from "react";
import styles from "./mens.module.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import img1 from "./images/sec-home.webp";
import { BsFilter } from "react-icons/bs";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {BiSolidCartAdd} from 'react-icons/bi'
import {MdFavorite} from 'react-icons/md'
import {BsEye} from 'react-icons/bs'

function MenWatch() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:8000/product/listproduct")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDiscover = async (id) => {
    navigate(`/about-product/${id}`);
  };

  const handleMouseEnter = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleMouseLeave = () => {
    setShowProductDetails(false);
  };

  return (
    <>
      <Navbar />
      <img src={img1} className={styles.img} />
      <div className="container">
        <ul className={styles.lists}>
          <li>
            <a href="/homepage" className={styles.list}>
              HOME{" "}
            </a>
          </li>
          <li>
            <a href="#" className={styles.list}>
              MENS WATCHES
            </a>
          </li>
          <li>
            <a href="/allwatch" className={styles.list}>
              WATCHES
            </a>
          </li>
          <li>
            <a href="#" className={styles.list}>
              ALPINE EAGLE WATCHES
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.div1}>
        <p className={styles.cont1}>FROM EXPERTISE TO EMOTIONS</p>
        <h2 className={styles.cont2}>OUR MAINS DART</h2>
        <br />
      </div>
      <div className="container" id={styles.div2}>
        <p>
          Contemporary, refined, assertive, the sporty-chic Alpine Eagle luxury watch collection was
          inspired by the Alps and the imperious strength of the majestic eagle. Explore the full
          range of automatic watches for men available in stainless steel, titanium, ethical gold
          and two-tone combinations.
        </p>
        <p id={styles.div3}>
          <button className={styles.btn}>DISCOVER MORE ABOUT THE WOMENS COLLECTION</button>
          <br></br>
          <button className={styles.btn2}>
            FILTER PRODUCTS <BsFilter />
          </button>
        </p>
      </div>
      <div className="container">
        <Row>
          {products.map((product) => (
            <Col
              lg={3}
              mg={3}
              xs={12}
              key={product._id}
              onMouseEnter={() => handleMouseEnter(product)}
              onMouseLeave={handleMouseLeave}
            >
              <card>
                <Card.Body>
                  <Card.Img
                    src={`http://localhost:8000/upload/${product.image[0]}`}
                    alt={`Slide ${product.productname}`}
                    // onClick={() => handleDiscover(product._id)}
                  />
                  <Card.Title className={styles.titles}></Card.Title>
                </Card.Body>
              </card>
              {showProductDetails && selectedProduct === product && (
                <div className={styles.product_card}>
                  <button className={styles.price_btn}><p className={styles.narjiii}>Rs.{product.price}</p>
                  {/* <p id={styles.div3}>
                      <button className={styles.contents} onClick={()=>handleDiscover(product._id)}>Discover</button>
                    </p> */}
                    <p id={styles.div3}>
                      <button className={styles.whishlist} ><button className={styles.fav}><MdFavorite className={styles.global1}/></button><button className={styles.fav}><BiSolidCartAdd  className={styles.global2}/></button><button className={styles.fav}><BsEye className={styles.global3} onClick={()=>handleDiscover(product._id)}/></button></button>
                    </p>
                  </button>
                </div>
              )}
              <br />
            </Col>
          ))}
        </Row>
      </div>
      <p id={styles.div3}>
        <button className={styles.btn3}>SHOW MORE PRODUCTS</button>
      </p>
      <Footer />
    </>
  );
}

export default MenWatch;
