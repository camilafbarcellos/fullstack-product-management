import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Paper, Button, Grid,
  InputAdornment, TextField, TableSortLabel,
  Select, MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Product } from '../types/product';
import { ProductCategory } from '../types/productCategory';

function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState<keyof Product>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [editProductId, setEditProductId] = useState<number | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3100/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    loadProducts();
  }, []);

  const handleRemoveProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:3100/products/${productId}`);
      setProducts(products.filter((product: Product) => product.id !== productId));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleModifyProduct = (productId: number | null) => {
    setEditProductId(productId);
  };

  const handleSaveProduct = async (modifiedProduct: Product) => {
    try {
      const response = await axios.put(`http://localhost:3100/products/${modifiedProduct.id}`, modifiedProduct);
      const updatedProducts = products.map((product) => (product.id === modifiedProduct.id ? response.data : product));
      setProducts(updatedProducts);
      setEditProductId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFieldChange = (field: keyof Product, productId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          [field]: e.target.value,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product: Product) => {
    return product.name.toLowerCase().includes(filter.toLowerCase()) || product.category.toLowerCase().includes(filter.toLowerCase());
  });

  const renderFilterInput = () => (
    <Grid item xs={12} style={{ maxWidth: '35%' }}>
      <TextField
        label="Filter by name or category"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );

  const renderProductRows = () => (
    <Grid item xs={12} style={{ maxWidth: '70%' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  <b>Name</b>
                </TableSortLabel>
              </TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Color</b></TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'category'}
                  direction={orderBy === 'category' ? order : 'asc'}
                  onClick={() => handleSort('category')}
                >
                  <b>Product Type</b>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={() => handleSort('price')}
                >
                  <b>Price</b>
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ width: '15%' }}><b>Promotional Price</b></TableCell>
              <TableCell style={{ width: '15px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .sort((a, b) => (order === 'asc' ? a[orderBy]! > b[orderBy]! ? 1 : -1 : b[orderBy]! > a[orderBy]! ? 1 : -1))
              .map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {editProductId === product.id ? (
                      <TextField
                        value={product.name}
                        onChange={handleFieldChange('name', product.id)}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editProductId === product.id ? (
                      <TextField
                        value={product.description}
                        onChange={handleFieldChange('description', product.id)}
                      />
                    ) : (
                      product.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editProductId === product.id ? (
                      <TextField
                        value={product.color}
                        onChange={handleFieldChange('color', product.id)}
                      />
                    ) : (
                      product.color
                    )}
                  </TableCell>
                  <TableCell>
                    {editProductId === product.id ? (
                      <Select
                        value={product.category}
                        onChange={(e) => {
                          if (e.target.value) {
                            handleFieldChange('category', product.id!)(e as any);
                          }
                        }}
                      >
                        {Object.values(ProductCategory).map((category, index) => (
                          <MenuItem key={index} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      product.category
                    )}
                  </TableCell>
                  <TableCell>
                    {editProductId === product.id ? (
                      <TextField
                        type="number"
                        value={product.price}
                        onChange={handleFieldChange('price', product.id)}
                      />
                    ) : (
                      `$ ${product.price}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editProductId === product.id ? (
                      <TextField
                        type="number"
                        value={product.promoPrice}
                        onChange={handleFieldChange('promoPrice', product.id)}
                      />
                    ) : (
                      `$ ${product.promoPrice}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editProductId === product.id ? (
                      <Button onClick={() => handleSaveProduct(product)} color="primary" startIcon={<SaveIcon />} />
                    ) : (
                      <Button onClick={() => handleModifyProduct(product.id!)} color="primary" startIcon={<EditIcon />} />
                    )}
                    <Button onClick={() => handleRemoveProduct(product.id!)} color="error" startIcon={<DeleteIcon />} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {renderFilterInput()}
      {renderProductRows()}
    </Grid>
  );
}

export default ProductsTable;
