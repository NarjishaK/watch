
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftAvatar from 'components/SoftAvatar';
import SoftButton from 'components/SoftButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import Table from 'examples/Tables/Table';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../products/product.module.css";
import coupon1 from 'assets/images/coupon.jpg'


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function couponlist() {
    const [coupons, setCoupons] = useState([]);
    const [showProductDialog, setShowProductDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [image, setImage]= useState("");
    const [imagePreview, setImagePreview] = useState([])
    const navigate =useNavigate();
   
    useEffect(() => {
      fetchCoupon();
    }, []);
  
    const fetchCoupon = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
       axios.get('http://localhost:8000/coupon/listcoupon')
        .then((response) => {
          setCoupons(response.data);
  
        })
        .catch((err) => {
          console.log(err)
        });
    }
  
    const handleDelete = async (id) => {
      const confirmation = window.confirm('Are you sure you want to delete?');
      if (confirmation) {
        try {
          const response = await axios.delete(`http://localhost:8000/coupon/deletecoupon/${id}`);
          if (response.data.message === 'coupon deleted successfully') {
            console.log('coupon deleted successfully');
            fetchCoupon();
          } else {
            console.log('coupon deletion failed');
          }
        } catch (err) {
          console.log('Error deleting coupon:', err);
        }
      }
    };
  

    const handleCreate = () => {
      window.location.href = '/couponcreate';
    };
    
    const columns = [
      { name: 'image', align: 'left' },
      { name: 'CouponName', align: 'left' },
      { name: 'CouponCode', align: 'left' },
      { name: 'Discount', align: 'center' },
      { name: 'action', align: 'center' },
    ];
  
    const rows = coupons.map((coupon) => ({
      image: (
        <SoftBox>
         <SoftAvatar
            src={coupon1}
            size="xxl"
            variant="rounded"
          />
  
        </SoftBox>
      ),
  
      CouponName: coupon.couponname,
      CouponCode: coupon.couponcode,
      Discount:coupon.discount,
      action: (
        <SoftBox display="flex" justifyContent="center">
          <SoftButton
            color="info"
            size="small"
            component={Link}
            to={`/couponedit/${coupon._id}`}
            style={{ marginRight: '8px' }}
          >
            Edit
          </SoftButton>
  
          <SoftButton
            color="secondary"
            size="small"
            onClick={() => handleDelete(coupon._id)}
          >
            Delete
          </SoftButton>
        </SoftBox>
        
      ),
    }));
  return (
<DashboardLayout>
      <DashboardNavbar />
      <SoftBox
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        p={3}
      >
        <SoftButton variant="gradient" color="info" onClick={handleCreate}>
          Add Coupon
        </SoftButton>
      </SoftBox>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{ backgroundColor: '#74c3ed' }}
            >
              <SoftTypography variant="h6">Products</SoftTypography>
            </SoftBox>
          </Card>
          <br></br>
          <SoftBox
            sx={{
              '& .MuiTableRow-root:not(:last-child)': {
                '& td': {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={columns} rows={rows} />
          </SoftBox>
        </SoftBox>
      </SoftBox>
      
    </DashboardLayout>  )
}

export default couponlist