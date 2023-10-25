import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Product } from '../types/product';

function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <Grid container justifyContent="center" alignItems="center">
      <TableContainer component={Paper} style={{ maxWidth: '70%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Color</b></TableCell>
              <TableCell><b>Product Type</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell style={{ width: '15%' }}><b>Promotional Price</b></TableCell>
              <TableCell style={{ width: '15px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: Product) => (
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