
import React from 'react'
import styles from './whishlist.module.css'
import Footer from './components/footer'
function whishlist() {
  const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
  return (
<div className="container padding-bottom-3x mb-2">
  <div className="row">
   {/* <aside className="user-info-wrapper">
        <div className="user-cover" style={{backgroundImage: 'url(https://bootdey.com/img/Content/bg1.jpg)'}}>
          <div className="info-label" data-toggle="tooltip" title data-original-title="You currently have 290 Reward Points to spend"><i className="icon-medal" />290 points</div>
        </div>
        <div className="user-info">
          <div className="user-avatar">
            <a className="edit-avatar" href="#" /><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="User" /></div>
          <div className="user-data">
            <h4>Daniel Adams</h4><span>Joined February 06, 2017</span>
          </div>
        </div>
      </aside>  */}
      <nav className={styles.list}>
        <a className="list-group-item with-badge" href="#" id={styles.itemss}>Orders<span className="badge badge-primary badge-pill">6</span></a>
        <a className="list-group-item" href="#" id={styles.itemss}>Profile</a>
        <a className="list-group-item" href="#" id={styles.itemss}>Addresses</a>
        <a className="list-group-item with-badge active" href="#" id={styles.itemss}>Wishlist<span className="badge badge-primary badge-pill">3</span></a>
        <a className="list-group-item with-badge" href="#" id={styles.itemss}>My Tickets<span className="badge badge-primary badge-pill">4</span></a>
      </nav>
    <div className={styles.wishlist}>
      <div className="padding-top-2x mt-2 hidden-lg-up" />
      {/* Wishlist Table*/}
      <div className="table-responsive wishlist-table margin-bottom-none">
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th className="text-center"><a className="btn btn-sm btn-outline-danger" href="#">Clear Wishlist</a></th>
            </tr>
          </thead>
          <tbody>
            {savedProducts.map((product)=>(
            <tr key={product.id}>
              <td>
                <div className="product-item">
                  <a className="product-thumb" href="#"><img src={product.image}  alt="Product"  className={styles.wishlistimage}/></a>
                  <div className="product-info"style={{width: '50%'}}>
                    <h4 className="product-title"><a href="#">{product.description}</a></h4>
                    <div className="text-lg text-medium text-muted">Rs.{product.price}</div>
                    <div>Availability:
                      <div className="d-inline text-success">In Stock</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center"><a className="remove-from-cart" href="#" data-toggle="tooltip" title data-original-title="Remove item"><i className="icon-cross" /></a></td>
            </tr>
            ))}
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="mb-4" />
      <div className="custom-control custom-checkbox">
        <input className="custom-control-input" type="checkbox" id="inform_me" defaultChecked />
        <label className="custom-control-label" htmlFor="inform_me">Inform me when item from my wishlist is available</label>
      </div>
    </div>
  </div>
  <Footer/>
</div>
  )
}

export default whishlist