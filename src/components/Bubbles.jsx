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
  const rect = stage.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  // grid settings
  const cols = 6; // how many bubbles per row
  const rows = Math.ceil(texts.length / cols);
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  if (bubblePositions.length === 0) {
    const placed = [];

    texts.forEach((t, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const minSize = 80;
      const maxSize = 160;
      const size = Math.min(maxSize, Math.max(minSize, t.length * 8 + 40));

      // base position
      let x = col * cellWidth + cellWidth / 2;
      let y = row * cellHeight + cellHeight / 2;

      // add some random "organic" offset so it doesn't look too grid-like
      const jitterX = (Math.random() - 0.5) * cellWidth * 0.4;
      const jitterY = (Math.random() - 0.5) * cellHeight * 0.4;

      x += jitterX;
      y += jitterY;

      placed.push({ x, y, size });
    });

    bubblePositions = placed;
  }

  // render bubbles
  stage.innerHTML = "";

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

    const dur = 6 + Math.random() * 4;
    bubble.style.animationDuration = `${dur}s`;

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
