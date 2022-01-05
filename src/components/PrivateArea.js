import React from "react";
import {Rect} from "react-konva";


function PrivateArea(props) {
    function onDragMove(e) {
    }

    function onDragEnd(e) {
    }

    function onDoubleClick(e) {
    }

    return (
        <Rect
            x={props.x} y={props.y} width={200} height={120} fill={props.color} opacity={0.2}
            draggable onDblClick={onDoubleClick} onMouseDown={onDragMove} onDragEnd={onDragEnd} onDragMove={onDragMove}/>
    );

}

export default PrivateArea;