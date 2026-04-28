import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { periods } from "../../data/Periods";
import { activitiesByPeriod } from "../../data/activities";
import { PeriodAside, ActivityCard } from "../../components/period-detail";

export default function PeriodDetail() {
  const { periodId } = useParams();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("actividades");

  // Resolve period data
  const period = periods.find((p) => p.id === Number(periodId));
  if (!period) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 font-['Nunito',sans-serif]">
        Período no encontrado.
      </div>
    );
  }

  const activities = activitiesByPeriod[period.id] ?? [];
  const completedActivities = activities.filter((a) => a.status === "completed").length;
  const totalActivities = activities.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .page-anim { animation: fadeIn .4s ease both; }
      `}</style>

      <div
        className="page-anim min-h-screen font-['Nunito',sans-serif]"
        style={{ background: "linear-gradient(145deg,#eef2ff 0%,#fdf4ef 100%)" }}
      >
        {/* ── Top Nav ── */}
        <nav className="bg-white shadow-[0_1px_12px_rgba(0,0,0,.06)] px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#2558f4] to-[#5b82f6] flex items-center justify-center text-white font-['Lora',serif] font-bold text-base">
              E
            </div>
            <span className="font-['Lora',serif] text-slate-800 text-[1.05rem]">
              Englis<span className="text-[#2558f4]">hub</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-slate-400 hover:text-slate-600 font-semibold transition-colors flex items-center gap-1.5"
            >
              ← Volver
            </button>
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#2558f4] to-[#5b82f6] flex items-center justify-center text-white text-sm font-bold">
              D
            </div>
            <span className="text-sm text-slate-500 font-semibold">David</span>
          </div>
        </nav>

        {/* ── Main layout ── */}
        <div className="max-w-[1200px] mx-auto px-6 py-8 flex gap-7 items-start">

          {/* ── Aside ── */}
          <PeriodAside
            period={period}
            totalActivities={totalActivities}
            completedActivities={completedActivities}
            activeNav={activeNav}
            onNavChange={setActiveNav}
          />

          {/* ── Content area ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Page header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-['Lora',serif] text-slate-800 text-[clamp(1.5rem,2.5vw,2rem)] leading-tight">
                  Actividades del {period.title}
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Completa las {totalActivities} actividades para dominar este período
                </p>
              </div>

              {/* Progress pill */}
              <div className="bg-white rounded-2xl px-5 py-3 shadow-[0_2px_12px_rgba(0,0,0,.07)] flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] flex items-center justify-center text-xl">
                  🏆
                </div>
                <div>
                  <div className="text-[0.68rem] text-slate-400 font-semibold uppercase tracking-wide">
                    Progreso General
                  </div>
                  <div className="font-['Lora',serif] text-xl text-slate-800 leading-none">
                    {completedActivities}{" "}
                    <span className="font-['Nunito',sans-serif] text-sm text-slate-400 font-normal">
                      / {totalActivities} actividades
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activities grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <ActivityCard
                  goToActivity={() => navigate(`/actividad/${activity.id}`)}
                  key={activity.id}
                  activity={activity}
                  periodColor={period.color}
                  periodGradient={period.gradient}
                  index={index}
                />
              ))}
            </div>

            {/* ── Bottom motivational banner ── */}
            <div
              className="rounded-2xl px-7 py-5 flex items-center justify-between gap-6 flex-wrap"
              style={{ background: period.gradient }}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">🏆</span>
                <div>
                  <p className="font-['Lora',serif] text-white text-lg leading-tight">
                    ¡Tú puedes lograrlo!
                  </p>
                  <p className="text-white/70 text-sm mt-0.5">
                    Completa todas las actividades y conviértete en un experto en inglés.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveNav("progreso")}
                className="shrink-0 bg-white font-['Nunito',sans-serif] font-bold text-sm px-5 py-2.5 rounded-xl transition-opacity hover:opacity-90 flex items-center gap-2"
                style={{ color: period.color }}
              >
                <span>📊</span> Ver mi progreso
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}