import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../store/slices/cartSlice';

const styles = {
  card: {
    maxWidth: "350px",
    margin: "10px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  stockText: {
    position: "absolute",
    top: "5px",
    left: "5px",
    padding: "1px 1px",
    borderRadius: "10px",
    fontWeight: "normal",
    zIndex: 1,
    fontSize: "8px",
  },
  outOfStock: {
    fontSize: "12px",
    border: "2px solid red",
    padding: "0px 4px",
    borderRadius: "6px",
    color: "white",
    backgroundColor: "red",
  },
  inStock: {
    fontSize: "12px",
    border: "2px solid green",
    padding: "0px 4px",
    borderRadius: "6px",
    color: "white",
    backgroundColor: "green",
  },
  cardContent: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginBottom: "5px",
    fontSize: "14px",
  },
  productInfo: {
    fontSize: "14px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  },
  productName: {
    flex: 1,
    fontSize: "16px",
  },
  rating: {
    marginBottom: "10px",
    display: "flex",
    fontSize: "16px",
  },
  addToCartButton: {
    marginTop: "10px",
    color: 'white',
    border: "2px solid black",
  },
};

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isProductInCart = cartItems.some((item) => item.id === product.id);

  const handleToggleCart = () => {
    if (product.stock <= 0) {
      // If the product is out of stock, do nothing
      return;
    }

    if (isProductInCart) {
      // If the product is already in the cart, remove it
      dispatch(removeItem(product.id));
    } else {
      // If the product is not in the cart, add it
      dispatch(addItem({ ...product, quantity: 1 }));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i < rating / 2 ? "filled" : ""}`}
          role="img"
          aria-label={`Star ${i}`}
        >
          ⭐
        </span>
      );
    }
    return stars;
  };

  const getStockStatus = (stock) => {
    const stockText = stock > 40 ? "In Stock" : "Out of Stock";
    const stockStyle = stock > 40 ? styles.inStock : styles.outOfStock;

    return (
      <Typography
        variant="body2"
        style={{
          ...styles.stockText,
          ...stockStyle,
        }}
      >
        {stockText}
      </Typography>
    );
  };

  return (
    <Card style={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: '100%', height: '200px' }}
      />
      {getStockStatus(product.stock)}
      <CardContent style={styles.cardContent}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <div style={styles.productInfo}>
            <Typography variant="h6" gutterBottom style={styles.productName}>
              {product.title}
            </Typography>
            <Typography
              variant="body1"
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              ${product.price}
            </Typography>
          </div>
          <Typography
            variant="body2"
            color="textSecondary"
            style={styles.description}
          >
            {product.description}
          </Typography>
          <div className="product-rating" style={styles.rating}>
            {renderStars(product.rating)}
          </div>
        </Link>
        
        {product.stock > 40 && (
          <IconButton color="primary" onClick={handleToggleCart}>
            {isProductInCart ? (
              <RemoveShoppingCartIcon />
            ) : (
              <AddShoppingCartIcon />
            )}
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
}

export default ProductCard;
