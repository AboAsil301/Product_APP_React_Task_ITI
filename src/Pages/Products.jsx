import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from '../components/ProductCard';

function Products({ products }) {
  return (
    <>
      <h4 style={{ textAlign: 'center', margin: '20px', color: 'blue' }}>
        Welcome to our shopping website, start browsing... We have {products.length} products
      </h4>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={4} md={3} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Products;
