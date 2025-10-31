import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BubblesPage from "./components/Bubbles";
import DetailsPage from "./components/Details";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPopup from "./components/SearchPopup"; // ✅
import { useState } from "react";
import "./style/Bubbles.css";
import "./style/SearchPopup.css"; // ✅ create this file below

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      <div className="bubbles-page">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        <SearchPopup
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <Routes>
          <Route path="/" element={<BubblesPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
