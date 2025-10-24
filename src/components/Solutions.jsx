import React from "react";
import cardData from "../data/cardData";
import Logo from "./Logo";
import Footer from "./Footer";
import "../style/Solutions.css";

function Solutions() {
  return (
    <div className="solutions-page">
      <header className="">
        <Logo />
        <h2 className="header-title">Our Top Solutions</h2>
      </header>

      <main className="cards-container">
        {cardData.map((card) => (
          <div key={card.id} className="card">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-subtitle">{card.subtitle}</p>
            <p className="card-description">{card.description}</p>
            <div className="tags">
              {card.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default Solutions;
