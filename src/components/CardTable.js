import React, {useEffect, useState} from "react";
import {Image, Layer, Stage} from "react-konva";
import useImage from "use-image";

const suits = ['heart', 'spade', 'diamond', 'club'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

const CardImage = (props) => {
    const [frontImage, status] = useImage(props.src);
    const [backImage] = useImage('1x/back-navy.png');
    const [faceDown, setFaceDown] = useState(false)
    const [lifted, setLifted] = useState(false)

    function onDragMove(e) {
        console.log('move');
        setLifted(true)
    }

    function onDragEnd(e) {
        console.log('end');
        setLifted(false)
    }

    function click(e) {
        console.log('Clicked!')
        setFaceDown(!faceDown);
    }

    return <Image scaleY={0.5} scaleX={0.5} shadowEnabled={lifted} shadowOffsetX={10} shadowOffsetY={10} shadowOpacity={0.2} image={faceDown ? backImage : frontImage} x={100 + (100 * (props.index % 13))} y={100  + (140 * Math.floor(props.index / 13))}
                  draggable onDblClick={click} onMouseUp={onDragEnd} onMouseDown={onDragMove} onDragEnd={onDragEnd} onDragMove={onDragMove}/>;

};

function CardTable() {
    const [cards, setCards] = useState([])

    useEffect(() => {
        const result = [];
        suits.forEach((suit) => {
            ranks.forEach((rank) => {
                result.push("1x/" + suit + "_" + rank + ".png")
                console.log("1x/" + suit + "_" + rank + ".png")
            })
        })
        console.log(result)
        setCards(result)
    }, [])
    return (
        <Stage width={window.innerWidth} height={window.innerHeight} style={{border: '5px solid #000'}}>
            <Layer>
                {cards.map((card, index) => {
                    return <CardImage src={card} key={card} index={index} />
                })}
            </Layer>
        </Stage>);
}

export default CardTable;