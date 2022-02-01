import {useContext, useEffect} from "react";
import {GQLCardTableContext} from "../contexts/GQLCardTableContext";
import CardTable from "../components/CardTable";
import {Grid} from "@aws-amplify/ui-react";
import Box from "@mui/material/Box";


function GraphicalCardTablePage() {
    const gqlCardTableContext = useContext(GQLCardTableContext)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        gqlCardTableContext.setCardTableId(urlParams.get('cardTableId'));
    }, [gqlCardTableContext])

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container>
                <Grid item xs={12}>
                    <CardTable/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default GraphicalCardTablePage;