/* eslint-disable prettier/prettier */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect, useState } from "react";

function OrdersOverview() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch('http://localhost:3001/auth/getorders');
      const data = await response.json();
      // Sort the orders by date and take the top 5
      const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
      setOrders(sortedOrders);
    }

    fetchOrders();
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Orders Overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {orders.map((order, index) => (
          <TimelineItem
            key={order._id}
            color={index % 2 === 0 ? "success" : "info"}
            icon="shopping_cart"
            title={`$${order.total_amount}, Product: ${order.products.map(p => p.productname).join(", ")}`}
            dateTime={new Date(order.createdAt).toLocaleDateString()}
          />
        ))}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
