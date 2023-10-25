import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  InputAdornment,
  TextField,
  TableSortLabel,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Product } from '../types/product';

function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState<keyof Product>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

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

  const handleSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredProducts = products.filter((product: Product) => {
    return product.name.toLowerCase().includes(filter.toLowerCase()) || product.category.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <Grid container justifyContent="center" alignItems="center">
      <TextField
        label="Filter by name or category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon/>
            </InputAdornment>
          ),
        }}
        style={{ marginRight: 16 }}
      />
      <TableContainer component={Paper} style={{ maxWidth: '70%' }}>
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
              .sort((a, b) => (order === 'asc' ? a[orderBy] > b[orderBy] ? 1 : -1 : b[orderBy] > a[orderBy] ? 1 : -1))
              .map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>$ {product.price}</TableCell>
                  <TableCell>$ {product.promoPrice}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemoveProduct(product.id)} color="error" startIcon={<DeleteRoundedIcon />} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default ProductsTable;