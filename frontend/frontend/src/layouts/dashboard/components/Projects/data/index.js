/* eslint-disable prettier/prettier */


import React, { useEffect, useState } from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function Data() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3001/auth/getorders');
      const data = await response.json();
      setEmployees(data);
    }

    fetchData();
  }, []);

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const rows = employees.map(employee => {
    return {
      Customer: <Author name={employee.customerName} email={employee.email} />,
      Amount: <Job title={employee.total_amount} description="" />, // Adjust this as needed
      
      OrderDate: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {new Date(employee.createdAt).toLocaleDateString()}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    };
  });

  return {
    columns: [
      { Header: "Customer", accessor: "Customer", width: "45%", align: "left" },
      { Header: "Amount", accessor: "Amount", align: "left" },
      
      { Header: "OrderDate", accessor: "OrderDate", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
  };
}
