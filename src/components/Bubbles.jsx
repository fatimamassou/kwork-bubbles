import React, { useEffect, useRef } from "react";
import "../style/Bubbles.css";
import cardData from "../data/cardData";

function BubblesPage() {
  const stageRef = useRef(null);

useEffect(() => {
  const stage = stageRef.current;
  stage.innerHTML = ""; // clear previous bubbles

  const texts = cardData.map(card => card.title);
  const random = (min, max) => Math.random() * (max - min) + min;

  const collides = (x, y, size, others) => {
    for (const o of others) {
      const dx = x - o.x;
      const dy = y - o.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < size / 2 + o.size / 2 + 10) return true;
    }
    return false;
  };

  const placed = [];
  const rect = stage.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  texts.forEach((t) => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = t;

    const minSize = 70;
    const maxSize = 160;
    const size = Math.min(maxSize, Math.max(minSize, t.length * 8 + 40));
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    let x, y, tries = 0;
    const maxTries = 1000;

    do {
      // Use a "spread" factor to avoid clustering
      x = random(size / 2, width - size / 2);
      y = random(size / 2, height - size / 2);

      // Slightly bias towards center to avoid sticking to edges
      x += (width / 2 - x) * 0.1;
      y += (height / 2 - y) * 0.1;

      tries++;
      if (tries > maxTries) break;
    } while (collides(x, y, size, placed));

    placed.push({ x, y, size });

    bubble.style.left = `${x - size / 2}px`;
    bubble.style.top = `${y - size / 2}px`;

    const dur = random(5, 10);
    const delay = random(-5, 0);
    bubble.style.animationDuration = `${dur}s`;
    bubble.style.animationDelay = `${delay}s`;

    stage.appendChild(bubble);
  });
}, []);



  return (
    <div className="bubbles-page">
      {/* Header */}
      <header className="header">
        <img src="/favicon.png" alt="logo" className="logo" />
        <h1 className="company-name">JWORK</h1>
      </header>

      {/* Bubbles Area */}
      <main className="bubbles-container" ref={stageRef}></main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="contact-info">
            <p>+212 (0) 662 098 864</p>
            <span className="separator">|</span>
            <p>+212 (0) 525 205 900</p>
            <span className="separator">|</span>
            <p>contact@jway.ma</p>
          </div>
          <p className="copyright">© 2025 JWORK — Tous droits réservés</p>
        </div>
      </footer>

    </div>
  );
}

export default BubblesPage;
