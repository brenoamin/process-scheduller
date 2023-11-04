import "./App.css";
import { NewButton } from "./components/NewButton";
import { ProcessBox } from "./components/ProcessBox";

function App() {
  return (
    <div className="main-section">
      <header className="background-image">
        <h1 className="main-section-title"> SCHEDULLER SYSTEM</h1>
      </header>
      <div className="process-section">
        <NewButton />
        <ProcessBox />
      </div>
    </div>
  );
}

export default App;
