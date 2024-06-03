/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Projects() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch('http://localhost:3001/auth/getorders');
      const data = await response.json();
      setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <Card id="orders">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Order Information
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {orders.map((order) => (
            <MDBox
              component="li"
              display="flex"
              flexDirection="column"
              p={2}
              mb={2}
              mt={2}
              sx={{ background: "#f8f9fa", borderRadius: "8px" }}
              key={order._id}
            >
              <MDTypography variant="h6" fontWeight="medium" sx={{ color: "#344767", fontWeight: 600 }}>
                {order.customerName}
              </MDTypography>
              {order.products.map((product, index) => (
                <MDBox key={index} lineHeight={1.25} mb={1}>
                  <MDTypography variant="caption" fontWeight="medium" color="#7b809a" sx={{
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: "0.75rem",
                    fontWeight: 300,
                    lineHeight: 1.25,
                    letterSpacing: "0.03333em",
                    opacity: 1,
                    textTransform: "none",
                    verticalAlign: "unset",
                    textDecoration: "none",
                  }}>
                    Product Name:
                  </MDTypography>
                  <MDTypography variant="caption" sx={{ color: "#344767", fontWeight: 600 }}>
                    {product.productname}
                  </MDTypography>
                  <br />
                  <MDTypography variant="caption" fontWeight="medium" color="#7b809a" sx={{
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: "0.75rem",
                    fontWeight: 300,
                    lineHeight: 1.25,
                    letterSpacing: "0.03333em",
                    opacity: 1,
                    textTransform: "none",
                    verticalAlign: "unset",
                    textDecoration: "none",
                  }}>
                    Quantity:
                  </MDTypography>
                  <MDTypography variant="caption" sx={{ color: "#344767", fontWeight: 600 }}>
                    {product.quantity}
                  </MDTypography>
                </MDBox>
              ))}
              <MDBox lineHeight={1.25} mb={1}>
                <MDTypography variant="caption" fontWeight="medium" color="#7b809a" sx={{
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  lineHeight: 1.25,
                  letterSpacing: "0.03333em",
                  opacity: 1,
                  textTransform: "none",
                  verticalAlign: "unset",
                  textDecoration: "none",
                }}>
                  Total Amount:
                </MDTypography>
                <MDTypography variant="caption" sx={{ color: "#344767", fontWeight: 600 }}>
                  {order.total_amount}
                </MDTypography>
              </MDBox>
              <MDBox lineHeight={1.25}>
                <MDTypography variant="caption" fontWeight="medium" color="#7b809a" sx={{
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  lineHeight: 1.25,
                  letterSpacing: "0.03333em",
                  opacity: 1,
                  textTransform: "none",
                  verticalAlign: "unset",
                  textDecoration: "none",
                }}>
                  Order Date:
                </MDTypography>
                <MDTypography variant="caption" sx={{ color: "#344767", fontWeight: 600 }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </MDTypography>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Projects;
