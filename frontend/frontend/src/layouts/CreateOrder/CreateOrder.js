/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function CreateOrder() {
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState([{ Product_name: "", prod_id: "", quantity: 0 }]);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { Product_name: "", prod_id: "", quantity: 0 }]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/order/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerName, products }),
    });
    const data = await response.json();
    if (response.status === 201) {
      alert("Order created successfully!");
    } else {
      alert(`Error: ${data.msg}`);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h5">Create Order</MDTypography>
                <MDBox mt={3}>
                  <MDInput
                    label="Customer Name"
                    fullWidth
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </MDBox>
                <MDBox mt={3}>
                  {products.map((product, index) => (
                    <MDBox key={index} mb={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <MDInput
                            label="Product Name"
                            fullWidth
                            value={product.Product_name}
                            onChange={(e) => handleProductChange(index, "Product_name", e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <MDInput
                            label="Product ID"
                            fullWidth
                            value={product.prod_id}
                            onChange={(e) => handleProductChange(index, "prod_id", e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <MDInput
                            label="Quantity"
                            type="number"
                            fullWidth
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <MDButton
                            variant="gradient"
                            color="error"
                            onClick={() => handleRemoveProduct(index)}
                          >
                            X
                          </MDButton>
                        </Grid>
                      </Grid>
                    </MDBox>
                  ))}
                  <MDButton variant="gradient" color="info" onClick={handleAddProduct}>
                    Add Product
                  </MDButton>
                </MDBox>
                <MDBox mt={3}>
                  <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                    Create Order
                  </MDButton>
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

export default CreateOrder;
