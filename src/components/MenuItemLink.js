import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import React from "react";

function MenuItemLink(props) {
    return <>
        <MenuItem component={Link} key={props.to} to={props.to}>
            <Typography textAlign="center">{props.title}</Typography>
        </MenuItem>
    </>
}

export default MenuItemLink;