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
/* eslint-disable prettier/prettier */

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import {useEffect} from 'react'

// Billing page components
import Invoice from "layouts/billing/components/Invoice";
import {useState} from 'react'

function Invoices() {
  const[employees,setEmployees]=useState();

  useEffect(()=>{
  async function fetchData() {
    const response = await fetch('http://localhost:3001/auth/getOrders');
    console.log(response)
    const data = await response.json();
    
  setEmployees( data); 
  console.log(employees)
   

  }

  fetchData();},[])





  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Invoices
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          view all
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        {employees && employees.map((employee) => {
    const createdAt = new Date(employee.createdAt);
    const year = createdAt.getFullYear().toString().slice(-2); // Get last two digits of the year
    const month = (createdAt.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with leading zero if needed
    const day = createdAt.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed

    const formattedDate = `${year} ${day} ${month}`; // Format as yy dd mm
    

    return (
        <Invoice 
            key={employee._id} 
            id={employee._id} 
            date={formattedDate}  
            price={"$"+employee.total_amount} 
        />
    );
})}
          <Invoice date="March, 01, 2020" id="#MS-415646" price="$180" />
          <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />
          <Invoice date="April, 05, 2020" id="#QW-103578" price="$120" />
          <Invoice date="June, 25, 2019" id="#MS-415646" price="$180" />
          <Invoice date="March, 01, 2019" id="#AR-803481" price="$300" noGutter />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
