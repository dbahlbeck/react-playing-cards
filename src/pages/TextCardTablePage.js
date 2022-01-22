import {useContext, useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import TextCard from "../components/TextCard";
import {GQLCardTableContext} from "../contexts/GQLCardTableContext";

function TextCardTablePage() {
    const gqlCardTableContext = useContext(GQLCardTableContext)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        gqlCardTableContext.setCardTableId(urlParams.get('cardTableId'));
    }, [gqlCardTableContext])

    return (
        <Container fluid>
            <Row>
                <Col>Card Table</Col>
            </Row>
            <Row>
                {
                    gqlCardTableContext.cardTable !== null && gqlCardTableContext.cardTable.cards && gqlCardTableContext.cardTable.cards.map((card) => {
                        return <TextCard card={card} key={card.cardId}/>
                    })
                }
            </Row>

        </Container>

    );
}

export default TextCardTablePage;