import {createContext, useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";
import * as mutations from "../graphql/mutations";

export const GQLCardTableContext = createContext();

export const GQLCardTableProvider = (props) => {
    const [cardTableId, setCardTableId] = useState(null);
    const [cardTable, setCardTable] = useState({ cards: []});

    useEffect(() => {
        if (cardTableId) {
            console.log('1. CardTableId changed to ' + cardTableId + ', getting cards')
            API.graphql(graphqlOperation(queries.getCardTable, {cardTableId: cardTableId})).then(function (result) {
                let getCardTable = result.data.getCardTable;
                setCardTable(getCardTable)
            })
        }
    }, [cardTableId])

    const onCardUpdated = (provider, value) => {
        setCardTable(prevState => {
            const updatedCard = provider.value.data.updatedCard
            if (prevState !== null) {
                const existingCard = prevState.cards.find(card => card.cardId === updatedCard.cardId)
                if (existingCard) {
                    existingCard.x = updatedCard.x
                    existingCard.y = updatedCard.y
                    existingCard.faceDown = updatedCard.faceDown
                } else {
                    prevState.cards.push(updatedCard)
                }
            }
            return {...prevState}
        })
    }


    useEffect(() => {
        if (cardTableId) {
            console.log('2. CardTableId changed to ' + cardTableId + ", subscribing.")
            let subscriptionOptions = graphqlOperation(subscriptions.onCardUpdated, {cardTableId: cardTableId});
            const subscription = API.graphql(subscriptionOptions).subscribe({
                next: onCardUpdated,
                error: error => console.warn(error)
            })
            return () => {
                subscription.unsubscribe()
            }
        }
    }, [cardTableId])


    function moveCard(card) {
        API.graphql(graphqlOperation(mutations.MoveCard,
            {
                cardTableId: card.cardTableId,
                cardId: card.cardId,
                x: card.x,
                y: card.y,
                rank: card.rank,
                suit: card.suit
            })).then((result) => console.log(result));

    }

    const state = {
        getCards: () => cardTable != null ? cardTable.cards : [],
        cardTable: cardTable,
        setCardTableId: setCardTableId,
        moveCard: moveCard
    };


    return <GQLCardTableContext.Provider value={state}>
        {props.children}
    </GQLCardTableContext.Provider>
}