import React from "react";
import {Link} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

function CardTableSummary(props) {
    return (
        <TableRow>
            <TableCell>
                {props.cardTable.cardTableId}
            </TableCell>
            <TableCell>
                {props.cardTable.title}
            </TableCell>
            <TableCell>
                <Link to={{
                    pathname: '/gtable?cardTableId=' + props.cardTable.cardTableId,
                    cardTable: props.cardTable
                }}><Button>To table</Button></Link>
            </TableCell>
        </TableRow>)
}

export default CardTableSummary;