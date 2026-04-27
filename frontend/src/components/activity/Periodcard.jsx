import { useState } from "react";
import ProgressBar from "./ProgressBar";
import StatusBadge from "./StatusBadge";

export default function PeriodCard({ period, onGoStats, index }) {
  const [hovered, setHovered] = useState(false);
  const locked = period.status === "próximo";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-3xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(.22,.68,0,1.1)]"
      style={{
        boxShadow: hovered
          ? `0 20px 60px ${period.color}22, 0 4px 16px rgba(0,0,0,.08)`
          : "0 4px 24px rgba(0,0,0,.07)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        animation: `fadeSlideUp .5s ${index * 0.1}s both`,
        opacity: locked ? 0.82 : 1,
        
      }}
    >
      {/* ── Header band ── */}
      <div
        className="px-6 pt-5 pb-5 relative overflow-hidden"
        style={{ background: period.gradient }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,.18) 1px,transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        {/* Blob decoration */}
        <div className="absolute w-24 h-24 rounded-full -top-10 -right-8 pointer-events-none bg-white/[.08]" />

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="text-white/65 text-[0.72rem] font-semibold tracking-widest uppercase">
              {period.dateRange}
            </span>
            <h2 className="font-['Lora',serif] text-white text-[1.3rem] mt-0.5 leading-tight">
              {period.title}
            </h2>
          </div>

          <div
            className="w-[46px] h-[46px] rounded-[14px] text-[1.4rem] flex items-center justify-center shrink-0 border border-white/25"
            style={{ background: "rgba(255,255,255,.2)", backdropFilter: "blur(8px)" }}
          >
            {period.emoji}
          </div>
        </div>

        <div className="relative z-10 mt-3">
          <StatusBadge status={period.status} />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-6 pt-5 pb-6">
        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-4">
          {period.description}
        </p>

        {/* Topic chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {period.topics.map((topic) => (
            <span
              key={topic}
              className="text-[0.72rem] font-semibold px-2.5 py-1 rounded-full border"
              style={{
                background: period.lightBg,
                color: period.color,
                borderColor: `${period.color}22`,
              }}
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <ProgressBar total={period.activities} done={period.completed} color={period.color} />

        {/* Divider */}
        <div className="h-px bg-slate-100 my-5" />

        {/* CTA row */}
        <div className="flex gap-2.5">
          {/* Activities button */}
          <button
            disabled={locked}
            className={`flex-1 py-2.5 px-3 rounded-xl font-['Nunito',sans-serif] font-bold text-sm transition-[opacity,transform] duration-200
              ${locked ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "text-white cursor-pointer"}`}
            style={
              locked
                ? {}
                : {
                    background: period.gradient,
                    boxShadow: `0 4px 14px ${period.color}44`,
                  }
            }
            onMouseEnter={(e) => {
              if (!locked) e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {locked ? "🔒 Bloqueado" : "📚 Ver Actividades"}
          </button>

          {/* Stats button */}
          <button
            onClick={() => onGoStats(period.id)}
            title="Ver estadísticas"
            className="w-[42px] h-[42px] shrink-0 rounded-xl text-base flex items-center justify-center cursor-pointer border transition-[background,color,transform] duration-200"
            style={{
              background: period.lightBg,
              color: period.color,
              borderColor: `${period.color}33`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = period.color;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = period.lightBg;
              e.currentTarget.style.color = period.color;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            📊
          </button>
        </div>
      </div>
    </div>
  );
} // cambio