import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Product from '../types/product';

function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3100/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    loadProducts();
  }, []);

  const handleRemoveProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:3100/products/${productId}`);

      setProducts(products.filter((product: Product) => product.id !== productId));
    } catch (error) {
      console.error('Erro ao remover o produto:', error);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Product Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Promotional Price</TableCell>
            <TableCell>Actions</TableCell>
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
                <Button onClick={() => handleRemoveProduct(product.id)} color="error" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductsTable;