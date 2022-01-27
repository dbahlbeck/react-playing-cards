import {AppBar, IconButton, Menu, Toolbar, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {AccountCircle} from "@mui/icons-material";
import React from "react";
import MenuItemLink from "./MenuItemLink";

function CardAppBar({signOut}) {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        handleClose()
        signOut()
    }

    return <>
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div" sx={{flexGrow: 1}}>
                    Just Play
                </Typography>
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