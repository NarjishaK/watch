import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { AiFillStar } from "react-icons/ai";
import styles from "./home.module.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardGroup, Col, Modal, Nav, Row, Tab } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

function SingleProduct() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("tabs-1");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [tabCount, setTabCount] = useState("");
  const [similarproducts, setSimilarProducts] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

  //quantity of product
  const initialQuantity = localStorage.getItem("quantity") || 14;
  const [quantity, setQuantity] = useState(Number(initialQuantity));

  useEffect(() => {
    localStorage.setItem("quantity", quantity.toString());
  }, [quantity]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`http://localhost:8000/product/productdetails/${id}`);
        const products = response.data;
        setProducts(products);
        setImage(products.image);
        setSelectedProductCategory(products.category);
        const image = products.image;
        if (image && Array.isArray(image) && image.length > 0) {
          const previewImages = image.map((imageName) => {
            return `http://localhost:8000/upload/${imageName}`;
          });
          setImagePreview(previewImages);
          console.log(previewImages);
          setTabCount(previewImages.length);
        } else {
          setImagePreview([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  //list all product//

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:8000/product/listproduct")
      .then((response) => {
        setSimilarProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const relatedProducts = similarproducts.filter(
    (similar) => similar.category === selectedProductCategory
  );
  const relatedProductsToDisplay = relatedProducts.slice(0, 4);
//

  const handleSaveProduct = () => {
    const savedProduct = {
      id: products._id,
      productname: products.productname,
      price: products.price,
      description: products.description,
      image:`http://localhost:8000/upload/${products.image[0]}`,
      category:products.category,
    };
  
  
    const existingSavedProducts = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const isProductAlreadySaved = existingSavedProducts.some((product) => product.id === savedProduct.id);
  
    if (!isProductAlreadySaved) {
      const updatedSavedProducts = [...existingSavedProducts, savedProduct];
        localStorage.setItem("savedProducts", JSON.stringify(updatedSavedProducts));
    }
  };
  
//handleAddcart
const handleAddcart = () => {
  const savedCartProduct = {
    id: products._id,
    productname: products.productname,
    price: products.price,
    description: products.description,
    image:`http://localhost:8000/upload/${products.image[0]}`,
    category:products.category,
  };

  const existingAddcart = JSON.parse(localStorage.getItem("savedCartProduct")) || [];
  const isProductAlreadyAdded= existingAddcart.some(
    (product) => product.id === savedCartProduct.id
  );

  if (!isProductAlreadyAdded) {
    const updatedAddcartProducts = [...existingAddcart, savedCartProduct];
    localStorage.setItem("savedCartProduct", JSON.stringify(updatedAddcartProducts));
  }
};




const handleDiscover = (productId) => {
  const product = relatedProductsToDisplay.find((item) => item._id === productId);
  setSelectedProduct(product);
  setShowPopup(true);
};

const handleShowMore = async (id) => {
  navigate(`/about-product/${id}`);
  setSelectedProduct(null);
  setShowPopup(false);
};

const handleClosePopup = () => {
  setSelectedProduct(null);
  setShowPopup(false);
};
  return (
    <>
      <div className="home-section">
        <Navbar />
        <Tab.Container activeKey={activeTab}>
          <Row className={styles.row} style={{ marginTop: "30px", marginBottom: "30px" }}>
            <Col className="col-lg-4 col-md-5">
              <PerfectScrollbar className={styles.scrollablecontainer}>
                <Nav
                  className={`${styles.navtabs}`}
                  style={{ width: "20px", height: "300px" }}
                  role="tablist"
                >
                  {[...Array(tabCount)].map((_, index) => (
                    <Nav.Item key={index} className={styles.navitem}>
                      <Nav.Link
                        className={styles.navlink}
                        eventKey={`tabs-${index + 1}`}
                        onClick={() => handleTabClick(`tabs-${index + 1}`)}
                      >
                        <div
                          style={{
                            width: "200px",
                            marginLeft: "80%",
                          }}
                        >
                          <img src={`${imagePreview[index]}`} alt="" />
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </PerfectScrollbar>
            </Col>
            <Col className="col-lg-8 col-md-9">
              <Tab.Content style={{ height: "400px", width: "400px", marginLeft: "10%" }}>
                {[...Array(tabCount)].map((_, index) => (
                  <Tab.Pane key={index} eventKey={`tabs-${index + 1}`}>
                    <div className={styles.product__details__pic__item}>
                      <img src={`${imagePreview[index]}`} alt="" />
                    </div>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <hr />

        <section className="padding-y">
          <div className="container" id={styles.detailsbox}>
            <div className="row">
              <main className="col-lg-6">
                <article className="ps-lg-3">
                  <h4 className="title text-dark">
                    {" "}
                    <br /> {products.productname}{" "}
                  </h4>
                  <div className="rating-wrap my-3">
                    <AiFillStar className="stars-active" />
                    <AiFillStar className="stars-active" />
                    <AiFillStar className="stars-active" />
                    <AiFillStar className="stars-active" />
                    <b className="label-rating text-warning"> 4.5</b>
                  </div>
                  <div className="mb-3">
                    <p className="price h5">Rs.{products.price}</p>
                  </div>
                  <br />
                  <p className={styles.about}>{products.description}</p>
                  <hr />
                  <br />
                  <div className="row mb-4">
                    <div className="col-md-4 col-6 mb-2 ">
                      <label className="form-label">Category</label>
                      <select className="form-select">
                        <option>{products.category}</option>
                      </select>
                    </div>

                    <div className="col-md-4 col-6 mb-3">
                      <label className="form-label d-block">Quantity</label>
                      <div className="input-group input-spinner">
                        <button
                          className="btn btn-icon btn-light"
                          type="button"
                          onClick={() => setQuantity(quantity - 1)} // Decrease quantity
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
                          className="form-control text-center"
                          placeholder=""
                          value={quantity}
                          readOnly // Make the input read-only
                        />
                        <button
                          className="btn btn-icon btn-light"
                          type="button"
                          onClick={() => setQuantity(quantity + 1)} // Increase quantity
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
                    </div>
                  </div>
                  <a href="#" className="btn  btn-warning" style={{ marginRight: "10px" }}>
                    {" "}
                    Buy now{" "}
                  </a>
                  <a href="#" className="btn  btn-primary" style={{ marginRight: "10px" }} onClick={ handleAddcart}>
                    {" "}
                    <i className="me-1 fa fa-shopping-basket" /> Add to cart{" "}
                  </a>
                  <a href="#" className="btn  btn-light" onClick={handleSaveProduct}>
                    {" "}
                    <i className="me-1 fa fa-heart" /> Save{" "}
                  </a>
                  <br />
                  <br />
                </article>
              </main>
            </div>
          </div>
          <br />
        </section>

        <section className="padding-y bg-light border-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="card">
                  <div className="tab-content"></div>
                </div>
              </div>
              <div className={styles.div2}>
                <h2 className={styles.cont6}>Similar items</h2>
              </div>
              <div className="container">
                <Row className="d-flex">
                  {relatedProductsToDisplay.map((item, index) => (
                    <Col key={index}>
                      <Card>
                        <Card.Body>
                          <Card.Img
                            src={`http://localhost:8000/upload/${item.image[0]}`}
                          ></Card.Img>
                          <Card.Title className={styles.similar}>
                            {/* {item.productname}
                            <br />
                            <br />
                            <strong className="price" style={{ placeItems: "center" }}>
                              {" "}
                              ${item.price}
                            </strong> */}
                            <p id={styles.div3}>
                              <button
                                className={styles.content}
                                onClick={() => handleDiscover(item._id)}
                              >
                                VIEW
                              </button>
                            </p>
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            <br />
            <br />
          </div>
        </section>
        {/* // */}
        <Modal show={showPopup} onHide={handleClosePopup}>
  <Modal.Header closeButton>
    <Modal.Title>Product Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedProduct && (
      <>
        <h4>{selectedProduct.productname}</h4>
        <p>Price: Rs.{selectedProduct.price}</p>
        <p>Description: {selectedProduct.description}</p>
        <p>Category:{selectedProduct.category}</p>
        <p>Brand:{selectedProduct.brand}</p>
       <img src={`http://localhost:8000/upload/${selectedProduct.image[0]}`} className={styles.popup_details}></img>
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => handleShowMore(selectedProduct._id)}>
      Show More
    </Button>
    <Button variant="secondary" onClick={handleClosePopup}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
        <Footer />
      </div>
    </>
  );
}
export default SingleProduct;
