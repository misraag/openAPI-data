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
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WorldNews" element={<WorldNews />} />
        <Route path="/Politics" element={<Politics />} />
        <Route path="/Sports" element={<Sports />} />
        <Route path="/Technology" element={<Technology />} />
        <Route path="/Entertainment" element={<Entertainment />} />
        <Route path="/National" element={<National />} />
        <Route path="/state/:stateName" element={<StateNews />} />
      </Routes>
    </>
  );
}

export default App;
