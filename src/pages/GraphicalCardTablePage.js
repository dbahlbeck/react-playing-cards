import {Col, Container, Row} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {GQLCardTableContext} from "../contexts/GQLCardTableContext";
import CardTable from "../components/CardTable";


function GraphicalCardTablePage() {
    const gqlCardTableContext = useContext(GQLCardTableContext)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        gqlCardTableContext.setCardTableId(urlParams.get('cardTableId'));
    }, [gqlCardTableContext])

    useEffect(() => {
        console.log(gqlCardTableContext.cardTable)
    }, [gqlCardTableContext.cardTable])

    return (
        <Container>
            <Row>
                <Col>
                    <CardTable/>
                </Col>
            </Row>
        </Container>

    );
}

export default GraphicalCardTablePage;