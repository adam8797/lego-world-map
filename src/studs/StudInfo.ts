import Stud from "./Stud";

export function StudColor(s: Stud)
{
    switch (s)
    {
        case Stud.None:
            return "#000000";

        case Stud.BrightGreen:
            return "#92CD62";
            
        case Stud.BrightLightOrange:
            return "#ECC14E";
            
        case Stud.Coral:
            return "#DE779A";
            
        case Stud.DarkBlue:
            return "#586E94";
            
        case Stud.DarkTurquoise:
            return "#67ABA2";
            
        case Stud.Lime:
            return "#C3E467";
            
        case Stud.MediumAzure:
            return "#8DB9D4";
            
        case Stud.Orange:
            return "#E29E47";
            
        case Stud.Tan:
            return "#D1CB8F";
            
        case Stud.White:
            return "#FFFFFF";   
    }
}

export function StudCount(s: Stud)
{
    switch (s) {
        case Stud.None:
            return 999999;

        case Stud.BrightGreen:
            return 601;
            
        case Stud.BrightLightOrange:
            return 599;
            
        case Stud.Coral:
            return 601;
            
        case Stud.DarkBlue:
            return 393;
            
        case Stud.DarkTurquoise:
            return 1879;
            
        case Stud.Lime:
            return 1060;
            
        case Stud.MediumAzure:
            return 1607;
            
        case Stud.Orange:
            return 601;
            
        case Stud.Tan:
            return 725;
            
        case Stud.White:
            return 3064;
    }
}