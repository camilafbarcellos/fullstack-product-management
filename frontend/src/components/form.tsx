import React, { useState } from 'react';
import { Alert, Button, Grid, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { ProductCategory } from '../types/productCategory';

function RegisterForm() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    color: '',
    category: '',
    price: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3100/products', product);
      setFailure(false);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setFailure(true);
      console.error('Error:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <form style={{ minWidth: '35%' }}>
        <Stack spacing={2}>
          <TextField
            required
            id="outlined-required"
            type="text"
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <TextField
            required
            type="text"
            id="outlined-required"
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          <TextField
            required
            type="text"
            id="outlined-required"
            label="Color"
            name="color"
            value={product.color}
            onChange={handleChange}
          />
          <TextField
            select
            id="outlined-select"
            label="Category"
            helperText="Please select a category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            {Object.values(ProductCategory).map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            type="number"
            id="outlined-start-adornment"
            label="Price"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            name="price"
            value={product.price}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register product
          </Button>
          {!success ? '' : <Alert severity="success">Success!</Alert>}
          {!failure ? '' : <Alert severity="error">Invalid product, try again!</Alert>}
        </Stack>
      </form>
    </Grid>
  );
};

export default RegisterForm;
