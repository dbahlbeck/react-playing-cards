import React, {createContext, useEffect, useState} from 'react';
import {generateDeck, readFromLocalStorage, shuffle, writeToLocalStorage} from "./Deck";

export const CardTableContext = createContext();

export const CardTableProvider = (props) => {

    const [cards, setCards] = useState(() => {
        window.addEventListener('storage', storageEventHandler, false);
        let localStorageState = readFromLocalStorage();
        if (!localStorageState) {
            let deck = generateDeck();
            return shuffle(deck);
        } else {
            return localStorageState
        }
    })

    function storageEventHandler() {
        setCards(readFromLocalStorage())
    }

    const updateCard = (card) => {
        let copyOfCards = [...cards]
        let foundCard = copyOfCards.filter(x => x.suit === card.suit && x.rank === card.rank)[0]
        foundCard.x = card.x
        foundCard.y = card.y
        foundCard.faceDown = card.faceDown
        setCards(copyOfCards);
        writeToLocalStorage(copyOfCards)
    }

    const updateCards = (f) => {
        let clone = [...cards]
        clone.forEach((card, index) => f(card, index));
        setCards(clone);
        writeToLocalStorage(clone)
    }

    const layout = () => {
        updateCards((card,index) => {
            card.x = 100 + (100 * (index % 13))
            card.y = 100  + (140 * Math.floor(index / 13))
        })
    }
    const reveal = () => {
        updateCards(card => {
            card.faceDown = false;
        })
    }

    const hide = () => {
        updateCards(card => {
            card.faceDown = true;
        })
    }

    const state = {
        cards: cards,
        updateCard: updateCard,
        layout: layout,
        reveal: reveal,
        hide: hide
    };

    useEffect(() => {
        writeToLocalStorage(cards)
    }, [cards])

    return (
        <CardTableContext.Provider value={state}>
            {props.children}
        </CardTableContext.Provider>
    );
};