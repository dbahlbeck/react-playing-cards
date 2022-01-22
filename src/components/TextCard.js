import {Col, Form, Row} from "react-bootstrap";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "../graphql/mutations";

function TextCard({card}) {
    function onFaceDownCheckboxChanged() {
        API.graphql(graphqlOperation(mutations.flipCard,
            {
                cardTableId: card.cardTableId,
                cardId: card.cardId,
                faceDown: !card.faceDown
            })).then((result) => {
            card.faceDown = !card.faceDown
        })

    }

    return <>
        <Row key={card.cardId}>
            <Col xs={4}>{card.cardId}</Col>
            <Col>{card.rank}</Col>
            <Col>{card.suit}</Col>
            <Col>{card.x}</Col>
            <Col>{card.y}</Col>
            <Col xs={2}>
                <Form>
                    <Form.Check type="checkbox" label="Face down" onChange={onFaceDownCheckboxChanged} checked={card.faceDown}/>
                </Form>
            </Col>
        </Row>
    </>
}

export default TextCard;