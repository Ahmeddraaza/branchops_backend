/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

export default function UserSignUp() {
  const [formData, setFormData] = useState({
    userType: '',
    userId: '',
    branchId: '',
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.status === 201) {
      alert("User created successfully!");
    } else {
      alert(`Error: ${data.msg}`);
    }
  };

  return (
    <MDBox pt={3} px={3}>
      <MDTypography variant="h6" fontWeight="medium">
         Create User
      </MDTypography>
      <MDBox mt={3}>
        <MDInput
          label="User Type"
          fullWidth
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        />
      </MDBox>
      <MDBox mt={3}>
        <MDInput
          label="User ID"
          fullWidth
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />
      </MDBox>
      <MDBox mt={3}>
        <MDInput
          label="Name"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </MDBox>
      <MDBox mt={3}>
        <MDInput
          label="Email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </MDBox>
      <MDBox mt={3}>
        <MDInput
          label="Phone"
          fullWidth
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </MDBox>
      <MDBox mt={3}>
        <MDInput
          label="Password"
          type="password"
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </MDBox>
      <MDBox mt={3}>
        <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
          Sign Up
        </MDButton>
      </MDBox>
    </MDBox>
  );
}
