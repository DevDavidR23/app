import { useState } from "react";

function CompletedState({ color }) {
  return (
    <div className="mt-4">
      <div className="h-[3px] rounded-full mb-2" style={{ background: color }} />
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: color }}
        >
          ✓
        </div>
        <span className="text-sm font-bold" style={{ color }}>
          Completada
        </span>
      </div>
    </div>
  );
}

function StartButton({ color, gradient, locked, goToActivity }) {
  const [hovered, setHovered] = useState(false);

  if (locked) {
    return (
      <div className="mt-4 flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-100 text-slate-400 text-sm font-bold cursor-not-allowed">
        <span>🔒 Bloqueada</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => goToActivity() }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mt-4 w-full flex items-center justify-between py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 border"
      style={{
        background: hovered ? gradient : "transparent",
        color: hovered ? "#fff" : color,
        borderColor: `${color}33`,
        boxShadow: hovered ? `0 4px 14px ${color}33` : "none",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">▶</span>
        <span>Comenzar</span>
      </div>
      <span className="text-base">›</span>
    </button>
  );
}

export default function ActivityCard({ activity, periodColor, periodGradient, index, goToActivity }) {
  const isCompleted = activity.status === "completed";
  const isLocked    = activity.status === "locked";

  return (
    <div
      className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ animation: `fadeSlideUp .4s ${index * 0.06}s both` }}
    >
      <div className="flex gap-4">
        {/* Number badge */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5"
          style={{ background: periodGradient }}
        >
          {activity.number}
        </div>

        {/* Illustration */}
        <div
          className="w-[88px] h-[88px] rounded-xl flex items-center justify-center text-[2.6rem] shrink-0"
          style={{ background: activity.emojiBg }}
        >
          {activity.emoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Topic chip */}
          <span
            className="inline-block text-[0.65rem] font-bold px-2 py-0.5 rounded-full mb-1.5 border"
            style={{
              color: activity.topicColor,
              background: activity.topicBg,
              borderColor: `${activity.topicColor}22`,
            }}
          >
            {activity.topic}
          </span>

          <h3 className="font-['Lora',serif] text-slate-800 text-[1rem] leading-tight mb-1">
            {activity.title}
          </h3>

          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
            {activity.description}
          </p>
        </div>
      </div>

      {/* CTA */}
      {isCompleted ? (
        <CompletedState color={periodColor} />
      ) : (
        <StartButton color={periodColor} gradient={periodGradient} locked={isLocked} goToActivity={goToActivity} />
      )}
    </div>
  );
}