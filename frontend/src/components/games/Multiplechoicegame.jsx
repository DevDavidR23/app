import { useState } from "react";

// ── Sub-components ──────────────────────────────────────────────────────────

function OptionButton({ label, state, onClick }) {
  // state: "idle" | "correct" | "wrong" | "disabled"
  const styles = {
    idle:     "border-slate-200 bg-white text-slate-700 hover:border-[var(--color)] hover:text-[var(--color)] hover:bg-[var(--lightBg)] cursor-pointer",
    correct:  "border-green-400 bg-green-50 text-green-700 font-bold",
    wrong:    "border-red-300 bg-red-50 text-red-500 line-through",
    disabled: "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed",
  };

  return (
    <button
      onClick={onClick}
      disabled={state === "disabled" || state === "correct" || state === "wrong"}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${styles[state]}`}
    >
      {state === "correct" && <span className="mr-2">✓</span>}
      {state === "wrong"   && <span className="mr-2">✗</span>}
      {label}
    </button>
  );
}

function ScoreScreen({ score, total, color, gradient, onRetry }) {
  const pct = Math.round((score / total) * 100);
  const msg = pct === 100 ? "¡Perfecto! 🎉" : pct >= 60 ? "¡Bien hecho! 👏" : "¡Sigue practicando! 💪";

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg"
        style={{ background: gradient }}
      >
        {pct === 100 ? "🏆" : pct >= 60 ? "⭐" : "💡"}
      </div>
      <h3 className="font-['Lora',serif] text-slate-800 text-2xl">{msg}</h3>
      <p className="text-slate-400 text-sm">
        Respondiste <strong style={{ color }}>{score}</strong> de <strong>{total}</strong> correctamente
      </p>
      <div
        className="text-5xl font-['Lora',serif] font-bold"
        style={{ color }}
      >
        {pct}%
      </div>
      <button
        onClick={onRetry}
        className="mt-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
        style={{ background: gradient }}
      >
        🔄 Intentar de nuevo
      </button>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
// Props:
//   questions: multipleChoiceQuestions[] from data file
//   color, gradient, lightBg: from activityMeta
//   onComplete(score, total): callback when game ends

export default function MultipleChoiceGame({ questions, color, gradient, lightBg, onComplete }) {
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState(null); // option label picked
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const isAnswered = selected !== null;

  const handleSelect = (option) => {
    if (isAnswered) return;
    const isCorrect = option === q.correct;
    setSelected(option);
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      onComplete?.(score + (selected === q.correct ? 1 : 0), questions.length);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const getOptionState = (option) => {
    if (!isAnswered) return "idle";
    if (option === q.correct) return "correct";
    if (option === selected)  return "wrong";
    return "disabled";
  };

  if (finished) {
    return (
      <ScoreScreen
        score={score}
        total={questions.length}
        color={color}
        gradient={gradient}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div style={{ "--color": color, "--lightBg": lightBg }}>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs text-slate-400 font-semibold shrink-0">
          {current + 1} / {questions.length}
        </span>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
              background: gradient,
            }}
          />
        </div>
        <span className="text-xs font-bold shrink-0" style={{ color }}>
          {score} ✓
        </span>
      </div>

      {/* Word card */}
      <div
        className="rounded-2xl py-10 flex flex-col items-center gap-3 mb-6"
        style={{ background: lightBg }}
      >
        <span className="text-6xl">{q.emoji}</span>
        <span
          className="font-['Lora',serif] text-4xl font-bold tracking-wide"
          style={{ color }}
        >
          {q.word}
        </span>
        <span className="text-slate-400 text-sm">¿Cuál es el significado?</span>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {q.options.map((opt) => (
          <OptionButton
            key={opt}
            label={opt}
            state={getOptionState(opt)}
            onClick={() => handleSelect(opt)}
          />
        ))}
      </div>

      {/* Feedback + Next */}
      {isAnswered && (
        <div className="flex items-center justify-between gap-4 mt-2">
          <p className={`text-sm font-bold ${selected === q.correct ? "text-green-600" : "text-red-500"}`}>
            {selected === q.correct
              ? "✅ ¡Correcto!"
              : `❌ Era: ${q.correct}`}
          </p>
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: gradient }}
          >
            {current + 1 >= questions.length ? "Ver resultados →" : "Siguiente →"}
          </button>
        </div>
      )}
    </div>
  );
}