import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultipleChoiceGame from "../../components/games/Multiplechoicegame";
import FlashcardDeck      from "../../components/games/Flashcarddeck";
import {
  activityMeta,
  multipleChoiceQuestions,
  flashcards,
} from "../../data/game-colors-shapes";

const TABS = [
  { id: "flashcards", label: "Flashcards",  icon: "🃏" },
  { id: "quiz",       label: "Quiz",         icon: "🎯" },
];

export default function ActivityDetail() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("flashcards");
  const { color, gradient, lightBg, emoji, title, topic } = activityMeta;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
        .page-anim { animation: fadeIn .4s ease both; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>

      <div
        className="page-anim min-h-screen font-['Nunito',sans-serif]"
        style={{ background: "linear-gradient(145deg,#eef2ff 0%,#fdf4ef 100%)" }}
      >
        {/* ── Nav ── */}
        <nav className="bg-white shadow-[0_1px_12px_rgba(0,0,0,.06)] px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#2558f4] to-[#5b82f6] flex items-center justify-center text-white font-['Lora',serif] font-bold">
              E
            </div>
            <span className="font-['Lora',serif] text-slate-800 text-[1.05rem]">
              Englis<span className="text-[#2558f4]">hub</span>
            </span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-slate-400 hover:text-slate-600 font-semibold transition-colors flex items-center gap-1"
          >
            ← Volver
          </button>
        </nav>

        {/* ── Content ── */}
        <div className="max-w-[560px] mx-auto px-5 py-8 flex flex-col gap-5">

          {/* Header */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0"
              style={{ background: lightBg }}
            >
              {emoji}
            </div>
            <div>
              <span
                className="text-[0.68rem] font-bold uppercase tracking-widest"
                style={{ color }}
              >
                {topic}
              </span>
              <h1 className="font-['Lora',serif] text-slate-800 text-2xl leading-tight">
                {title}
              </h1>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="bg-white rounded-2xl p-1.5 flex gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,.06)]">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={
                  tab === t.id
                    ? { background: gradient, color: "#fff", boxShadow: `0 4px 12px ${color}33` }
                    : { color: "#94a3b8" }
                }
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Game panel */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,.07)]">
            {tab === "flashcards" ? (
              <>
                <h2 className="font-['Lora',serif] text-slate-800 text-lg mb-1">
                  Estudia las palabras
                </h2>
                <p className="text-slate-400 text-xs mb-5">
                  Toca cada tarjeta para ver su significado en español.
                </p>
                <FlashcardDeck
                  cards={flashcards}
                  color={color}
                  gradient={gradient}
                  lightBg={lightBg}
                />
              </>
            ) : (
              <>
                <h2 className="font-['Lora',serif] text-slate-800 text-lg mb-1">
                  Selecciona el significado
                </h2>
                <p className="text-slate-400 text-xs mb-5">
                  Elige la traducción correcta de cada palabra en inglés.
                </p>
                <MultipleChoiceGame
                  questions={multipleChoiceQuestions}
                  color={color}
                  gradient={gradient}
                  lightBg={lightBg}
                />
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}