export let onCardUpdated = `
subscription MySubscription($cardTableId: ID!) {
  updatedCard(cardTableId: $cardTableId) {
    cardTableId
    cardId
    x
    y
    rank
    suit
    faceDown
  }
}
`;