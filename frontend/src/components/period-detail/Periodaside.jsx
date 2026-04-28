
import StatusBadge from "../activity/Statusbadge";
import ProgressBar from "../activity/Progressbar";
import { asideNavLinks, skillsByPeriod } from "../../data/activities";

export default function PeriodAside({ period, totalActivities, completedActivities, activeNav = "actividades", onNavChange }) {
  const pct = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
  const skills = skillsByPeriod[period.id] ?? [];

  return (
    <aside className="w-[280px] shrink-0 flex flex-col gap-4 font-['Nunito',sans-serif]">

      {/* ── Period header card ── */}
      <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,.08)]">
        <div
          className="px-5 pt-5 pb-4 relative overflow-hidden"
          style={{ background: period.gradient }}
        >
          {/* dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle,rgba(255,255,255,.2) 1px,transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="absolute w-20 h-20 rounded-full -top-8 -right-6 bg-white/10 pointer-events-none" />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="text-white/60 text-[0.68rem] font-semibold tracking-widest uppercase">
                {period.dateRange}
              </span>
              <h2 className="font-['Lora',serif] text-white text-lg mt-0.5 leading-tight">
                {period.title}
              </h2>
            </div>
            <div
              className="w-11 h-11 rounded-[12px] text-2xl flex items-center justify-center shrink-0 border border-white/25"
              style={{ background: "rgba(255,255,255,.2)", backdropFilter: "blur(8px)" }}
            >
              {period.emoji}
            </div>
          </div>

          <div className="relative z-10 mt-3">
            <StatusBadge status={period.status} />
          </div>
        </div>
      </div>

      {/* ── Nav links ── */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,.06)] overflow-hidden">
        {asideNavLinks.map((link) => {
          const isActive = activeNav === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavChange?.(link.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors duration-150 text-left
                ${isActive
                  ? "text-[#2558f4] bg-[#eef2ff] border-l-[3px] border-[#2558f4]"
                  : "text-slate-500 hover:bg-slate-50 border-l-[3px] border-transparent"
                }`}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </button>
          );
        })}
      </div>

      {/* ── Progress box ── */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,.06)] p-5">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
          Tu progreso en el período
        </p>
        <div
          className="font-['Lora',serif] text-4xl font-bold mb-3"
          style={{ color: period.color }}
        >
          {pct}%
        </div>
        <ProgressBar
          total={totalActivities}
          done={completedActivities}
          color={period.color}
        />
        <p className="text-slate-400 text-xs mt-2">
          {completedActivities} de {totalActivities} actividades completadas
        </p>
      </div>

      {/* ── Habilidades ── */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,.06)] p-5">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-3">
          Habilidades que desarrollas
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.label}
              className="text-[0.7rem] font-bold px-2.5 py-1 rounded-full border"
              style={{
                color: skill.color,
                background: skill.bg,
                borderColor: `${skill.color}22`,
              }}
            >
              {skill.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Motivational footer ── */}
      <div
        className="rounded-2xl p-5 text-center"
        style={{ background: `${period.color}0f`, border: `1px solid ${period.color}22` }}
      >
        <div
          className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl shadow-sm"
          style={{ background: `${period.color}18` }}
        >
          🚀
        </div>
        <p className="font-['Lora',serif] text-sm font-bold text-slate-700 mb-1">
          ¡Sigue así!
        </p>
        <p className="text-slate-400 text-xs leading-relaxed">
          Cada actividad te acerca más a tus objetivos.
        </p>
      </div>
    </aside>
  );
}