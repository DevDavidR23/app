import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentsApi } from '../../services/api.js';

const EMPTY_FORM = { name: '', email: '', password: '' };

export default function Crud() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // null | 'create' | 'edit' | 'delete' | 'password'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '' });
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await studentsApi.getAll({ page, limit: 8, search });
      setStudents(res.data.students);
      setPagination(res.data.pagination);
    } catch (e) {
      if (e.message.includes('Token') || e.message.includes('autorizado')) {
        localStorage.clear();
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  }, [page, search, navigate]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const openCreate = () => { setForm(EMPTY_FORM); setFormError(''); setModal('create'); };
  const openEdit = (s) => { setSelected(s); setForm({ name: s.name, email: s.email, password: '' }); setFormError(''); setModal('edit'); };
  const openDelete = (s) => { setSelected(s); setModal('delete'); };
  const openPassword = (s) => { setSelected(s); setPwForm({ currentPassword: '', newPassword: '' }); setFormError(''); setModal('password'); };
  const closeModal = () => { setModal(null); setSelected(null); setFormError(''); };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await studentsApi.create(form);
      showToast('Estudiante creado correctamente');
      closeModal();
      fetchStudents();
    } catch (e) { setFormError(e.message); }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await studentsApi.update(selected.id, { name: form.name, email: form.email });
      showToast('Estudiante actualizado correctamente');
      closeModal();
      fetchStudents();
    } catch (e) { setFormError(e.message); }
  };

  const handleDelete = async () => {
    try {
      await studentsApi.delete(selected.id);
      showToast('Estudiante eliminado', 'error');
      closeModal();
      fetchStudents();
    } catch (e) { showToast(e.message, 'error'); closeModal(); }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await studentsApi.changePassword(selected.id, pwForm);
      showToast('Contraseña actualizada');
      closeModal();
    } catch (e) { setFormError(e.message); }
  };

  const user = localStorage.getItem('studentName') || 'Admin';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #0f1117; }
        .crud-wrap { min-height: 100vh; background: #0f1117; color: #e2e8f0; font-family: 'Inter', sans-serif; }
        .topbar { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background: #161b27; border-bottom: 1px solid #1e293b; position: sticky; top: 0; z-index: 10; }
        .topbar-brand { display: flex; align-items: center; gap: .6rem; font-weight: 700; font-size: 1.1rem; }
        .brand-dot { width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; }
        .topbar-right { display: flex; align-items: center; gap: 1rem; }
        .user-badge { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: .3rem .9rem; font-size: .82rem; color: #94a3b8; }
        .btn-logout { background: transparent; border: 1px solid #334155; color: #94a3b8; border-radius: 8px; padding: .4rem .9rem; font-size: .82rem; cursor: pointer; transition: all .2s; }
        .btn-logout:hover { border-color: #ef4444; color: #ef4444; }
        .main { padding: 2rem; max-width: 1100px; margin: 0 auto; }
        .page-title { font-size: 1.6rem; font-weight: 700; margin-bottom: .4rem; }
        .page-sub { color: #64748b; font-size: .9rem; margin-bottom: 2rem; }
        .toolbar { display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; align-items: center; }
        .search-box { flex: 1; min-width: 200px; background: #161b27; border: 1px solid #1e293b; border-radius: 10px; padding: .6rem 1rem; color: #e2e8f0; font-size: .9rem; outline: none; transition: border .2s; }
        .search-box::placeholder { color: #475569; }
        .search-box:focus { border-color: #3b82f6; }
        .btn-primary { background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; border: none; border-radius: 10px; padding: .6rem 1.2rem; font-size: .88rem; font-weight: 600; cursor: pointer; transition: all .2s; white-space: nowrap; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,.4); }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat-card { background: #161b27; border: 1px solid #1e293b; border-radius: 14px; padding: 1.2rem 1.4rem; }
        .stat-val { font-size: 2rem; font-weight: 700; color: #3b82f6; line-height: 1; }
        .stat-label { font-size: .78rem; color: #64748b; margin-top: .3rem; }
        .table-wrap { background: #161b27; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #0f1117; color: #475569; font-size: .76rem; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; padding: .85rem 1.2rem; text-align: left; }
        td { padding: 1rem 1.2rem; border-top: 1px solid #1e293b; font-size: .88rem; vertical-align: middle; }
        tr:hover td { background: rgba(59,130,246,.04); }
        .avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,#2563eb,#7c3aed); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: .85rem; color: #fff; flex-shrink: 0; }
        .name-cell { display: flex; align-items: center; gap: .75rem; }
        .email-text { color: #64748b; font-size: .82rem; }
        .date-text { color: #475569; font-size: .8rem; }
        .actions { display: flex; gap: .4rem; }
        .btn-icon { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: .35rem .55rem; cursor: pointer; font-size: .85rem; transition: all .18s; color: #94a3b8; }
        .btn-icon:hover { background: #263048; border-color: #3b82f6; color: #3b82f6; }
        .btn-icon.danger:hover { border-color: #ef4444; color: #ef4444; background: #1c1217; }
        .btn-icon.warn:hover { border-color: #f59e0b; color: #f59e0b; }
        .pagination { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.4rem; border-top: 1px solid #1e293b; }
        .page-info { color: #64748b; font-size: .82rem; }
        .page-btns { display: flex; gap: .5rem; }
        .page-btn { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: .35rem .7rem; font-size: .82rem; color: #94a3b8; cursor: pointer; transition: all .18s; }
        .page-btn:hover:not(:disabled) { border-color: #3b82f6; color: #3b82f6; }
        .page-btn:disabled { opacity: .4; cursor: default; }
        .page-btn.active { background: #2563eb; border-color: #2563eb; color: #fff; }
        .empty { text-align: center; padding: 3rem; color: #475569; }
        .loading-row td { text-align: center; padding: 2.5rem; color: #475569; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { display: inline-block; width: 20px; height: 20px; border: 2px solid #1e293b; border-top-color: #3b82f6; border-radius: 50%; animation: spin .7s linear infinite; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .modal { background: #161b27; border: 1px solid #1e293b; border-radius: 20px; padding: 2rem; width: 100%; max-width: 440px; }
        .modal-title { font-size: 1.15rem; font-weight: 700; margin-bottom: .4rem; }
        .modal-sub { color: #64748b; font-size: .85rem; margin-bottom: 1.5rem; }
        .field { margin-bottom: 1.1rem; }
        .field label { display: block; font-size: .82rem; font-weight: 600; color: #94a3b8; margin-bottom: .4rem; }
        .field input { width: 100%; background: #0f1117; border: 1.5px solid #1e293b; border-radius: 10px; padding: .65rem 1rem; color: #e2e8f0; font-size: .9rem; outline: none; transition: border .2s; }
        .field input:focus { border-color: #3b82f6; }
        .field input::placeholder { color: #334155; }
        .form-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3); color: #f87171; border-radius: 10px; padding: .7rem 1rem; font-size: .84rem; margin-bottom: 1rem; }
        .modal-footer { display: flex; gap: .75rem; justify-content: flex-end; margin-top: 1.5rem; }
        .btn-cancel { background: #1e293b; border: 1px solid #334155; color: #94a3b8; border-radius: 10px; padding: .6rem 1.2rem; font-size: .88rem; cursor: pointer; transition: all .2s; }
        .btn-cancel:hover { border-color: #475569; color: #e2e8f0; }
        .btn-danger { background: linear-gradient(135deg,#dc2626,#ef4444); color: #fff; border: none; border-radius: 10px; padding: .6rem 1.2rem; font-size: .88rem; font-weight: 600; cursor: pointer; }
        .toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 200; background: #161b27; border: 1px solid #1e293b; border-radius: 12px; padding: .85rem 1.3rem; font-size: .88rem; box-shadow: 0 8px 30px rgba(0,0,0,.4); display: flex; align-items: center; gap: .6rem; animation: fadeSlideUp .3s ease; }
        .toast.success { border-color: rgba(34,197,94,.4); }
        .toast.error { border-color: rgba(239,68,68,.4); }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .delete-icon { font-size: 2.5rem; text-align: center; margin-bottom: .75rem; }
        .badge { display: inline-block; background: rgba(59,130,246,.15); color: #60a5fa; border-radius: 6px; padding: .15rem .5rem; font-size: .75rem; font-weight: 600; }
      `}</style>

      <div className="crud-wrap">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-brand">
            <div className="brand-dot" />
            <span>English<span style={{ color: '#3b82f6' }}>Hub</span> — Admin</span>
          </div>
          <div className="topbar-right">
            <span className="user-badge">👤 {user}</span>
            <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>

        <div className="main">
          <div className="page-title">Gestión de Estudiantes</div>
          <div className="page-sub">Administra los estudiantes de la plataforma de inglés</div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-val">{pagination.total ?? '—'}</div>
              <div className="stat-label">Total estudiantes</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">{pagination.totalPages ?? '—'}</div>
              <div className="stat-label">Páginas</div>
            </div>
            <div className="stat-card">
              <div className="stat-val" style={{ color: '#22c55e' }}>{students.length}</div>
              <div className="stat-label">En esta página</div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            <input
              className="search-box"
              placeholder="🔍  Buscar por nombre o email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
            <button className="btn-primary" onClick={openCreate}>+ Nuevo estudiante</button>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Email</th>
                  <th>Registrado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="loading-row"><td colSpan={4}><div className="spinner" /></td></tr>
                ) : students.length === 0 ? (
                  <tr><td colSpan={4} className="empty">No se encontraron estudiantes</td></tr>
                ) : students.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="name-cell">
                        <div className="avatar">{s.name.charAt(0).toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{s.name}</div>
                          <span className="badge">ID {s.id}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="email-text">{s.email}</span></td>
                    <td><span className="date-text">{new Date(s.createdAt).toLocaleDateString('es-CO')}</span></td>
                    <td>
                      <div className="actions">
                        <button className="btn-icon" title="Editar" onClick={() => openEdit(s)}>✏️</button>
                        <button className="btn-icon warn" title="Cambiar contraseña" onClick={() => openPassword(s)}>🔑</button>
                        <button className="btn-icon danger" title="Eliminar" onClick={() => openDelete(s)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pagination">
                <span className="page-info">
                  Página {pagination.page} de {pagination.totalPages} — {pagination.total} estudiantes
                </span>
                <div className="page-btns">
                  <button className="page-btn" disabled={!pagination.hasPrevPage} onClick={() => setPage(p => p - 1)}>← Ant</button>
                  <button className="page-btn" disabled={!pagination.hasNextPage} onClick={() => setPage(p => p + 1)}>Sig →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal === 'create' && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">➕ Nuevo Estudiante</div>
            <div className="modal-sub">Completa los datos para registrar un nuevo estudiante</div>
            {formError && <div className="form-error">⚠️ {formError}</div>}
            <form onSubmit={handleCreate}>
              <div className="field"><label>Nombre completo</label><input required placeholder="Ej: María García" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="field"><label>Email</label><input required type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div className="field"><label>Contraseña (mín. 6 caracteres)</label><input required type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} /></div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-primary">Crear estudiante</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modal === 'edit' && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">✏️ Editar Estudiante</div>
            <div className="modal-sub">Modificando: <strong>{selected?.name}</strong></div>
            {formError && <div className="form-error">⚠️ {formError}</div>}
            <form onSubmit={handleUpdate}>
              <div className="field"><label>Nombre completo</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="field"><label>Email</label><input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modal === 'password' && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">🔑 Cambiar Contraseña</div>
            <div className="modal-sub">Estudiante: <strong>{selected?.name}</strong></div>
            {formError && <div className="form-error">⚠️ {formError}</div>}
            <form onSubmit={handlePassword}>
              <div className="field"><label>Contraseña actual</label><input required type="password" placeholder="••••••••" value={pwForm.currentPassword} onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))} /></div>
              <div className="field"><label>Nueva contraseña</label><input required type="password" placeholder="••••••••" value={pwForm.newPassword} onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))} /></div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-primary">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modal === 'delete' && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="delete-icon">🗑️</div>
            <div className="modal-title" style={{ textAlign: 'center' }}>Eliminar Estudiante</div>
            <div className="modal-sub" style={{ textAlign: 'center' }}>
              ¿Estás seguro de eliminar a <strong>{selected?.name}</strong>? Esta acción no se puede deshacer.
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              <button className="btn-cancel" onClick={closeModal}>Cancelar</button>
              <button className="btn-danger" onClick={handleDelete}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
        </div>
      )}
    </>
  );
}