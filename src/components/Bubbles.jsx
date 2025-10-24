import React, { useEffect, useRef } from "react";
import "../style/Bubbles.css";
import cardData from "../data/cardData";

function Bubbles() {
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

      // size depends on text length
      const minSize = 70;
      const maxSize = 160;
      const size = Math.min(maxSize, Math.max(minSize, t.length * 8 + 40));
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      let x, y, tries = 0;
      do {
        x = random(size / 2, width - size / 2);
        y = random(size / 2, height - size / 2);
        tries++;
      } while (collides(x, y, size, placed) && tries < 200);

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

  return <div className="stage" ref={stageRef}></div>;
}

export default Bubbles;
