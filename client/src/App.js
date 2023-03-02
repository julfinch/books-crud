import { BrowserRouter, Routes, Route } from "react-router-dom"
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import "./style.scss"

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
