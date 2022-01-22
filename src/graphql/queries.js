

export const getCardTable = `
    query MyQuery($cardTableId: ID!) {
        getCardTable(cardTableId: $cardTableId) {
            cardTableId
            title
            cards {
              cardId
              cardTableId
              x
              y
              rank
              suit
              faceDown     
            }
        }
    }
`;

export const getCardTables = `
    query MyQuery {
      getCardTables {
        cardTableId
        title
        cards {
          cardId
        }
      }
    }
`;