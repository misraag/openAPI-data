import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import CategoryNews from "./pages/CategoryNews";

function App() {

  let [darkMode, setDarkMode] = useState(false)

  return (
    <div style={{backgroundColor: darkMode ? "black":"white"}}>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode}/>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode}/>} />
        <Route path="/:category" element={<CategoryNews darkMode={darkMode} />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
