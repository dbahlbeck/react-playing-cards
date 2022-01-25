import React, {useContext, useState} from "react";
import {Image} from "react-konva";
import useImage from "use-image";
import {GQLCardTableContext} from "../contexts/GQLCardTableContext";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "../graphql/mutations";


function PlayingCard(props) {
    const gqlCardTableContext = useContext(GQLCardTableContext)

    const [frontImage] = useImage('1x/' + props.card.suit + '_' + props.card.rank + '.png');
    const [backImage] = useImage('1x/back-navy.png');
    const [lifted, setLifted] = useState(false)
    const [moveCount, setMoveCount] = useState(0)

    function onDragMove(e) {
        setLifted(true)
        if (moveCount % 10 === 0) {
            onDragEnd(e)
        }
        setMoveCount((prev) => {
            return prev + 1
        })
    }

    function onDragEnd(e) {
        props.card.x = parseInt(e.target.attrs.x);
        props.card.y = parseInt(e.target.attrs.y);
        gqlCardTableContext.moveCard(props.card);
        setLifted(false)
    }

    function onDoubleClick() {
        console.log('DBLCLK')
        API.graphql(graphqlOperation(mutations.flipCard,
            {
                cardTableId: props.card.cardTableId,
                cardId: props.card.cardId,
                faceDown: !props.card.faceDown
            })).then((result) => {
                console.log(result)
            props.card.faceDown = !props.card.faceDown
        })
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