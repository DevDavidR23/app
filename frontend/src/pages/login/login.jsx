import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logImg from "../../assets/login_pictures/log.png";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validar = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (name.toLowerCase() === "david" && password === "1234") {
        localStorage.setItem("user", name);
        navigate("/home");
      } else {
        setError("Usuario o contraseña incorrectos. Intenta de nuevo.");
        setLoading(false);
      }
    }, 700);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito:wght@300;400;500;600;700&display=swap');

        .font-lora  { font-family: 'Lora', serif; }
        .font-nunito { font-family: 'Nunito', sans-serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .anim-0 { animation: fadeSlideUp .5s .00s cubic-bezier(.22,.68,0,1.1) both; }
        .anim-1 { animation: fadeSlideUp .5s .10s cubic-bezier(.22,.68,0,1.1) both; }
        .anim-2 { animation: fadeSlideUp .5s .18s cubic-bezier(.22,.68,0,1.1) both; }
        .anim-3 { animation: fadeSlideUp .5s .26s cubic-bezier(.22,.68,0,1.1) both; }
        .anim-4 { animation: fadeSlideUp .5s .34s cubic-bezier(.22,.68,0,1.1) both; }
        .anim-card { animation: fadeIn .55s ease both; }

        .eng-input {
          width: 100%;
          padding: .72rem 1rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-family: 'Nunito', sans-serif;
          font-size: .95rem;
          color: #1e293b;
          background: #f8fafc;
          transition: border-color .2s, box-shadow .2s, background .2s;
          outline: none;
        }
        .eng-input:focus {
          border-color: #3b6cf8;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(59,108,248,.12);
        }
        .eng-input::placeholder { color: #94a3b8; }

        .eng-btn {
          width: 100%;
          padding: .82rem 1rem;
          background: linear-gradient(135deg, #2558f4 0%, #4f83fb 100%);
          color: #fff;
          font-family: 'Nunito', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          letter-spacing: .03em;
          transition: transform .15s, box-shadow .15s, opacity .15s;
          box-shadow: 0 4px 20px rgba(37,88,244,.32);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
        }
        .eng-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(37,88,244,.40);
        }
        .eng-btn:active:not(:disabled) { transform: translateY(0); }
        .eng-btn:disabled { opacity: .72; cursor: not-allowed; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 17px; height: 17px;
          border: 2.5px solid rgba(255,255,255,.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,.18) 1.2px, transparent 1.2px);
          background-size: 20px 20px;
        }
      `}</style>

      {/* ── Background ── */}
      <div className="font-nunito min-h-screen flex items-center justify-center p-4 sm:p-6"
           style={{ background: 'linear-gradient(145deg, #eef2ff 0%, #fdf4ef 100%)' }}>

        {/* ── Card ── */}
        <div className="anim-card bg-white rounded-3xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row"
             style={{ boxShadow: '0 24px 80px rgba(37,88,244,.11), 0 4px 18px rgba(0,0,0,.06)' }}>

          {/* ══ LEFT — Brand panel ══ */}
          <div className="relative md:w-[46%] flex-shrink-0 flex flex-col items-center justify-between overflow-hidden"
               style={{ background: 'linear-gradient(158deg, #1d40b0 0%, #2c5cf6 58%, #5b82f6 100%)', minHeight: '260px' }}>

            {/* Dot grid texture */}
            <div className="dot-grid absolute inset-0 pointer-events-none" />

            {/* Decorative blobs */}
            <div className="absolute rounded-full pointer-events-none"
                 style={{ width:210, height:210, background:'rgba(255,255,255,.09)', top:-80, right:-80 }}/>
            <div className="absolute rounded-full pointer-events-none"
                 style={{ width:130, height:130, background:'rgba(255,255,255,.07)', bottom:50, left:-55 }}/>
            <div className="absolute rounded-full pointer-events-none"
                 style={{ width:70, height:70, background:'#f97316', opacity:.22, bottom:-20, right:56 }}/>

            {/* Badge */}
            <div className="relative z-10 w-full flex justify-center pt-7 pb-1">
              <span className="text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
                    style={{ background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.25)', backdropFilter:'blur(8px)' }}>
                🌍 English Platform
              </span>
            </div>

            {/* Hero image */}
            <div className="relative z-10 flex-1 w-full flex items-center justify-center px-6 py-3">
              <img
                src={logImg}
                alt="Ilustración aprendizaje inglés"
                className="w-full object-contain drop-shadow-2xl"
                style={{ maxHeight: '260px', maxWidth: '260px' }}
              />
            </div>

            {/* Tagline */}
            <div className="relative z-10 w-full px-8 pb-8 text-center">
              <h2 className="font-lora text-white text-2xl leading-snug"
                  style={{ textShadow:'0 2px 14px rgba(0,0,30,.3)' }}>
                Learn English,<br/>unlock your world.
              </h2>
              <p className="text-blue-100 text-sm mt-2" style={{ fontWeight: 300 }}>
                Miles de estudiantes ya comenzaron.
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-4">
                <span className="inline-block h-1.5 rounded-full bg-white" style={{ width:24 }}/>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white opacity-40"/>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white opacity-40"/>
              </div>
            </div>
          </div>

          {/* ══ RIGHT — Form panel ══ */}
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 py-12">

            {/* Logo */}
            <div className="anim-0 flex items-center gap-2.5 mb-8">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl text-white font-lora font-bold text-base flex-shrink-0"
                   style={{ background:'linear-gradient(135deg,#2558f4,#5b82f6)' }}>
                E
              </div>
              <span className="font-lora text-gray-800 text-lg">
                Englis<span style={{ color:'#2558f4' }}>hub</span>
              </span>
            </div>

            {/* Heading */}
            <div className="anim-1 mb-8">
              <h1 className="font-lora text-gray-900 text-[1.85rem] leading-tight">
                ¡Bienvenido de<br/>nuevo! 👋
              </h1>
              <p className="text-gray-400 text-sm mt-2" style={{ fontWeight:300 }}>
                Ingresa tus credenciales para continuar
              </p>
            </div>

            {/* Form */}
            <form onSubmit={validar} className="space-y-5">

              <div className="anim-2">
                <label htmlFor="user" className="block text-sm font-semibold text-gray-600 mb-1.5">
                  Usuario
                </label>
                <input
                  id="user"
                  name="user"
                  type="text"
                  required
                  placeholder="Tu nombre de usuario"
                  className="eng-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="anim-2">
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="pass" className="text-sm font-semibold text-gray-600">
                    Contraseña
                  </label>
                  <button type="button"
                          className="text-xs font-semibold transition-colors"
                          style={{ color:'#2558f4' }}>
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <input
                  id="pass"
                  name="pass"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="eng-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm"
                     style={{ background:'#fff1f2', border:'1.5px solid #fecdd3', color:'#dc2626' }}>
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <div className="anim-3 pt-1">
                <button type="submit" disabled={loading} className="eng-btn">
                  {loading
                    ? <><div className="spinner"/><span>Verificando...</span></>
                    : <><span>Ingresar</span><span>→</span></>}
                </button>
              </div>
            </form>

            {/* Footer */}
            <p className="anim-4 text-center text-xs text-gray-400 mt-8">
              ¿No tienes cuenta?{' '}
              <button className="font-bold transition-colors" style={{ color:'#2558f4' }}>
                Regístrate gratis
              </button>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
