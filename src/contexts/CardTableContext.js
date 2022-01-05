import React, {createContext, useEffect, useState} from 'react';
import data from './52CardDeck.json'

export const CardTableContext = createContext();

const suits = ['heart', 'spade', 'diamond', 'club'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

export const CardTableProvider = (props) => {

    const [cards, setCards] = useState(() => {
        window.addEventListener('storage', storageEventHandler, false);
        return JSON.parse(localStorage.getItem('cards')) || data;
    })

    function storageEventHandler() {
        setCards(JSON.parse(localStorage.getItem('cards')) || data)
    }

    const updateCard = (card) => {
        let copyOfCards = [...cards]
        let foundCard = copyOfCards.filter(x=> x.cardId === card.cardId)[0]
        foundCard.x = card.x
        foundCard.y = card.y
        foundCard.faceDown = card.faceDown
        setCards(copyOfCards);
        localStorage.setItem('cardTable', copyOfCards)
    }

    const updateCards = (f) => {
        let clone = [...cards]
        clone.forEach(card => f(card));
        setCards(clone);
    }

    const layout = () => {
        updateCards(card => {
            card.x = 100 + card.rank * 20;
            card.y = 20;
        })
    }
    const reveal = () => {
        updateCards(card => {
            card.faceDown = false;
        })
    }

    const state = {
        cards: cards,
        updateCard: updateCard,
        layout: layout,
        reveal: reveal
    };

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards))
    }, [cards])

    return (
        <CardTableContext.Provider value={state}>
            {props.children}
        </CardTableContext.Provider>
    );
};
export default CardTableContext;