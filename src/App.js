import './App.css';
import CardTable from "./components/CardTable";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useContext} from "react";
import {CardTableContext} from "./contexts/CardTableContext";

function App() {
    const cardTableContext = useContext(CardTableContext)
    return (
            <Container>
                <Row>
                    <Col>
                        <Button>Shuffle</Button>
                    </Col>
                    <Col>
                        <Button onClick={cardTableContext.layout}>Layout</Button>
                    </Col>
                    <Col>
                        <Button onClick={cardTableContext.reveal}>Reveal all</Button>
                    </Col>
                    <Col>
                        <Button>Hide all</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CardTable/>
                    </Col>
                </Row>
            </Container>

    );
}

export default App;
