export function readFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cards'))
}

export function writeToLocalStorage(deck) {
    localStorage.setItem('cards', JSON.stringify(deck))
}

const suits = ['heart', 'spade', 'diamond', 'club'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

export function generateDeck() {
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
    return result;
}

export function shuffle(deck) {
    deck.sort(() => Math.random() - 0.5);
}
