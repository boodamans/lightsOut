import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  // Define the number of rows, columns, and chance of lights starting on
  const nrows = 5; // You can adjust this as needed
  const ncols = 5; // You can adjust this as needed
  const chanceLightStartsOn = 0.25; // You can adjust this as needed

  return (
    <div className="App">
      <Board nrows={nrows} ncols={ncols} chanceLightStartsOn={chanceLightStartsOn} />
    </div>
  );
}

export default App;
