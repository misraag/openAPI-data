import { useState } from "react";
import Navbar from "./components/Navbar";
import Entertainment from "./pages/Entertainment";
import Home from "./pages/Home/Home";
import National from "./pages/National";
import Politics from "./pages/Politics";
import Sports from "./pages/Sports";
import StateNews from "./pages/StateNews";
import Technology from "./pages/Technology";
import WorldNews from "./pages/WorldNews";
import { Routes, Route } from "react-router-dom";

function App() {

  let [darkMode, setDarkMode] = useState(false)

  return (
    <div style={{backgroundColor: darkMode ? "black":"white"}}>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode}/>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode}/>} />
        <Route path="/WorldNews" element={<WorldNews darkMode={darkMode}/>} />
        <Route path="/Politics" element={<Politics darkMode={darkMode}/>} />
        <Route path="/Sports" element={<Sports darkMode={darkMode}/>} />
        <Route path="/Technology" element={<Technology darkMode={darkMode}/>} />
        <Route path="/Entertainment" element={<Entertainment darkMode={darkMode}/>} />
        <Route path="/National" element={<National darkMode={darkMode}/>} />
        <Route path="/state/:stateName" element={<StateNews darkMode={darkMode}/>} />
      </Routes>
    </div>
  );
}

export default App;
