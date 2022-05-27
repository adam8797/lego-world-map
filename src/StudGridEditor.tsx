import StudGrid from "./studs/StudGrid"
import React, { MutableRefObject, useRef, useEffect, createContext, useState } from 'react'
import Stud from "./studs/Stud";
import * as StudInfo from "./studs/StudInfo";
import Point from "./Point";

interface IStudGridEditorProps
{
    grid: StudGrid
}

export default function StudGridEditor(props: IStudGridEditorProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [lastChange, setLastChange] = useState<Point>(new Point(0, 0));

    function drawStud(ctx: CanvasRenderingContext2D, x: number, y: number, s: Stud)
    {
        ctx.fillStyle = StudInfo.StudColor(s);
        ctx.beginPath();
        ctx.arc((x * 16) + 8, (y * 16) + 8, 7.5, 0, 2 * Math.PI);
        ctx.fill();
    }

    function getCursorPosition(canvas: HTMLCanvasElement, event: React.MouseEvent): Point {
        const rect = canvas.getBoundingClientRect()
        const x = Math.floor(event.clientX - rect.left)
        const y = Math.floor(event.clientY - rect.top)
        return new Point(x, y);
    }

    function nextStud(s: Stud): Stud
    {
        if (s === Stud.White)
            return Stud.None;
        return s + 1;
    }

    function onCanvasClick(e: React.MouseEvent) {
        
    }

    function onCanvasMove(e: React.MouseEvent) {
        if (canvasRef.current === null)
            return;

        if (e.buttons !== 1)
            return;

        let point = getCursorPosition(canvasRef.current, e);
        let studPoint = new Point(point.x / 16, point.y / 16);
        if (studPoint.x == lastChange.x && studPoint.y == lastChange.y)
            return;
        setLastChange(studPoint);
        let currentStud = props.grid.getStud(studPoint);
        let newStud =  nextStud(currentStud);
        props.grid.setStud(studPoint, newStud);
        redraw();
    }

    function redraw()
    {
        const canvas = canvasRef.current;
        if (canvas === null)
            return;

        const ctx = canvas.getContext('2d');
        if (ctx === null)
            return;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        for (let x = 0; x < props.grid.studWidth; x++)
        {
            for (let y = 0; y < props.grid.studHeight; y++)
            {
                drawStud(ctx, x, y, props.grid.getStud(new Point(x, y)));
            }
        }
    }
      

    useEffect(redraw, [ props.grid ])

    return (
        <div>
            <div>
                <span>Lime Greens</span>
                <span>{props.grid.studReport().get(Stud.BrightGreen)}</span>
            </div>
            <canvas width={128 * 16} height={80 * 16} ref={canvasRef} onMouseMove={onCanvasMove} onClick={onCanvasClick} {...props}/>
        </div>
    );
}