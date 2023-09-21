import React, { useEffect, useState } from "react";
import styles from "./mens.module.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import img1 from "./images/watch3.webp";
import { BsFilter } from "react-icons/bs";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { BiSolidCartAdd } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { BsEye } from "react-icons/bs";

function MenWatch() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`http://localhost:8000/product/detailcategory/${id}`);
        const products = response.data;
        setProducts(products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

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

  //whishlist

  const handleSaveProduct = (products) => {
    const savedProduct = {
      id: products._id,
      productname: products.productname,
      price: products.price,
      description: products.description,
      image:`http://localhost:8000/upload/${products.image[0]}`,
      category:products.category,
    };

    const existingSavedProducts = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const isProductAlreadySaved = existingSavedProducts.some(
      (product) => product.id === savedProduct.id
    );

    if (!isProductAlreadySaved) {
      const updatedSavedProducts = [...existingSavedProducts, savedProduct];
      localStorage.setItem("savedProducts", JSON.stringify(updatedSavedProducts));
    }
  };

  return (
    <>
      <Navbar />
      {/* {banner.map((banners)=>( */}
      <img src={img1} className={styles.img} />
      {/* ))} */}
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
                    alt={`Slide ${product.id}`}
                  />
                  <Card.Title className={styles.titles}>
                    <p id={styles.div3}>
                      <strong>
                        <FaRupeeSign />.{product.price}
                      </strong>
                    </p>
                  </Card.Title>
                </Card.Body>
              </card>
              {showProductDetails && selectedProduct === product && (
                <div className={styles.product_card}>
                  <button className={styles.price_btn}>
                    <p id={styles.div3}>
                      <button className={styles.whishlist}>
                        <button className={styles.fav}>
                          <MdFavorite className={styles.global1}
                           onClick={() => handleSaveProduct(product)} />
                        </button>
                        <button className={styles.fav}>
                          <BiSolidCartAdd className={styles.global2} />
                        </button>
                        <button className={styles.fav}>
                          <BsEye
                            className={styles.global3}
                            onClick={() => handleDiscover(product._id)}
                          />
                        </button>
                      </button>
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
      {/* <div className={styles.div1}>
        <h1 className={styles.cont2}>CHOPARD ON INSTAGRAM</h1>
        <br />
      </div>
      <div className="container" id={styles.div2}>
        <p>
          Discover the Maisons finest creations through our audiences lens and
          become part of our social world by adding #MyChopard to your Instagram
          posts.
        </p>
        <p id={styles.div3}>
          <button className={styles.btn4}>FOLLOW US</button>
        </p>
      </div> */}

      <Footer />
    </>
  );
}

export default MenWatch;
