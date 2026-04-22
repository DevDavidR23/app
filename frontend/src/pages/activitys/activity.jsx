import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const periods = [
  {
    id: 1,
    number: "01",
    title: "Primer Período",
    dateRange: "Enero – Marzo",
    color: "#2558f4",
    gradient: "linear-gradient(135deg, #1d40b0 0%, #2c5cf6 100%)",
    lightBg: "#eef2ff",
    accent: "#5b82f6",
    emoji: "🌱",
    topics: ["Greetings & Farewells", "Colors & Shapes", "Numbers 1–10"],
    description:
      "El estudiante reconoce y usa saludos básicos en inglés, identifica colores y figuras geométricas simples, y cuenta del 1 al 10 de forma oral y escrita.",
    activities: 8,
    completed: 2,
    status: "en progreso",
  },
  {
    id: 2,
    number: "02",
    title: "Segundo Período",
    dateRange: "Abril – Junio",
    color: "#059669",
    gradient: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
    lightBg: "#ecfdf5",
    accent: "#34d399",
    emoji: "🌿",
    topics: ["Family Members", "Body Parts", "Classroom Objects"],
    description:
      "El estudiante nombra los miembros de su familia, identifica las partes del cuerpo y reconoce los objetos más comunes del salón de clases en inglés.",
    activities: 9,
    completed: 0,
    status: "próximo",
  },
  {
    id: 3,
    number: "03",
    title: "Tercer Período",
    dateRange: "Julio – Septiembre",
    color: "#d97706",
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
    lightBg: "#fffbeb",
    accent: "#fbbf24",
    emoji: "🌻",
    topics: ["Animals & Pets", "Food & Drinks", "My Home"],
    description:
      "El estudiante describe animales domésticos y salvajes, menciona alimentos y bebidas de su preferencia, y describe los espacios básicos de su hogar.",
    activities: 10,
    completed: 0,
    status: "próximo",
  },
  {
    id: 4,
    number: "04",
    title: "Cuarto Período",
    dateRange: "Octubre – Diciembre",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    lightBg: "#f5f3ff",
    accent: "#a78bfa",
    emoji: "🌟",
    topics: ["Actions & Verbs", "Weather & Seasons", "Short Sentences"],
    description:
      "El estudiante expresa acciones cotidianas con verbos básicos, describe el clima y las estaciones del año, y construye oraciones simples en inglés.",
    activities: 10,
    completed: 0,
    status: "próximo",
  },
];

function ProgressBar({ total, done, color }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.75rem', color:'#64748b', marginBottom:5 }}>
        <span>{done}/{total} actividades</span>
        <span style={{ fontWeight:700, color }}>{pct}%</span>
      </div>
      <div style={{ background:'#e2e8f0', borderRadius:99, height:7, overflow:'hidden' }}>
        <div style={{
          height:'100%', borderRadius:99,
          background: color,
          width: `${pct}%`,
          transition: 'width .8s cubic-bezier(.22,.68,0,1.1)',
          boxShadow: `0 0 8px ${color}55`
        }}/>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    "en progreso": { bg: '#dbeafe', text: '#1d4ed8', label: '⚡ En progreso' },
    "próximo":     { bg: '#f1f5f9', text: '#475569', label: '🔒 Próximo' },
    "completado":  { bg: '#dcfce7', text: '#15803d', label: '✅ Completado' },
  };
  const s = map[status] || map["próximo"];
  return (
    <span style={{
      background: s.bg, color: s.text,
      fontSize: '.7rem', fontWeight: 700,
      padding: '3px 10px', borderRadius: 99,
      letterSpacing: '.03em'
    }}>
      {s.label}
    </span>
  );
}

