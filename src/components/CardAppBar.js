import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, {useContext} from "react";
import MenuItemLink from "./MenuItemLink";
import {AuthContext} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";

function CardAppBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const authContext = useContext(AuthContext)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let navigate = useNavigate();

    const handleSignOut = () => {
        handleClose()
        authContext.signOut()
        navigate("/")
    }

    return <>
        <AppBar position="static">
            <Toolbar variant="dense">
                <MenuItem component={Link} to={'/'} >
                    <Typography variant="h6" color="inherit" component="div" >
                        Just Play
                    </Typography>
                </MenuItem>
                <Box sx={{flexGrow: 1}}/>
                <MenuItemLink to={'/tables'} title={'Join table'}/>
                <MenuItemLink to={'/createTable'} title={'Create table'}/>
                <MenuItemLink to={'/instructions'} title={'Instructions'}/>
                {!auth &&
                (
                    <MenuItemLink to={'/signIn'} title={'Sign in'}/>
                )}
                {auth && (<div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </div>)}
            </Toolbar>
        </AppBar>
    </>
}

export default CardAppBar;