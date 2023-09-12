import React from "react";
import styles from "./footer.module.css";
import { Card, CardGroup } from "react-bootstrap";
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";

function Footer() {
  return (
    <>
      <div className="container">
        <CardGroup>
          <Card className={styles.cards}>
            <Card.Body>
              <Card.Title>
                <h5 id={styles.content}>CONTACT US</h5>
              </Card.Title>
              <Card.Text>
                <p>Phone or Message</p>
              </Card.Text>
              <Card.Text>
                <p>Find a Botique</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className={styles.cards}>
            <Card.Body>
              <Card.Title>
                <h5 id={styles.content}>INFORMATION</h5>
              </Card.Title>
              <Card.Text>
                <p>FAQ</p>
              </Card.Text>
              <Card.Text>
                <p>Servicing and Warranty</p>
              </Card.Text>
              <Card.Text>
                <p>Avoid Counterfeits</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className={styles.cards}>
            <Card.Body>
              <Card.Title>
                <h5 id={styles.content}>NEWS</h5>
              </Card.Title>
              <Card.Text>
                <p>News letter</p>
              </Card.Text>
              <Card.Text>
                <p>Our magazine</p>
              </Card.Text>
              <Card.Text>
                <p>Catalogs</p>
              </Card.Text>
              <Card.Text>
                <p>Press</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className={styles.cards}>
            <Card.Body>
              <Card.Title>
                <h5 id={styles.content}>LA MAISON</h5>
              </Card.Title>
              <Card.Text>
                <p>Corporate Information</p>
              </Card.Text>
              <Card.Text>
                <p>Our office</p>
              </Card.Text>
              <Card.Text>
                <p>Careers</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <div className={styles.div2}>
          <BsFacebook className={styles.icon} />
          <BsInstagram className={styles.icon} />
          <BsLinkedin className={styles.icon} />
          <BsYoutube className={styles.icon} />
        </div>
        </div>

        <div className={styles.div3}>
            <ul className={styles.lists}>
                <li className={styles.list}><p>Privacy Policy</p></li>
                <li className={styles.list}><p>Cookies Policy</p></li>
                <li className={styles.list}><p>Terms Of Website Use</p></li>
                <li className={styles.list}><p>U.K Modern Slavery Act</p></li>
            </ul>
        </div>
    </>
  );
}

export default Footer;
