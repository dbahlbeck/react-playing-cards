import React, {useContext} from "react";
import {Layer, Stage} from "react-konva";
import {CardTableContext, CardTableProvider} from "../contexts/CardTableContext";
import PlayingCard from "./PlayingCard";
import PrivateArea from "./PrivateArea";

function CardTable() {
    const cardTableContext = useContext(CardTableContext)
    return (
        <Stage width={window.innerWidth} height={window.innerHeight} style={{border: '5px solid #000'}}>
            <CardTableProvider>
                <Layer>
                    <PrivateArea color={'green'} x={0} y={0}/>
                    <PrivateArea color={'red'} x={200} y={0}/>
                </Layer>
                <Layer>
                    {cardTableContext.cards.map(card => {
                        return <PlayingCard card={card} key={card.cardId}/>
                    })}
                </Layer>
            </CardTableProvider>
        </Stage>);
}

export default CardTable;