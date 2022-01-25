import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import CardTableSummary from "../components/CardTableSummary";
import {API, graphqlOperation} from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

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

    return (<Container>
            <Row>
                <Col><h2>Card Games</h2></Col>
                <Col>
                    <button onClick={signOut}>Sign out</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <FormControl placeholder="Table name" value={title}
                                     onChange={(event) => setTitle(event.target.value)}/>
                        <Button id="button-addon2" onClick={createTable}>
                            Create table
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>List of tables</h3>
                </Col>
            </Row>
            <Row>
                {
                    cardTable.map((cardTable) => {
                        return <CardTableSummary key={cardTable.cardTableId} cardTable={cardTable}/>
                    })
                }

            </Row>
        </Container>
    )
}

export default TextCardTablesPage;