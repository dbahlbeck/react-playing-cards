import React, {createContext, useEffect, useState} from 'react';

export const CardTableContext = createContext();

const suits = ['heart', 'spade', 'diamond', 'club'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

export const CardTableProvider = (props) => {

    const [cards, setCards] = useState(() => {
        window.addEventListener('storage', storageEventHandler, false);
        let localStorageState = JSON.parse(localStorage.getItem('cards'));
        if (!localStorageState) {
            const result = [];
            suits.forEach((suit) => {
                ranks.forEach((rank) => {
                    result.push({
                        file: "1x/" + suit + "_" + rank + ".png",
                        faceDown: false,
                        x: 100,
                        y: 100,
                        rank: rank,
                        suit: suit
                    });
                })
            })
            shuffle(result);
            return result;
        } else {
            return localStorageState
        }
    })

    function shuffle(arr) {
        arr.sort(() => Math.random() - 0.5);
    }

    function storageEventHandler() {
        setCards(JSON.parse(localStorage.getItem('cards')))
    }

    const updateCard = (card) => {
        let copyOfCards = [...cards]
        let foundCard = copyOfCards.filter(x => x.suit === card.suit && x.rank === card.rank)[0]
        foundCard.x = card.x
        foundCard.y = card.y
        foundCard.faceDown = card.faceDown
        setCards(copyOfCards);
        localStorage.setItem('cardTable', copyOfCards)
    }

    const updateCards = (f) => {
        let clone = [...cards]
        clone.forEach((card, index) => f(card, index));
        setCards(clone);
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
        localStorage.setItem('cards', JSON.stringify(cards))
    }, [cards])

    return (
        <CardTableContext.Provider value={state}>
            {props.children}
        </CardTableContext.Provider>
    );
};