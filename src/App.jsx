import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Movieprovider } from "./contexts/MovieContexts";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Movieprovider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </Movieprovider>
  );
}

export default App;
