import {useContext, useEffect} from "react";
import TextCard from "../components/TextCard";
import {GQLCardTableContext} from "../contexts/GQLCardTableContext";
import {Grid} from "@mui/material";

function TextCardTablePage() {
    const gqlCardTableContext = useContext(GQLCardTableContext)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        gqlCardTableContext.setCardTableId(urlParams.get('cardTableId'));
    }, [gqlCardTableContext])

    return (
        <Grid container>
            <Grid item xs={12}>Card Table</Grid>
            <Grid item xs={12}>
                {
                    gqlCardTableContext.cardTable !== null && gqlCardTableContext.cardTable.cards && gqlCardTableContext.cardTable.cards.map((card) => {
                        return <TextCard card={card} key={card.cardId}/>
                    })
                }
            </Grid>

        </Grid>

    );
}

export default TextCardTablePage;