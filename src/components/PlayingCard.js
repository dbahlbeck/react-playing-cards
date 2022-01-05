import React, {useContext, useState} from "react";
import {Image} from "react-konva";
import useImage from "use-image";
import {CardTableContext} from "../contexts/CardTableContext";


function PlayingCard(props) {
    const cardTableContext = useContext(CardTableContext)

    const [frontImage] = useImage(props.card.file);
    const [backImage] = useImage('1x/back-navy.png');
    const [lifted, setLifted] = useState(false)

    function onDragMove() {
        setLifted(true)
    }

    function onDragEnd(e) {
        props.card.x = e.target.attrs.x;
        props.card.y = e.target.attrs.y;
        cardTableContext.updateCard(props.card);
        setLifted(false)
    }

    function onDoubleClick() {
        props.card.faceDown = !props.card.faceDown;
        cardTableContext.updateCard(props.card);
    }

    return (
        <Image scaleY={0.5}
               scaleX={0.5}
               shadowEnabled={lifted}
               shadowOffsetX={10}
               shadowOffsetY={10}
               shadowOpacity={0.2}
               image={props.card.faceDown ? backImage : frontImage}
               x={props.card.x}
               y={props.card.y}
               draggable
               onDblClick={onDoubleClick}
               onMouseDown={onDragMove}
               onDragEnd={onDragEnd}
               onDragMove={onDragMove}
               perfectDrawEnabled={false}
        />
    );

}

export default PlayingCard;