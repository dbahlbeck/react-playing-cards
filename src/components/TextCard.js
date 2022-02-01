import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "../graphql/mutations";
import {Grid} from "@mui/material";
import {CheckBox} from "@mui/icons-material";

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

    return <Grid container>
        <Grid item xs={4}>{card.cardId}</Grid>
        <Grid item xs={2}>{card.rank}</Grid>
        <Grid item xs={1}>{card.suit}</Grid>
        <Grid item xs={1}>{card.x}</Grid>
        <Grid item xs={1}>{card.y}</Grid>
        <Grid item xs={2}>
                <CheckBox type="checkbox" label="Face down" onChange={onFaceDownCheckboxChanged} checked={card.faceDown}/>
        </Grid>
    </Grid>
}

export default TextCard;