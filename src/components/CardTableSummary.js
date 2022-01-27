import {Button} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import {TableCell, TableRow} from "@mui/material";

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
            {/*<Col xs={4}>*/}
            {/*    {props.cardTable.cardTableId}*/}
            {/*</Col>*/}
            {/*<Col xs={3}>*/}
            {/*    {props.cardTable.title}*/}
            {/*</Col>*/}
            {/*<Col xs={1}>*/}
            {/*    {props.cardTable.cards.length}*/}
            {/*</Col>*/}
            {/*<Col xs={2}>*/}
            {/*    <Link to={{*/}
            {/*        pathname: '/table?cardTableId=' + props.cardTable.cardTableId,*/}
            {/*        cardTable: props.cardTable*/}
            {/*    }}><Button>To table</Button></Link>*/}
            {/*</Col>*/}
            {/*<Col xs={2}>*/}
            {/*    <Link to={{*/}
            {/*        pathname: '/gtable?cardTableId=' + props.cardTable.cardTableId,*/}
            {/*        cardTable: props.cardTable*/}
            {/*    }}><Button>To Graphical table</Button></Link>*/}
            {/*</Col>*/}
        </TableRow>)
}

export default CardTableSummary;