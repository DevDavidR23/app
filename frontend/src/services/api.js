/**
 * Capa de servicios API.
 * Centraliza todas las llamadas al backend Express.
 * Adjunta automáticamente el token JWT a cada petición protegida.
 */

const BASE_URL = '/api';

/**
 * Helper base para fetch con JSON.
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    // Lanza el mensaje de error del backend para mostrarlo en la UI
    throw new Error(data.message || 'Error en la petición');
  }

  return data; // { success, message, data }
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email, password) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => apiFetch('/auth/me'),
};

// ─── Students ─────────────────────────────────────────────────────────────────
export const studentsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/students${query ? `?${query}` : ''}`);
  },

  getById: (id) => apiFetch(`/students/${id}`),

  create: (data) =>
    apiFetch('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiFetch(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  changePassword: (id, data) =>
    apiFetch(`/students/${id}/password`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiFetch(`/students/${id}`, {
      method: 'DELETE',
    }),
};
