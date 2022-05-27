import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import StudGrid from './studs/StudGrid'
import StudGridEditor from './StudGridEditor'
import Stud from './studs/Stud'
import Point from './Point'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  var grid = new StudGrid(8, 5, 16);

  grid.setStud(new Point(0, 0), Stud.BrightGreen);
  grid.setStud(new Point(0, 1), Stud.BrightLightOrange);
  grid.setStud(new Point(1, 0), Stud.BrightLightOrange);
  grid.setStud(new Point(0, 2), Stud.Coral);
  grid.setStud(new Point(1, 1), Stud.Coral);
  grid.setStud(new Point(2, 0), Stud.Coral);

  return (
    <div className="App">
      <StudGridEditor grid={grid} />
    </div>
  )
}

export default App
