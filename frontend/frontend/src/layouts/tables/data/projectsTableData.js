/* eslint-disable prettier/prettier */


import React, { useEffect, useState } from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function Data() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3001/auth/getproducts');
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
    Name: <Author name={employee.Product_name} email={employee.email} />,
      Quantity: <Job title={employee.quantity} description="" />, // Adjust this as needed
      Brand: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={employee.Product_Brand}  variant="gradient" size="sm" />
        </MDBox>
      ),
      Date: (
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
      { Header: "Name", accessor: "Name", width: "45%", align: "left" },
      { Header: "Quantity", accessor: "Quantity", align: "left" },
      { Header: "Brand", accessor: "Brand", align: "center" },
      { Header: "Date", accessor: "Date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
  };
}
