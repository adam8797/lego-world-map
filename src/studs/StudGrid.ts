import Point from "../Point";
import { combineMaps, enumKeys } from "../util";
import Stud from "./Stud";
import Tile from "./Tile"

export default class StudGrid
{
    readonly tiles: Tile[][]
    readonly tileSize: number;
    readonly width: number;
    readonly height: number;
    readonly studReport: Map<Stud, number>;

    constructor(w: number, h: number, tileSize: number)
    {
        this.tileSize = tileSize;
        this.width = w;
        this.height = h;

        this.studReport = new Map<Stud, number>();
        for (const value of enumKeys(Stud)) {
            this.studReport.set(Stud[value], 0);
        }

        this.tiles = [];
        for (let i = 0; i < w; i++)
        {
            this.tiles[i] = [];
            for (let j = 0; j < h; j++)
            {
                this.tiles[i][j] = new Tile(tileSize);
            }
        }
    }

    private incrementReport(s: Stud, i: number)
    {
        var current = this.studReport.get(s);
        if (current === undefined)
            this.studReport.set(s, i);
        else
            this.studReport.set(s, current + i);
    }

    get studWidth() {
        return this.width * this.tileSize;
    } 

    get studHeight() {
        return this.height * this.tileSize;
    }

    getTile(p: Point) : Tile
    {
        return this.tiles[p.x][p.y];
    }

    getTileForPosition(p: Point) : Tile
    {
        let tx = Math.floor(p.x / this.tileSize)
        let ty = Math.floor(p.y / this.tileSize)
        return this.tiles[tx][ty];
    }

    getStud(p: Point) : Stud
    {
        var tile = this.getTileForPosition(p);
        var localx = p.x % this.tileSize;
        var localy = p.y % this.tileSize;
        return tile.getStud(new Point(localx, localy));
    }

    setStud(p: Point, s: Stud)
    {
        var tile = this.getTileForPosition(p);
        var local = new Point(p.x % this.tileSize, p.y % this.tileSize)
        var current = tile.getStud(local);
        if (current !== Stud.None)
            this.incrementReport(current, -1)
        this.incrementReport(s, 1);
        tile.setStud(local, s);
    }

    gatherStudReport() : Map<Stud, number>
    {
        var report = new Map<Stud, number>();
        for (let row of this.tiles)
        {
            for (let t of row)
            {
                report = combineMaps(report, t.studReport(), (x, y) => x + y);
            }
        }
        return report;
    }
}