function PeriodCard({ period, onGoStats, index }) {
  const [hovered, setHovered] = useState(false);
  const locked = period.status === "próximo";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: hovered
          ? `0 20px 60px ${period.color}22, 0 4px 16px rgba(0,0,0,.08)`
          : '0 4px 24px rgba(0,0,0,.07)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all .3s cubic-bezier(.22,.68,0,1.1)',
        animation: `fadeSlideUp .5s ${index * .1}s both`,
        opacity: locked ? .82 : 1,
      }}
    >
      {/* Header band */}
      <div style={{
        background: period.gradient,
        padding: '1.4rem 1.6rem 1.2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* dot grid */}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'radial-gradient(circle,rgba(255,255,255,.18) 1px,transparent 1px)',
          backgroundSize:'18px 18px', pointerEvents:'none'
        }}/>
        {/* blob */}
        <div style={{
          position:'absolute', width:100, height:100, borderRadius:'50%',
          background:'rgba(255,255,255,.08)', top:-40, right:-30, pointerEvents:'none'
        }}/>

        <div style={{ position:'relative', zIndex:1, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <span style={{ color:'rgba(255,255,255,.65)', fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase' }}>
              {period.dateRange}
            </span>
            <h2 style={{ fontFamily:"'Lora',serif", color:'#fff', fontSize:'1.3rem', marginTop:2, lineHeight:1.2 }}>
              {period.title}
            </h2>
          </div>
          <div style={{
            width:46, height:46, borderRadius:14, fontSize:'1.4rem',
            background:'rgba(255,255,255,.2)', backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            border:'1px solid rgba(255,255,255,.25)', flexShrink:0
          }}>
            {period.emoji}
          </div>
        </div>

        <div style={{ position:'relative', zIndex:1, marginTop:'.9rem' }}>
          <StatusBadge status={period.status} color={period.color} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:'1.4rem 1.6rem' }}>

        {/* Description */}
        <p style={{ color:'#475569', fontSize:'.875rem', lineHeight:1.65, marginBottom:'1.1rem' }}>
          {period.description}
        </p>

        {/* Topics chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:'1.2rem' }}>
          {period.topics.map(t => (
            <span key={t} style={{
              background: period.lightBg,
              color: period.color,
              fontSize:'.72rem', fontWeight:600,
              padding:'4px 10px', borderRadius:99,
              border: `1px solid ${period.color}22`
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Progress */}
        <ProgressBar total={period.activities} done={period.completed} color={period.color} />

        {/* Divider */}
        <div style={{ height:1, background:'#f1f5f9', margin:'1.2rem 0' }}/>

        {/* CTA row */}
        <div style={{ display:'flex', gap:10 }}>
          {/* Activities button */}
          <button
            disabled={locked}
            style={{
              flex:1,
              padding:'.6rem .8rem',
              background: locked ? '#f1f5f9' : period.gradient,
              color: locked ? '#94a3b8' : '#fff',
              border:'none', borderRadius:12,
              fontFamily:"'Nunito',sans-serif",
              fontWeight:700, fontSize:'.85rem',
              cursor: locked ? 'not-allowed' : 'pointer',
              transition:'opacity .2s, transform .15s',
              boxShadow: locked ? 'none' : `0 4px 14px ${period.color}44`,
            }}
            onMouseEnter={e => { if(!locked) e.currentTarget.style.transform='scale(1.02)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; }}
          >
            {locked ? '🔒 Bloqueado' : '📚 Ver Actividades'}
          </button>

          {/* Stats button */}
          <button
            onClick={() => onGoStats(period.id)}
            title="Ver estadísticas"
            style={{
              width:42, height:42, flexShrink:0,
              background: period.lightBg,
              border: `1.5px solid ${period.color}33`,
              borderRadius:12,
              color: period.color,
              fontSize:'1rem',
              cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'background .2s, transform .15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = period.color;
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = period.lightBg;
              e.currentTarget.style.color = period.color;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            📊
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Activity() {
  const navigate = useNavigate();

  const handleGoStats = (periodId) => {
    navigate(`/stats/${periodId}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin:0; padding:0; }
        body { font-family:'Nunito',sans-serif; }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        .page-anim { animation: fadeIn .5s ease both; }
      `}</style>

      <div className="page-anim" style={{
        minHeight:'100vh',
        background:'linear-gradient(145deg,#eef2ff 0%,#fdf4ef 100%)',
        fontFamily:"'Nunito',sans-serif",
        padding:'0 0 3rem',
      }}>

        {/* ── Top Nav ── */}
        <div style={{
          background:'#fff',
          boxShadow:'0 1px 12px rgba(0,0,0,.06)',
          padding:'.9rem 2rem',
          display:'flex', alignItems:'center', justifyContent:'space-between'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{
              width:34, height:34, borderRadius:10,
              background:'linear-gradient(135deg,#2558f4,#5b82f6)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#fff', fontFamily:"'Lora',serif", fontWeight:700, fontSize:'1rem'
            }}>E</div>
            <span style={{ fontFamily:"'Lora',serif", color:'#1e293b', fontSize:'1.05rem' }}>
              Englis<span style={{ color:'#2558f4' }}>hub</span>
            </span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{
              width:34, height:34, borderRadius:'50%',
              background:'linear-gradient(135deg,#2558f4,#5b82f6)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#fff', fontSize:'.85rem', fontWeight:700
            }}>D</div>
            <span style={{ fontSize:'.88rem', color:'#475569', fontWeight:600 }}>David</span>
          </div>
        </div>

        {/* ── Header ── */}
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'2.5rem 1.5rem 1.5rem' }}>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'1rem' }}>
            <div>
              <span style={{
                background:'#eef2ff', color:'#2558f4',
                fontSize:'.72rem', fontWeight:700, letterSpacing:'.1em',
                textTransform:'uppercase', padding:'4px 12px', borderRadius:99,
                border:'1px solid #c7d9ff'
              }}>
                📖 Grado Primero · Inglés
              </span>
              <h1 style={{
                fontFamily:"'Lora',serif", color:'#1e293b',
                fontSize:'clamp(1.6rem,3vw,2.1rem)', marginTop:'.6rem', lineHeight:1.2
              }}>
                Mis Períodos Académicos
              </h1>
              <p style={{ color:'#64748b', fontSize:'.9rem', marginTop:'.4rem', fontWeight:400 }}>
                Selecciona un período para explorar sus actividades y ejercicios.
              </p>
            </div>

            {/* Overall progress pill */}
            <div style={{
              background:'#fff', borderRadius:16, padding:'.8rem 1.4rem',
              boxShadow:'0 2px 12px rgba(0,0,0,.07)',
              display:'flex', alignItems:'center', gap:12, flexShrink:0
            }}>
              <div style={{
                width:42, height:42, borderRadius:'50%',
                background:'linear-gradient(135deg,#eef2ff,#dbeafe)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.3rem'
              }}>🏆</div>
              <div>
                <div style={{ fontSize:'.72rem', color:'#94a3b8', fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em' }}>
                  Progreso General
                </div>
                <div style={{ fontFamily:"'Lora',serif", fontSize:'1.25rem', color:'#1e293b', lineHeight:1 }}>
                  5 <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'.85rem', color:'#64748b', fontWeight:400 }}>/ 37 actividades</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Period Cards Grid ── */}
        <div style={{
          maxWidth:1100, margin:'0 auto', padding:'0 1.5rem',
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',
          gap:'1.4rem'
        }}>
          {periods.map((p, i) => (
            <PeriodCard
              key={p.id}
              period={p}
              onGoStats={handleGoStats}
              index={i}
            />
          ))}
        </div>

        {/* ── Info banner ── */}
        <div style={{ maxWidth:1100, margin:'2rem auto 0', padding:'0 1.5rem' }}>
          <div style={{
            background:'#fff', borderRadius:18, padding:'1rem 1.6rem',
            display:'flex', alignItems:'center', gap:12,
            boxShadow:'0 2px 12px rgba(0,0,0,.05)',
            border:'1px solid #e2e8f0'
          }}>
            <span style={{ fontSize:'1.3rem' }}>💡</span>
            <p style={{ color:'#64748b', fontSize:'.85rem', lineHeight:1.5 }}>
              Los períodos se desbloquean de forma progresiva.{' '}
              <strong style={{ color:'#2558f4' }}>Completa el período anterior</strong>{' '}
              para acceder al siguiente. Usa el botón <strong>📊</strong> para ver tus estadísticas por período.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}