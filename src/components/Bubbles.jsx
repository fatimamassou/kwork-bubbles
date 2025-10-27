import { useEffect, useRef } from "react";
import "../style/Bubbles.css";
import cardData from "../data/cardData";

// Store positions globally so they stay fixed
let bubblePositions = [];

function BubblesPage() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const texts = cardData.map((card) => card.title);
    const random = (min, max) => Math.random() * (max - min) + min;

    // Collision detection
    const collides = (x, y, size, others) => {
      for (const o of others) {
        const dx = x - o.x;
        const dy = y - o.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < size / 2 + o.size / 2 + 30) return true; // 30px spacing
      }
      return false;
    };

    const rect = stage.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate bubble positions only once (first render)
    if (bubblePositions.length === 0) {
      const placed = [];

      texts.forEach((t) => {
        const minSize = 80;
        const maxSize = 160;
        const size = Math.min(maxSize, Math.max(minSize, t.length * 8 + 40));

        let x, y, tries = 0;
        const maxTries = 3000;

        // try to place without touching others
        do {
          x = random(size / 2, width - size / 2);
          y = random(size / 2, height - size / 2);
          tries++;
          if (tries > maxTries) break;
        } while (collides(x, y, size, placed));

        placed.push({ x, y, size });
      });

      bubblePositions = placed; // Save fixed positions
    }

    // Create the bubbles dynamically
    stage.innerHTML = ""; // clear before adding

    texts.forEach((t, i) => {
      const { x, y, size } = bubblePositions[i];
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.textContent = t;

      const bgList = [
        "var(--bubble1)", "var(--bubble2)", "var(--bubble3)",
        "var(--bubble4)", "var(--bubble5)", "var(--bubble6)",
        "var(--bubble7)", "var(--bubble8)"
      ];
      const randomBg = bgList[Math.floor(Math.random() * bgList.length)];

      bubble.style.background = randomBg;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${x - size / 2}px`;
      bubble.style.top = `${y - size / 2}px`;

      // Floating animation
      const dur = random(5, 10);
      const delay = random(0, 2);
      bubble.style.animationDuration = `${dur}s`;
      bubble.style.animationDelay = `${delay}s`;

      // Add click to go to details
      bubble.addEventListener("click", () => {
        window.location.href = `/details/${cardData[i].id}`;
      });

      stage.appendChild(bubble);
    });
  }, []);

  return (
      <main className="bubbles-container" ref={stageRef}></main>
  );
}

export default BubblesPage;
