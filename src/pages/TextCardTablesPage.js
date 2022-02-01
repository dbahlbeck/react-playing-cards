import {useEffect, useState} from "react";
import CardTableSummary from "../components/CardTableSummary";
import {API, graphqlOperation} from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {Authenticator, withAuthenticator} from "@aws-amplify/ui-react";
import Button from "@mui/material/Button";

const suits = ['heart', 'spade', 'diamond', 'club'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

function TextCardTablesPage({signOut}) {
    const [cardTable, setCardTable] = useState([])
    const [title, setTitle] = useState("New table")

    useEffect(() => {
        API.graphql(graphqlOperation(queries.getCardTables)).then(onGetCardTables);
    }, [])

    function onGetCardTables(result) {
        let cardTables = result.data.getCardTables;
        setCardTable(cardTables)
    }

    function createTable() {
        API.graphql(graphqlOperation(mutations.addCardTable, {title: title})).then(onCreateCardTable);
    }

    function onCreateCardTable(result) {
        console.log(result)
        suits.forEach((suit) => {
            ranks.forEach((rank) => {
                API.graphql(graphqlOperation(mutations.addCard,
                    {
                        cardTableId: result.data.createCardTable.cardTableId,
                        faceDown: true,
                        x: 100,
                        y: 100,
                        rank: rank,
                        suit: suit
                    })).then((result) => console.log(result));
            })
        })
        API.graphql(graphqlOperation(queries.getCardTables)).then(onGetCardTables);
    }

    return (<Grid container>
            <Grid item xs={4}>

                <TextField id="outlined-basic"
                           label="Table name" variant="standard"
                           value={title}
                           onChange={(event) => setTitle(event.target.value)}/>
                {/*<InputGroup className="mb-3">*/}
                {/*    <FormControl placeholder="Table name" value={title}*/}
                {/*                 onChange={(event) => setTitle(event.target.value)}/>*/}
                {/*    <Button id="button-addon2" onClick={createTable}>*/}
                {/*        Create table*/}
                {/*    </Button>*/}
                {/*</InputGroup>*/}
            </Grid>
            <Grid item xs={8}>
                <Button onClick={createTable}>Create table</Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table sx={{minWidth: 650}} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Table ID</TableCell>
                                <TableCell>Table Title</TableCell>
                                <TableCell>Join</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cardTable.map((cardTable) => {
                                    return <CardTableSummary key={cardTable.cardTableId} cardTable={cardTable}/>
                                })
                            }
                        </TableBody></Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default withAuthenticator(TextCardTablesPage);