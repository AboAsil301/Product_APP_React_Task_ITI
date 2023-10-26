import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Light mode icon
//import LanguageIcon from "@mui/icons-material/Language"; // Language icon
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR"; // LTR icon
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL"; // RTL icon
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useDirection } from "../DirectionContext";
import { useTheme } from "../ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { direction, toggleDirection } = useDirection();

  const handleThemeChange = () => {
    toggleTheme();
    // Add logic to change the background color based on the theme
    document.body.style.backgroundColor =
      theme === "light" ? "#000000" :  "#ffffff";
  };

  const handleDirectionChange = () => {
    toggleDirection();
    // Change the page orientation
    document.documentElement.dir = direction === "ltr" ? "rtl" : "ltr";
  };

  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navbarStyle = {
    backgroundColor: "lightgray",
    height: "60px",
  };

  const navLinkStyle = {
    color: "black",
    textDecoration: "none",
  };

  const activeLinkStyle = {
    fontWeight: "bold",
    color: "green",
  };

  return (
    <div>
      <AppBar position="static" style={navbarStyle}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/products"
            style={{
              ...navLinkStyle,
              ...(location.pathname === "/products" ? activeLinkStyle : {}),
            }}
          >
            Products App
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            color="inherit"
            component={NavLink}
            to="/register"
            activeClassName="active-link"
            style={{
              ...navLinkStyle,
              ...(location.pathname === "/register" ? activeLinkStyle : {}),
            }}
          >
            Register
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/login"
            activeClassName="active-link"
            style={{
              ...navLinkStyle,
              ...(location.pathname === "/login" ? activeLinkStyle : {}),
            }}
          >
            Login
          </Button>
          <IconButton
            color="inherit"
            component={NavLink}
            to="/cart"
            activeClassName="active-link"
          >
            <div className="cart-icon-container">
              {cartQuantity > 0 && (
                <div
                  className="cart-badge"
                  style={{ fontSize: "10px", color: "green" }}
                >
                  {cartQuantity}
                </div>
              )}
              <ShoppingCartIcon />
            </div>
          </IconButton>
          <IconButton color="inherit" onClick={handleThemeChange}>
            {theme === "light" ?<Brightness7Icon />  : <Brightness4Icon />}
          </IconButton>
          <IconButton color="inherit" onClick={handleDirectionChange}>
            {direction === "ltr" ? (
              <FormatTextdirectionLToRIcon />
            ) : (
              <FormatTextdirectionRToLIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
