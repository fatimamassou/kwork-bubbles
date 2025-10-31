import { useEffect, useRef } from "react";
import "../style/Bubbles.css";
import cardData from "../data/cardData";

let bubblePositions = [];

function BubblesPage() {
  const stageRef = useRef(null);

  const getColsAndSizes = () => {
    const width = window.innerWidth;
    let cols, minSize, maxSize, fontSize;

    if (width <= 340) {
      cols = 4;
      minSize = 10;
      maxSize = 60;
      fontSize = "0.7rem";
    }else if (width <= 460) {
      cols = 4;
      minSize = 10;
      maxSize = 65;
      fontSize = "0.8rem";
    }else if (width <= 480) {
      cols = 6;
      minSize = 10;
      maxSize = 50;
      fontSize = "0.6rem";
    } else if (width <= 668) {
      cols = 6;
      minSize = 10;
      maxSize = 70;
      fontSize = "0.7rem";
    } else if (width <= 768) {
      cols = 6;
      minSize = 35;
      maxSize = 90;
      fontSize = "0.9rem";
    } else if (width <= 1279) {
      cols = 6;
      minSize = 60;
      maxSize = 100;
      fontSize = "1rem";
    } else if (width <= 1380) {
      cols = 6;
      minSize = 100;
      maxSize = 140;
      fontSize = "1.4rem";
    } else if (width <= 1580) {
      cols = 6;
      minSize = 140;
      maxSize = 200;
      fontSize = "1.6rem";
    } else if (width <= 2180) {
      cols = 6;
      minSize = 160;
      maxSize = 280;
      fontSize = "1.6rem";
    } else if (width <= 2899) {
      cols = 6;
      minSize = 280;
      maxSize = 360;
      fontSize = "2.5rem";
    } else {
      cols = 7;
      minSize = 400;
      maxSize = 480;
      fontSize = "4.2rem";
    }

    return { cols, minSize, maxSize, fontSize };
  };

  const renderBubbles = () => {
    const stage = stageRef.current;
    if (!stage) return;

    const texts = cardData.map((card) => card.title);
    const rect = stage.getBoundingClientRect();
    const { cols, minSize, maxSize, fontSize } = getColsAndSizes();
    const width = rect.width;
    const height = rect.height;
    const rows = Math.ceil(texts.length / cols);
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    bubblePositions = []; // reset when resizing

    const placed = texts.map((t, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const size = Math.min(maxSize, Math.max(minSize, t.length * 7 ));

      let x = col * cellWidth + cellWidth / 2;
      let y = row * cellHeight + cellHeight / 2;

      const jitterX = (Math.random() - 0.5) * cellWidth * 0.4;
      const jitterY = (Math.random() - 0.5) * cellHeight * 0.4;

      x += jitterX;
      y += jitterY;

      return { x, y, size };
    });

    bubblePositions = placed;

    // clear previous bubbles
    stage.innerHTML = "";

    const bgList = [
      "var(--bubble1)", "var(--bubble2)", "var(--bubble3)",
      "var(--bubble4)", "var(--bubble5)", "var(--bubble6)",
      "var(--bubble7)", "var(--bubble8)"
    ];

    texts.forEach((t, i) => {
      const { x, y, size } = bubblePositions[i];
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.textContent = t;

      bubble.style.background = bgList[Math.floor(Math.random() * bgList.length)];
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${x - size / 2}px`;
      bubble.style.top = `${y - size / 2}px`;
      bubble.style.fontSize = fontSize;

      const dur = 6 + Math.random() * 4;
      bubble.style.animationDuration = `${dur}s`;

      bubble.addEventListener("click", () => {
        window.location.href = `/details/${cardData[i].id}`;
      });

      stage.appendChild(bubble);
    });
  };

  useEffect(() => {
    renderBubbles();

    const handleResize = () => {
      renderBubbles();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <main className="bubbles-container" ref={stageRef}></main>;
}

export default BubblesPage;
