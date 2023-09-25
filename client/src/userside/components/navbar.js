import React from 'react'
import styles from '../components/navbar.module.css'
import {IoMdContact} from 'react-icons/io'
import {BiSolidCartAdd} from 'react-icons/bi'
import {MdFavorite} from 'react-icons/md'
import logo from '../images/logo_1.png'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function navbar() {
  const [category ,setCategory]=useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState('');

  
  useEffect(()=>{
    List();
    // User();

    const getData = JSON.parse(localStorage.getItem('userpage')) || []
    console.log(getData.username)
    setUsers(getData.username)
  },[]);

  const List = async()=>{
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get('http://localhost:8000/category/listcategory')
      setCategory(response.data)
    }catch(err){
      console.log(err)
    }
  }
  const handleFavorite = () => {
    navigate('/whishlist');
  };
  const handleCart =()=>{
    navigate ('/addtocart')
  }
  const handleProfile=()=>{
    navigate('/profile-user')
  }

  return (
    <>
    <div className='max-md:hidden'>
        <nav id='main-navbar' className={styles.nav} role='navigation'>
            <div id={styles.sec_nav} className=' cl-sm-4 cl-md-4 cl-lg-4 '>
             
              
            <div className={styles.sec1_nav}><IoMdContact className={styles.global} onClick={handleProfile}/><p className={styles.international}>{users}</p></div>

            
            <div className={styles.sec2_nav}><img src={logo} className={styles.logo}></img></div>
            <div className={styles.sec3_nav}> <MdFavorite className={styles.global} onClick={handleFavorite} /><BiSolidCartAdd className={styles.global1} onClick={handleCart}/></div>
            </div>
            <div id={styles.third_nav}>
              
                <ul className={styles.nav_item}>
                    <li><a href='/homepage' className={styles.nav_items}>HOME</a></li>
                    {category.map((categories) => (
                      <li key={categories._id}  className={styles.nav_items}>
                        <Link to={`/allproduct/${categories._id}`} className={styles.nav_items}>
                          {categories.category}
                        </Link>
                      </li>
                    ))}
                    <li><a href='/allwatch' className={styles.nav_items}>WATCHES</a></li>
                    <li><a href='/about-products'className={styles.nav_items}>CONTACT</a></li>
                </ul>
               
            </div>
        </nav>
    </div>
    
    </>
  )
}

export default navbar