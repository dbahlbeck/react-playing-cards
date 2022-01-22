export const addCard = `
    mutation AddCard($cardTableId: ID!, $faceDown: Boolean = false, $x: Int!, $y: Int!, $suit: String!, $rank: String!) {
        addCard(cardTableId: $cardTableId, faceDown: $faceDown, rank: $rank, suit: $suit, x: $x, y: $y) {
            cardId
            rank
            suit
            x
            y
        }
}`;

export const MoveCard = `
    mutation MoveCard($cardTableId: ID!, $cardId: ID!, $x: Int!, $y: Int!) {
        moveCard(cardTableId: $cardTableId, cardId: $cardId, x: $x, y: $y) {
            cardTableId
            cardId
            x
            y
            faceDown
            rank
            suit
        } 
    }
`;

export const flipCard = `
    mutation FlipCard($cardTableId: ID!, $cardId: ID!, $faceDown: Boolean! ) {
        flipCard(cardTableId: $cardTableId, cardId: $cardId, faceDown: $faceDown) {
            cardId
            cardTableId
            x
            y
            faceDown
            rank
            suit
        } 
    }
`;

export const addCardTable = `
    mutation CreateNewTable($title: String!) {
      createCardTable(title: $title) {
        cardTableId
      }
    }
`;