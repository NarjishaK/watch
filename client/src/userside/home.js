import Carousel from "react-bootstrap/Carousel";
import img1 from "./images/frst-home.webp";
import img2 from "./images/sec-home.webp";
import img3 from "./images/third-home.jpeg";
import img4 from "./images/watch 1.webp";
import styles from "./home.module.css";
import img5 from "./images/watch2.webp";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/owl.carousel";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import axios from "axios";


const responsive = {
  0: {
    items: 1,
  },
  768: {
    items: 3,
  },
};

function Home() {

  const [banner,setBanner]= useState([]);
  const [products,setProducts]= useState([]);
  const [product_show,setShowProducts]= useState(0);
  //banner images
  useEffect(()=>{
    fetchBanner();
    fetchProducts();
  },[]);

  const fetchBanner =async()=>{
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    await axios.get('http://localhost:8000/banner/bannerlist')
    .then((response)=>{
      setBanner(response.data);
    })
    .catch((err)=>{
      console.log(err)
    });
  }

  //owlcorousel image

  const fetchProducts = async () => { 
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    await axios.get('http://localhost:8000/product/listproduct')
      .then((response) => {
        setProducts(response.data);
        setShowProducts(1);
        //  console.log(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }


  // service  //
  const [serviceImages, setServiceImages] = useState([]);

  useEffect(() => {
    //servicesData();
  }, []);

  const servicesData = async () => {
    try {
      const response = await fetch("http://localhost:7000/service");
      const datas = await response.json();
      setServiceImages(datas);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar/>
      <Carousel>
        {banner.map((banners)=>(
        <Carousel.Item interval={1000} key={banners._id}>
          <img className="d-block w-100" src={`http://localhost:8000/upload/${banners.image}`} alt="First slide" />
          <Carousel.Caption>
            <h2>{banners.title}</h2>
            <p className={styles.content}>{banners.subtitle1}</p>
          </Carousel.Caption>
        </Carousel.Item>
        ))}
      </Carousel>

      {/* Second part */}
      <div className={styles.div1}>
        <p className={styles.cont1}>CHOPARD</p>
        <h2 className={styles.cont2}>THE ARTISAN OF EMOTIONS, SINCE 1860</h2>
        <br />
      </div>
      <div className="container">
        <Row className="col-sm-12 col-md-12 col-lg-12">
          <Col>
            <div>
              <img src={img4} alt="Watch 1" />
            </div>
          </Col>
          <Col>
            <div className="container">
              <p className={styles.cont3}>MILLE MIGLIA CLASSIC CHRONOGRAPH</p>
              <h2 className={styles.cont4}>POWER-PACKED AESTHETICS</h2>
              <p className={styles.cont5}>
                Chopards Mille Miglia collection welcomes a new design with the
                Mille Miglia Classic Chronograph model. Featuring a 40.5 mm
                case, bezels, crowns and pushers made from Chopards exclusive
                Lucent Steel™, an ultra-legible dial in a selection of colours
                inspired by automotive bodywork, and a glass box crystal for a
                magnificently retro appeal, the new Mille Miglia Classic
                Chronograph luxury watch looks just as elegant for evening wear
                as it does with a race suit.
              </p>
              <div className={styles.butn}>
                <button className={styles.btn}>Discover the watches</button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* PRODUCTS */}
      <div className={styles.div1}>
        <p className={styles.cont1}>OUR SELECTION</p>
        <p className={styles.cont1}>hellooo</p>
        <h2 className={styles.cont2}>MILLE MIGLIA WATCHES</h2>
        <br />
      </div>
      <div className="container">
      {product_show &&(
        <OwlCarousel responsive={responsive} loop nav navClass={['custom-prev', 'custom-next']}>
          {products.map((product) => (
            <div key={product._id}> 
              <card>
                <Card.Img
                  className={styles.i}
                  src={`http://localhost:8000/upload/${product.image[0]}`}
                  alt={`Slide ${product.productname}`}
                />
              </card>
            </div>
          ))}
        </OwlCarousel>
        )}
      </div>
      {/* thirdpart */}
      <div className={styles.div1}>
        <p className={styles.cont1}>FROM EXPERTISE TO EMOTIONS</p>
        <h2 className={styles.cont2}>OUR MAINS DART</h2>
        <br />
      </div>
      <div >
        <img className={styles.watch} src={img5} />
      </div>
      {/* fourth part */}
      <div className={styles.div2}>
        <h2 className={styles.cont6}>SERVICES</h2>
        <br />
      </div>
      <div className="container">
        <Row>
          {serviceImages.map((service) => (
            <Col md={4} key={service._id}>
              <card>
                <Card.Body>
                  <Card.Img
                    src={`http://localhost:7000/${service.images}`}
                  ></Card.Img>
                  <Card.Title className={styles.c}>{service.title}</Card.Title>
                </Card.Body>
              </card>
            </Col>
          ))}
        </Row>
      </div>
      <hr/>
      <Footer/>
    </>
  );
}

export default Home;
