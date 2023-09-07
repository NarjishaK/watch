import React, { useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import styles from "./admin.module.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

function adminadd() {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    List();
  }, []);
  const List = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:8000/admin/adminlist");
      setAdmins(response.data);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this admin user?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8000/admin/admindelete/${id}`);
        List();
        window.alert('Deleted ac succesfully')
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <p className={styles.title}>Admin-Users</p> */}
      <hr />
      <div className="container">
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th>Role</th>
              <th>User Name</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((add) => (
              <tr key={add._id}>
                <td className={styles.name}>
                  <img src={`http://localhost:8000/upload/${add.image}`} className={styles.img1} />
                  <br />
                  {add.roll}
                </td>
                <td className={styles.phone}>{add.name}</td>
                <td className={styles.email}>
                  {add.email}
                  <br />
                  {add.phone}
                </td>
                <td className={styles.name}>{add.location}</td>
                <td>
                  <button className={styles.edit}>
                    <Link to={`/admin/edit/${add._id}`} className={styles.edit1}>
                      Edit
                    </Link>
                  </button>
                </td>
                <td>
                  <button className={styles.delete} onClick={() => handleDelete(add._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <SoftBox display="flex" justifyContent="flex-end" alignItems="center" p={3}>
          <SoftButton variant="gradient">
            <a href="/admin/create" className={styles.creates}>
              Create
            </a>
          </SoftButton>
        </SoftBox>
      </div>
    </DashboardLayout>
  );
}

export default adminadd;
