import { useNavigate } from "react-router-dom";
import { periods } from "../../data/Periods";
import PeriodCard from "../../components/activity/Periodcard";

const TOTAL_ACTIVITIES = periods.reduce((sum, p) => sum + p.activities, 0);
const TOTAL_COMPLETED = periods.reduce((sum, p) => sum + p.completed, 0);

export default function Activity() {
  const navigate = useNavigate();

  const handleGoStats = (periodId) => {
    navigate(`/stats/${periodId}`);
  };
  const handleGoActivities = (periodId) => {
    navigate(`/cursos/${periodId}`);
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .page-anim { animation: fadeIn .5s ease both; }
      `}</style>

      <div
        className="page-anim min-h-screen pb-12 font-['Nunito',sans-serif]"
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

          <div className="flex items-center gap-2">
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#2558f4] to-[#5b82f6] flex items-center justify-center text-white text-sm font-bold">
              D
            </div>
            <span className="text-sm text-slate-500 font-semibold">David</span>
          </div>
        </nav>

        {/* ── Header ── */}
        <header className="max-w-[1100px] mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="bg-[#eef2ff] text-[#2558f4] text-[0.72rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-[#c7d9ff]">
                📖 Grado Primero · Inglés
              </span>
              <h1 className="font-['Lora',serif] text-slate-800 text-[clamp(1.6rem,3vw,2.1rem)] mt-2.5 leading-tight">
                Mis Períodos Académicos
              </h1>
              <p className="text-slate-400 text-sm mt-1.5">
                Selecciona un período para explorar sus actividades y ejercicios.
              </p>
            </div>

            {/* Overall progress pill */}
            <div className="bg-white rounded-2xl px-5 py-3 shadow-[0_2px_12px_rgba(0,0,0,.07)] flex items-center gap-3 shrink-0">
              <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#eef2ff] to-[#dbeafe] flex items-center justify-center text-[1.3rem]">
                🏆
              </div>
              <div>
                <div className="text-[0.72rem] text-slate-400 font-semibold uppercase tracking-wide">
                  Progreso General
                </div>
                <div className="font-['Lora',serif] text-[1.25rem] text-slate-800 leading-none">
                  {TOTAL_COMPLETED}{" "}
                  <span className="font-['Nunito',sans-serif] text-sm text-slate-400 font-normal">
                    / {TOTAL_ACTIVITIES} actividades
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Period Cards Grid ── */}
        <main className="max-w-[1100px] mx-auto px-6 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
          {periods.map((period, index, ) => (
            
            <PeriodCard
              onGoActivities={handleGoActivities}
              key={period.id}
              period={period}
              onGoStats={handleGoStats}
              index={index}
            />
          ))}
        </main>

        {/* ── Info banner ── */}
        <footer className="max-w-[1100px] mx-auto px-6 mt-8">
          <div className="bg-white rounded-[18px] px-6 py-4 flex items-center gap-3 shadow-[0_2px_12px_rgba(0,0,0,.05)] border border-slate-200">
            <span className="text-[1.3rem]">💡</span>
            <p className="text-slate-400 text-sm leading-relaxed">
              Los períodos se desbloquean de forma progresiva.{" "}
              <strong className="text-[#2558f4]">Completa el período anterior</strong>{" "}
              para acceder al siguiente. Usa el botón <strong>📊</strong> para ver tus
              estadísticas por período.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}