import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  
  useEffect(() => {
    fetch(`${apiUrl}/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id, apiUrl]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const handleThumbnailClick = (index) => {
    // Implement a function to change the main image when a thumbnail is clicked
  };

  return (
    <div className="product-details">
      <Grid container spacing={3}>
        {/* Left half - Product Images */}
        <Grid item xs={12} md={6}>
          <div className="product-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="product-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product  ${index + 1}`}
                  onClick={() => {
                    // Handle image click to update the main image
                    handleThumbnailClick(index);
                  }}
                />
              ))}
            </div>
          )}
        </Grid>

        {/* Right half - Product Details */}
        <Grid item xs={12} md={6}>
          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="product-details">{product.description}</p>
            <div className="product-rating">
              <p>Rating: {product.rating}/5</p>
              <p>Price: ${product.price.toFixed(2)}</p>
            </div>
            <p>Status: {product.stock > 0 ? 'Available' : 'Out of Stock'}</p>
            <p>More Information</p>
            <div className="product-actions">
              <Button variant="outlined">Category</Button>
              <Button variant="outlined">Brand</Button>
            </div>
            <div className="product-quantity">
              <Button variant="outlined">-</Button>
              <p>Available: {product.stock}</p>
              <Button variant="outlined">+</Button>
            </div>
            <div className="product-buy">
              <Button variant="contained" color="primary">
                Buy Now
              </Button>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetails;