import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateItemQuantity } from '../store/slices/cartSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const increaseButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  width: '30px',
  height: '30px',
  borderRadius: '10%',
  marginLeft: '0px',
};

const decreaseButtonStyle = {
  backgroundColor: 'silver',
  color: 'white',
  width: '30px',
  height: '30px',
  borderRadius: '10%',
  marginTop: '1px',
  marginLeft: '0px',
};

const quantityStyle = {
  backgroundColor: 'white',
  border: '1px solid silver',
  width: '28px',
  height: '28px',
  borderRadius: '10%',
  marginTop: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice.toFixed(2); // Fix to 2 decimal places
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Empty cart</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Remove</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img src={item.thumbnail} alt={item.name} style={{ width: '60px', height: '60px' }} />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p><strong>{item.title}</strong></p>
                      <p>{item.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      style={increaseButtonStyle}
                    >
                      <AddIcon />
                    </IconButton>
                    <div style={quantityStyle}>{item.quantity}</div>
                    <IconButton
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={decreaseButtonStyle}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveItem(item)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div style={{ float: 'right', border: '1px solid #ccc', padding: '10px', margin: '15px' }}>
        <p>Total Price: ${calculateTotalPrice(cartItems)}</p>
      </div>
    </div>
  );
}

export default Cart;
