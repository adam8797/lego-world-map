export default class Point
{
    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
    }
}