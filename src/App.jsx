import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="container">
      <button onClick={() => setCount((c) => c + 1)}>Add</button>
      <div className="calculators">
        {Array.from(Array(count).keys()).map((idx) => {
          return <Calculator key={idx} idx={idx} />;
        })}
      </div>
    </div>
  );
}

export default App;
