import React, {useContext, useRef} from "react";
import {Layer, Stage} from "react-konva";
import PlayingCard from "./PlayingCard";
import {CardTableContext, CardTableProvider} from "../contexts/CardTableContext";


function CardTable() {
    const cardTableContext = useContext(CardTableContext)

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
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    }

    function zoomStage(event) {
        event.evt.preventDefault();
        if (stageRef.current) {
            const stage = stageRef.current;
            const oldScale = stage.scaleX();
            const {x: pointerX, y: pointerY} = stage.getPointerPosition();
            const mousePointTo = {
                x: (pointerX - stage.x()) / oldScale,
                y: (pointerY - stage.y()) / oldScale,
            };
            const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            stage.scale({x: newScale, y: newScale});
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
            <CardTableProvider>
                <Layer>
                    {cardTableContext.cards.map((card, index) => {
                        return <PlayingCard card={card} key={index} index={index}/>
                    })}
                </Layer>
            </CardTableProvider>
        </Stage>);
}

export default CardTable;
