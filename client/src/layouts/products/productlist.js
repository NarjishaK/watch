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
import styles from "./product.module.css";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Products() {
  const [products, setProducts] = useState([]);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [image, setImage]= useState("");
  const [imagePreview, setImagePreview] = useState([])
  const navigate =useNavigate();
 
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
     axios.get('http://localhost:8000/product/listproduct')
      .then((response) => {
        setProducts(response.data);

      })
      .catch((err) => {
        console.log(err)
      });

  }

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete?');
    if (confirmation) {
      try {
        const response = await axios.delete(`http://localhost:8000/product/deleteProduct/${id}`);
        if (response.data.message === 'Product deleted successfully') {
          console.log('Product deleted successfully');
          fetchProducts();
        } else {
          console.log('Product deletion failed');
        }
      } catch (err) {
        console.log('Error deleting product:', err);
      }
    }
  };

  const handleShow = (product) => {
    setSelectedProduct(product);
    const image = product.image;
    if (image) {
      setImage([image]);

      const previewImages = [];
      for (let i = 0; i < image.length; i++) {
        const imageURL = `http://localhost:8000/upload/${image[i]}`;
        previewImages.push(imageURL);
      }
      setImagePreview(previewImages);
      // setImage([image]);
      // setImagePreview([`http://localhost:8000/uploads/${image}`]);
    } else {
      setImage([]);
      setImagePreview([]);
      }
    setShowProductDialog(true);
  };

  const handleCreate = () => {
    window.location.href = '/productcreate';
  };

  const handleCloseDialog = () => {
    setShowProductDialog(false);
  };
  const columns = [
    { name: 'productName', align: 'left' },
    { name: 'image', align: 'left' },
    { name: 'price', align: 'left' },
    { name: 'description', align: 'left' },
    { name: 'action', align: 'center' },
  ];

  const rows = products.map((product) => ({
    productName: product.productname,
    image: (
      <SoftBox>
       <SoftAvatar
          src={`http://localhost:8000/upload/${product.image[0]}`}
          alt={product.productname}
          size="xxl"
          variant="rounded"
        />

      </SoftBox>
    ),

    price: product.price,
    description: product.description,
    action: (
      <SoftBox display="flex" justifyContent="center">
        <SoftButton
          color="secondary"
          size="small"
          style={{ marginRight: '8px' }}
          onClick={() => handleShow(product)}
        >
          Show
        </SoftButton>
        <SoftButton
          color="info"
          size="small"
          component={Link}
          to={`/productedit/${product._id}`}
          style={{ marginRight: '8px' }}
        >
          Edit
        </SoftButton>

        <SoftButton
          color="secondary"
          size="small"
          onClick={() => handleDelete(product._id)}
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
          Add Product
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
      <Dialog
        open={showProductDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>PRODUCT DETAILS</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <DialogContentText>
                <strong className={styles.show}>Product Name:</strong> {selectedProduct.productname}
              </DialogContentText>
              <DialogContentText>
                <strong className={styles.show}>Price:</strong> {selectedProduct.price}
              </DialogContentText>
              <DialogContentText>
                <strong className={styles.show}>Description:</strong> {selectedProduct.description}
              </DialogContentText>
              <DialogContentText>
                <strong className={styles.show}>Category:</strong> {selectedProduct.category}
              </DialogContentText>
              <DialogContentText>
                <strong className={styles.show}>Brand:</strong> {selectedProduct.brand }
              </DialogContentText>
              <DialogContentText>
                <strong className={styles.show}>Image:</strong><br/>
                {/* <img src= {`http://localhost:8000/upload/${selectedProduct.imagePreview}`} className={styles.imagePreview}></img> */}
                {imagePreview.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt="Image Preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ))}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <SoftButton onClick={handleCloseDialog} color="secondary">
            Close
          </SoftButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Products;