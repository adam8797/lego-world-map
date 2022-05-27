import StudGrid from "./studs/StudGrid"
import React, { MutableRefObject, useRef, useEffect, createContext, useState } from 'react'
import Stud from "./studs/Stud";
import * as StudInfo from "./studs/StudInfo";
import Point from "./Point";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";

interface IStudGridEditorProps {
    grid: StudGrid
}

export default function StudGridEditor(props: IStudGridEditorProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [lastChange, setLastChange] = useState<Point>(new Point(0, 0));

    function drawStud(ctx: CanvasRenderingContext2D, x: number, y: number, s: Stud) {
        ctx.fillStyle = StudInfo.StudColor(s);
        ctx.beginPath();
        ctx.arc((x * 16) + 8, (y * 16) + 8, 7.5, 0, 2 * Math.PI);
        ctx.fill();
    }

    function getCursorPosition(canvas: HTMLCanvasElement, event: React.MouseEvent): Point {
        var rect = canvas.getBoundingClientRect(); // abs. size of element
        var scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for x
        var scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
        return new Point((event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY);
    }
    
    function nextStud(s: Stud): Stud {
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
        let newStud = nextStud(currentStud);
        props.grid.setStud(studPoint, newStud);
    }

    function redraw() {
        const canvas = canvasRef.current;
        if (canvas === null)
            return;

        const ctx = canvas.getContext('2d');
        if (ctx === null)
            return;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        for (let x = 0; x < props.grid.studWidth; x++) {
            for (let y = 0; y < props.grid.studHeight; y++) {
                drawStud(ctx, x, y, props.grid.getStud(new Point(x, y)));
            }
        }
    }

    useEffect(redraw)

    return (
        <Container>
            <Row>
                <Col>
                    <ProgressBar label="BrightGreen" now={props.grid.studReport.get(Stud.BrightGreen)} max={StudInfo.StudCount(Stud.BrightGreen)} />
                </Col>
                <Col>
                    <ProgressBar label="BrightLightOrange" now={props.grid.studReport.get(Stud.BrightLightOrange)} max={StudInfo.StudCount(Stud.BrightLightOrange)} />
                </Col>
                <Col>
                    <ProgressBar label="Coral" now={props.grid.studReport.get(Stud.Coral)} max={StudInfo.StudCount(Stud.Coral)} />
                </Col>
                <Col>
                    <ProgressBar label="DarkBlue" now={props.grid.studReport.get(Stud.DarkBlue)} max={StudInfo.StudCount(Stud.DarkBlue)} />
                </Col>
                <Col>
                    <ProgressBar label="DarkTurquoise" now={props.grid.studReport.get(Stud.DarkTurquoise)} max={StudInfo.StudCount(Stud.DarkTurquoise)} />
                </Col>
                <Col>
                    <ProgressBar label="Lime" now={props.grid.studReport.get(Stud.Lime)} max={StudInfo.StudCount(Stud.Lime)} />
                </Col>
                <Col>
                    <ProgressBar label="MediumAzure" now={props.grid.studReport.get(Stud.MediumAzure)} max={StudInfo.StudCount(Stud.MediumAzure)} />
                </Col>
                <Col>
                    <ProgressBar label="Orange" now={props.grid.studReport.get(Stud.Orange)} max={StudInfo.StudCount(Stud.Orange)} />
                </Col>
                <Col>
                    <ProgressBar label="Tan" now={props.grid.studReport.get(Stud.Tan)} max={StudInfo.StudCount(Stud.Tan)} />
                </Col>
                <Col>
                    <ProgressBar label="White" now={props.grid.studReport.get(Stud.White)} max={StudInfo.StudCount(Stud.White)} />
                </Col>
            </Row>
            <Row>
                <canvas width={128 * 16} height={80 * 16} ref={canvasRef} onMouseMove={onCanvasMove} onClick={onCanvasClick} {...props} />
            </Row>
        </Container>
    );
}