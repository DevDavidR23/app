import { useState } from "react";

// ── Single Flashcard with flip ──────────────────────────────────────────────
function Flashcard({ card, color, gradient, lightBg, flipped, onFlip }) {
  return (
    <div
      className="w-full cursor-pointer select-none"
      style={{ perspective: "1000px", height: 220 }}
      onClick={onFlip}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,.08)]"
          style={{ background: lightBg, backfaceVisibility: "hidden" }}
        >
          <span className="text-6xl">{card.front.emoji}</span>
          <span
            className="font-['Lora',serif] text-3xl font-bold"
            style={{ color }}
          >
            {card.front.word}
          </span>
          <span className="text-slate-400 text-xs mt-1">Toca para ver el significado</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,.1)]"
          style={{
            background: gradient,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="text-5xl">{card.front.emoji}</span>
          <span className="font-['Lora',serif] text-3xl font-bold text-white">
            {card.back.word}
          </span>
          <span className="text-white/70 text-sm italic mt-1 px-6 text-center">
            "{card.back.example}"
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Deck navigator ─────────────────────────────────────────────────────────
// Props:
//   cards: flashcards[] from data file
//   color, gradient, lightBg: from activityMeta

export default function FlashcardDeck({ cards, color, gradient, lightBg }) {
  const [index, setIndex]   = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen]     = useState(new Set());

  const card = cards[index];
  const total = cards.length;

  const goTo = (next) => {
    setIndex(next);
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped((f) => !f);
    setSeen((s) => new Set([...s, index]));
  };

  const handlePrev = () => { if (index > 0) goTo(index - 1); };
  const handleNext = () => { if (index < total - 1) goTo(index + 1); };

  return (
    <div>
      {/* Dots progress */}
      <div className="flex items-center justify-center gap-1.5 mb-5">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-200"
            style={{
              width:  i === index ? 20 : 8,
              height: 8,
              background: seen.has(i)
                ? color
                : i === index
                ? gradient
                : "#e2e8f0",
            }}
          />
        ))}
      </div>

      {/* Card */}
      <Flashcard
        card={card}
        color={color}
        gradient={gradient}
        lightBg={lightBg}
        flipped={flipped}
        onFlip={handleFlip}
      />

      {/* Nav */}
      <div className="flex items-center justify-between mt-5">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ borderColor: `${color}33`, color }}
        >
          ← Anterior
        </button>

        <span className="text-xs text-slate-400 font-semibold">
          {seen.size} / {total} vistas
        </span>

        <button
          onClick={handleNext}
          disabled={index === total - 1}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: gradient }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}