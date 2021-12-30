import { useState } from "react";
import logo from "./react.svg";
import img01 from './assets/01.jpg';
import img02 from './assets/02.jpg';
import "./App.css";
import "./App.scss";

function App() {
  const [name, setName] = useState("");
  return (
    <div className="app">
      <img src={img01} />
	  <img src={img02} />
      <h1>
        Hola React
        <img src={logo} width="25" alt="react logo" />
      </h1>
      <div>
        <label htmlFor="name">Nombre: </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
