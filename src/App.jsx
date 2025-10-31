import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BubblesPage from "./components/Bubbles";
import DetailsPage from "./components/Details";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style/Bubbles.css";
function App() {
  return (
    <div className="bubbles-page">
      <Header />
        <Router>
          <Routes>
            <Route path="/" element={<BubblesPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </Router>
      <Footer />
    </div>
  );
}

export default App;

