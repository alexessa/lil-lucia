import {
  AccountBoxOutlined,
  Add,
  Login,
  Logout,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Badge,
  Button,
  List,
  ListItem,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../../../common/context/authentication-context";
import { useShoppingCart } from "../../../common/context/shopping-cart-context";

const NavLinks = (props: any) => {
  const auth = useContext(AuthContext);
  const { openCart, cartQuantity } = useShoppingCart();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);
  const handleClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorEl2(null);
  };

  return (
    <List>
      <ListItem>
        <Button
          fullWidth={isSmall}
          color="inherit"
          size="small"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Products
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <NavLink to="/products/cakes" className="all-unset">
            <MenuItem onClick={handleClose}>Cakes</MenuItem>
          </NavLink>
          <NavLink to="/products/muffins" className="all-unset">
            <MenuItem onClick={handleClose}>Muffins</MenuItem>
          </NavLink>
          <NavLink to="/products/cookies" className="all-unset">
            <MenuItem onClick={handleClose}>Cookies</MenuItem>
          </NavLink>
        </Menu>
        {auth.isLoggedIn && auth.user.IsAdmin === true && (
          <NavLink to="/add-products" className="all-unset">
            <Button
              fullWidth={isSmall}
              onClick={props.close}
              color="inherit"
              size="small"
            >
              <Add fontSize="small" /> Products
            </Button>
          </NavLink>
        )}
        {auth.isLoggedIn && (
          <>
            <Button
              fullWidth={isSmall}
              color="inherit"
              size="small"
              aria-controls={open2 ? "basic-menu-user" : undefined}
              aria-haspopup="true"
              aria-expanded={open2 ? "true" : undefined}
              onClick={handleClickUser}
            >
              <AccountBoxOutlined />
            </Button>
            <Menu
              id="basic-menu-user"
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleCloseUser}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <NavLink to="/profile" className="all-unset">
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </NavLink>
              <NavLink to="/orders" className="all-unset">
                <MenuItem onClick={handleClose}>Orders</MenuItem>
              </NavLink>
            </Menu>
          </>
        )}
        {auth.isLoggedIn && (
          <Button
            fullWidth={isSmall}
            onClick={openCart}
            color="inherit"
            size="small"
          >
            <Badge color="secondary" badgeContent={cartQuantity}>
              <ShoppingCart />
            </Badge>
          </Button>
        )}
        {!auth.isLoggedIn && (
          <NavLink to="/authenticate" className="all-unset">
            <Button
              fullWidth={isSmall}
              onClick={props.close}
              color="inherit"
              size="small"
            >
              <Login />
            </Button>
          </NavLink>
        )}
        {auth.isLoggedIn && (
          <Button
            fullWidth={isSmall}
            onClick={auth.logout}
            color="inherit"
            size="small"
          >
            <Logout />
          </Button>
        )}
      </ListItem>
    </List>
  );
};

export default NavLinks;
