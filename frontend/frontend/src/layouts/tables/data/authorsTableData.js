/* eslint-disable prettier/prettier */


import React, { useEffect, useState } from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function Data() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3001/auth/getemployees');
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
      author: <Author name={employee.name} email={employee.email} />,
      function: <Job title={employee.userType} description="" />, // Adjust this as needed
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={employee.status || 'offline'} color={employee.status === 'online' ? 'success' : 'dark'} variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
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
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },

      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
  };
}
