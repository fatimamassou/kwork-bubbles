import React, { useEffect, useRef } from "react";
import "../style/Bubbles.css";
import cardData from "../data/cardData";
import { ReactTyped } from "react-typed";

// Store positions globally so they never change on re-render
let bubblePositions = [];

function BubblesPage() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    stage.innerHTML = ""; // clear previous bubbles
    const texts = cardData.map((card) => card.title);
    const random = (min, max) => Math.random() * (max - min) + min;

    // Check if a bubble collides with others
    const collides = (x, y, size, others) => {
      for (const o of others) {
        const dx = x - o.x;
        const dy = y - o.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < size / 2 + o.size / 2 + 20) return true; // 20px extra spacing
      }
      return false;
    };

    const rect = stage.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Only calculate positions once
    if (bubblePositions.length === 0) {
      const placed = [];

      texts.forEach((t) => {
        const minSize = 70;
        const maxSize = 160;
        const size = Math.min(maxSize, Math.max(minSize, t.length * 8 + 40));

        let x, y, tries = 0;
        const maxTries = 5000;

        do {
          x = random(size / 2, width - size / 2);
          y = random(size / 2, height - size / 2);
          tries++;
          if (tries > maxTries) {
            console.warn("Could not place bubble without collision");
            break;
          }
        } while (collides(x, y, size, placed));

        placed.push({ x, y, size });
      });

      bubblePositions = placed; // save globally
    }

    // Create bubbles with floating animation
    texts.forEach((t, i) => {
      const { x, y, size } = bubblePositions[i];

      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.textContent = t;
      const bgList = [
        "var(--bubble1)",
        "var(--bubble2)",
        "var(--bubble3)",
        "var(--bubble4)",
        "var(--bubble5)",
        "var(--bubble6)",
        "var(--bubble7)",
        "var(--bubble8)"
      ];
      const randomBg = bgList[Math.floor(Math.random() * bgList.length)];
      bubble.style.background = randomBg;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${x - size / 2}px`;
      bubble.style.top = `${y - size / 2}px`;

      // Floating animation
      const dur = random(6, 12);
      const delay = random(0, 3);
      bubble.style.animationDuration = `${dur}s`;
      bubble.style.animationDelay = `${delay}s`;

      stage.appendChild(bubble);
    });
  }, []);

  return (
    <div className="bubbles-page">
      <header className="header">
        <div className="header-left">
          <img src="/favicon.png" alt="logo" className="logo" />
          <h1 className="company-name">JWORK</h1>
        </div>
        <div className="header-right">
          <h1 className="solutions">
            <ReactTyped
              strings={["Nos Solutions", "Innovantes", "Adaptées à Vous"]}
              typeSpeed={80}
              backSpeed={50}
              backDelay={1500}
              showCursor={true}
              cursorChar="|"
              loop={true}
            />
          </h1>
        </div>
      </header>

      <main className="bubbles-container" ref={stageRef}></main>

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
