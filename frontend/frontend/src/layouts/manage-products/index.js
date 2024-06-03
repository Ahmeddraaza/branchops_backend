/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function ManageProducts() {
  const [prod_id, setProdId] = useState("");
  const [Product_name, setProductName] = useState("");
  const [product_brand, setProductBrand] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchProdId, setSearchProdId] = useState("");
  const [action, setAction] = useState("all"); // "all" or "single"

  const handleAddProduct = async () => {
    const response = await fetch('http://localhost:3001/products/addproducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prod_id, Product_name, product_brand, quantity, price }),
    });
    const data = await response.json();
    if (response.status === 200) {
      alert("Product added successfully!");
      fetchProducts();
    } else {
      alert(`Error: ${data.msg}`);
    }
  };

  const handleDeleteProduct = async (prod_id) => {
    const response = await fetch(`http://localhost:3001/products/products/${prod_id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (response.status === 200) {
      alert("Product deleted successfully!");
      fetchProducts();
    } else {
      alert(`Error: ${data.msg}`);
    }
  };

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3001/products/findproducts');
    const data = await response.json();
    setProducts(data.data);
  };

  const fetchProductById = async () => {
    const response = await fetch(`http://localhost:3001/products/findproduct/${searchProdId}`);
    const data = await response.json();
    if (response.status === 200) {
      setProducts([data.data]);
    } else {
      alert(`Error: ${data.msg}`);
    }
  };

  useEffect(() => {
    if (action === "all") {
      fetchProducts();
    }
  }, [action]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h5">Manage Products</MDTypography>
                <MDBox mt={3}>
                  <MDInput
                    label="Product ID"
                    fullWidth
                    value={prod_id}
                    onChange={(e) => setProdId(e.target.value)}
                  />
                </MDBox>
                <MDBox mt={3}>
                  <MDInput
                    label="Product Name"
                    fullWidth
                    value={Product_name}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </MDBox>
                <MDBox mt={3}>
                  <MDInput
                    label="Product Brand"
                    fullWidth
                    value={product_brand}
                    onChange={(e) => setProductBrand(e.target.value)}
                  />
                </MDBox>
                <MDBox mt={3}>
                  <MDInput
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </MDBox>
                <MDBox mt={3}>
                  <MDInput
                    label="Price"
                    type="number"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                </MDBox>
                <MDBox mt={3}>
                  <MDButton variant="gradient" color="info" fullWidth onClick={handleAddProduct}>
                    Add Product
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h5">Search Products</MDTypography>
                <MDBox mt={3}>
                  <MDBox mb={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <MDButton variant="gradient" color={action === "all" ? "info" : "light"} fullWidth onClick={() => setAction("all")}>
                          Retrieve All Products
                        </MDButton>
                      </Grid>
                      <Grid item xs={6}>
                        <MDButton variant="gradient" color={action === "single" ? "info" : "light"} fullWidth onClick={() => setAction("single")}>
                          Find Product by ID
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>
                  {action === "single" && (
                    <MDBox mb={3}>
                      <MDInput
                        label="Search Product ID"
                        fullWidth
                        value={searchProdId}
                        onChange={(e) => setSearchProdId(e.target.value)}
                      />
                      <MDButton variant="gradient" color="info" fullWidth onClick={fetchProductById}>
                        Search Product
                      </MDButton>
                    </MDBox>
                  )}
                </MDBox>
                <MDBox mt={3}>
                  <MDTypography variant="h5">Products List</MDTypography>
                  {products.map((product) => (
                    <MDBox key={product._id} mb={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <MDTypography>{product.Product_name}</MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <MDTypography>{product.prod_id}</MDTypography>
                        </Grid>
                        <Grid item xs={3}>
                          <MDTypography>{product.quantity}</MDTypography>
                        </Grid>
                        <Grid item xs={1}>
                          <MDButton
                            variant="gradient"
                            color="error"
                            onClick={() => handleDeleteProduct(product.prod_id)}
                          >
                            X
                          </MDButton>
                        </Grid>
                      </Grid>
                    </MDBox>
                  ))}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ManageProducts;
