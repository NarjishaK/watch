import React from 'react'
import styles from '../components/navbar.module.css'
import {AiOutlineGlobal} from 'react-icons/ai'
import {SlLocationPin} from 'react-icons/sl'
import {FiPhoneCall} from 'react-icons/fi'
import logo from '../images/logo_1.png'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function navbar() {
  const [category ,setCategory]=useState([]);
  console.log(category);
  useEffect(()=>{
    List();
  },[]);

  const List = async()=>{
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get('http://localhost:8000/category/listcategory')
      setCategory(response.data)
      //console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
    <div className='max-md:hidden'>
        <nav id='main-navbar' className={styles.nav} role='navigation'>
            <div id={styles.sec_nav} className=' cl-sm-4 cl-md-4 cl-lg-4 '>
            <div className={styles.sec1_nav}><AiOutlineGlobal className={styles.global}/><p className={styles.international}>INTERNATIONAL</p></div>
            <div className={styles.sec2_nav}><img src={logo} className={styles.logo}></img></div>
            <div className={styles.sec3_nav}><SlLocationPin className={styles.global}/><FiPhoneCall className={styles.global}/></div>
            </div>
            <div id={styles.third_nav}>
              
                <ul className={styles.nav_item}>
                    <li><a href='/' className={styles.nav_items}>HOME</a></li>
                    {category.map((categories)=>(
                    <li  key={categories._id}><a className={styles.nav_items}>{categories.category}</a></li>
                    ))}
                    {/* <li><a href='/womens',/mens className={styles.nav_items}>WOMENS</a></li>
                    <li><a href='/all' className={styles.nav_items}>WATCH</a></li> */}
                    <li><a href='#' className={styles.nav_items}>ABOUT</a></li>
                    <li><a href='#' className={styles.nav_items}>CONTACT</a></li>
                </ul>
               
            </div>
        </nav>
    </div>
    </>
  )
}

export default navbar