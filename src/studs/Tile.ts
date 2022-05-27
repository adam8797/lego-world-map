import Point from "../Point";
import { enumKeys } from "../util";
import Stud from "./Stud";

export default class Tile
{
    size: number
    studs: Stud[][]

    constructor(size: number) {
        this.size = size;
        this.studs = [];
        for (let i = 0; i < size; i++)
        {
            this.studs[i] = []
            for (let j = 0; j < size; j++)
            {
                this.studs[i][j] = Stud.None;
            }
        }
    }

    getStud(p: Point): Stud
    {
        return this.studs[p.x][p.y];
    }

    setStud(p: Point, s: Stud)
    {
        this.studs[p.x][p.y] = s;
    }

    countStud(s: Stud): number
    {
        let count = 0;
        for (let i = 0; i < this.size; i++)
        {
            for (let j = 0; j < this.size; j++)
            {
                if (this.getStud(new Point(i, j)) == s)
                    count++;
            }
        }
        return count;
    }

    studReport() : Map<Stud, number>
    {
        let report = new Map<Stud, number>();


        for (let i = 0; i < this.size; i++)
        {
            for (let j = 0; j < this.size; j++)
            {
                let s = this.getStud(new Point(i, j));
                let c = report.get(s);
                if (c === undefined)
                    continue;
                report.set(s, c + 1);
            }
        }

        return report;
    }
}