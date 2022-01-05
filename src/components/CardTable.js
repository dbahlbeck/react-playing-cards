import React, {useEffect, useRef, useState} from "react";
import {Image, Layer, Stage} from "react-konva";
import useImage from "use-image";

const suits = ['heart', 'spade', 'diamond', 'club'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

const CardImage = (props) => {
    const [frontImage, status] = useImage(props.src);
    const [backImage] = useImage('1x/back-navy.png');
    const [faceDown, setFaceDown] = useState(false)
    const [lifted, setLifted] = useState(false)

    function onDragMove(event) {
        setLifted(true)
    }

    function onDragEnd(event) {
        setLifted(false)
    }

    function click(event) {
        setFaceDown(!faceDown);
    }

    return <Image
                scaleY={0.5}
                scaleX={0.5}
                shadowEnabled={lifted}
                shadowOffsetX={10}
                shadowOffsetY={10}
                shadowOpacity={0.2}
                image={faceDown ? backImage : frontImage}
                x={100 + (100 * (props.index % 13))}
                y={100  + (140 * Math.floor(props.index / 13))}
                draggable
                onDblClick={click}
                onMouseUp={onDragEnd}
                onMouseDown={onDragMove}
                onDragEnd={onDragEnd}
                onDragMove={onDragMove}
                perfectDrawEnabled={false}
            />;

};

function CardTable() {
    const [cards, setCards] = useState([])

    const scaleBy = 0.90;
    const stageRef = useRef();
    let lastCenter = null;
    let lastDist = 0;

    // Pythagorean Theorem
    function getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    function getCenter(p1, p2) {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
        };
    }

    function isTouchEnabled() {
        return ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 );
    }

    function zoomStage(event) {
        event.evt.preventDefault();
        if (stageRef.current) {
            const stage = stageRef.current;
            const oldScale = stage.scaleX();
            const { x: pointerX, y: pointerY } = stage.getPointerPosition();
            const mousePointTo = {
                x: (pointerX - stage.x()) / oldScale,
                y: (pointerY - stage.y()) / oldScale,
            };
            const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            stage.scale({ x: newScale, y: newScale });
            const newPos = {
                x: pointerX - mousePointTo.x * newScale,
                y: pointerY - mousePointTo.y * newScale,
            };
            stage.position(newPos);
            stage.batchDraw();
        }
    }

    function handleTouch(event) {
        event.evt.preventDefault();
        var touch1 = event.evt.touches[0];
        var touch2 = event.evt.touches[1];
        const stage = stageRef.current;
        if (stage !== null) {
            if (touch1 && touch2) {
                if (stage.isDragging()) {
                    stage.stopDrag();
                }

                var p1 = {
                    x: touch1.clientX,
                    y: touch1.clientY
                };
                var p2 = {
                    x: touch2.clientX,
                    y: touch2.clientY
                };

                if (!lastCenter) {
                    lastCenter = getCenter(p1, p2);
                    return;
                }
                var newCenter = getCenter(p1, p2);

                var dist = getDistance(p1, p2);

                if (!lastDist) {
                    lastDist = dist;
                }

                // local coordinates of center point
                var pointTo = {
                    x: (newCenter.x - stage.x()) / stage.scaleX(),
                    y: (newCenter.y - stage.y()) / stage.scaleX()
                };

                var scale = stage.scaleX() * (dist / lastDist);

                stage.scaleX(scale);
                stage.scaleY(scale);

                // calculate new position of the stage
                var dx = newCenter.x - lastCenter.x;
                var dy = newCenter.y - lastCenter.y;

                var newPos = {
                    x: newCenter.x - pointTo.x * scale + dx,
                    y: newCenter.y - pointTo.y * scale + dy
                };

                stage.position(newPos);
                stage.batchDraw();

                lastDist = dist;
                lastCenter = newCenter;
            }
        }
    }

    function handleTouchEnd() {
        lastCenter = null;
        lastDist = 0;
    }

    function shuffle(arr) {
        arr.sort( () => Math.random() - 0.5 );
    }

    useEffect(() => {
        const result = [];
        suits.forEach((suit) => {
            ranks.forEach((rank) => {
                result.push("1x/" + suit + "_" + rank + ".png");
            })
        })
        shuffle(result);
        setCards(result);
    }, [])

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            style={{border: '5px solid #000'}}
            draggable={!isTouchEnabled()}
            onWheel={zoomStage}
            onTouchMove={handleTouch}
            onTouchEnd={handleTouchEnd}
            ref={stageRef}
        >
            <Layer>
                {cards.map((card, index) => {
                    return <CardImage src={card} key={card} index={index} />
                })}
            </Layer>
        </Stage>);
}

export default CardTable;
