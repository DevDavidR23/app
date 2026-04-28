// Actividades organizadas por ID de período
// Agrega más períodos siguiendo la misma estructura

export const activitiesByPeriod = {
  1: [
    {
      id: 1,
      number: 1,
      topic: "Greetings & Farewells",
      topicColor: "#2558f4",
      topicBg: "#eef2ff",
      title: "Saludos y Despedidas",
      description: "Aprende a saludar y despedirte en inglés de diferentes formas.",
      emoji: "👋",
      emojiBg: "#fef9c3",
      status: "completed", // "completed" | "available" | "locked"
    },
    {
      id: 2,
      number: 2,
      topic: "Colors & Shapes",
      topicColor: "#7c3aed",
      topicBg: "#f5f3ff",
      title: "Colores y Figuras",
      description: "Identifica y nombra colores y figuras geométricas básicas.",
      emoji: "🔺",
      emojiBg: "#f0fdf4",
      status: "available",
    },
    {
      id: 3,
      number: 3,
      topic: "Numbers 1–10",
      topicColor: "#059669",
      topicBg: "#ecfdf5",
      title: "Números del 1 al 10",
      description: "Cuenta y reconoce los números del 1 al 10.",
      emoji: "🔢",
      emojiBg: "#eff6ff",
      status: "available",
    },
    {
      id: 4,
      number: 4,
      topic: "Family Members",
      topicColor: "#d97706",
      topicBg: "#fffbeb",
      title: "Mi Familia",
      description: "Identifica y nombra los miembros de la familia.",
      emoji: "👨‍👩‍👧",
      emojiBg: "#fdf4ff",
      status: "available",
    },
    {
      id: 5,
      number: 5,
      topic: "Body Parts",
      topicColor: "#0891b2",
      topicBg: "#ecfeff",
      title: "Partes del Cuerpo",
      description: "Reconoce las partes más comunes del cuerpo.",
      emoji: "🧍",
      emojiBg: "#fff7ed",
      status: "locked",
    },
    {
      id: 6,
      number: 6,
      topic: "Classroom Objects",
      topicColor: "#be185d",
      topicBg: "#fdf2f8",
      title: "Objetos del Aula",
      description: "Identifica los objetos más comunes en el salón de clases.",
      emoji: "🏫",
      emojiBg: "#f0fdf4",
      status: "locked",
    },
    {
      id: 7,
      number: 7,
      topic: "Animals & Pets",
      topicColor: "#b45309",
      topicBg: "#fefce8",
      title: "Animales y Mascotas",
      description: "Describe animales domésticos y salvajes.",
      emoji: "🐶",
      emojiBg: "#fff7ed",
      status: "locked",
    },
    {
      id: 8,
      number: 8,
      topic: "Food & Drinks",
      topicColor: "#dc2626",
      topicBg: "#fef2f2",
      title: "Alimentos y Bebidas",
      description: "Menciona alimentos y bebidas de preferencia.",
      emoji: "🍎",
      emojiBg: "#fef2f2",
      status: "locked",
    },
  ],

  2: [
    {
      id: 1,
      number: 1,
      topic: "Family Members",
      topicColor: "#059669",
      topicBg: "#ecfdf5",
      title: "Mi Familia",
      description: "Aprende a presentar y describir los miembros de tu familia.",
      emoji: "👨‍👩‍👧",
      emojiBg: "#f0fdf4",
      status: "available",
    },
    // Agrega más actividades del período 2...
  ],
};

// Habilidades que se desarrollan por período
export const skillsByPeriod = {
  1: [
    { label: "Vocabulary", color: "#2558f4", bg: "#eef2ff" },
    { label: "Speaking",   color: "#7c3aed", bg: "#f5f3ff" },
    { label: "Listening",  color: "#059669", bg: "#ecfdf5" },
    { label: "Reading",    color: "#d97706", bg: "#fffbeb" },
    { label: "Writing",    color: "#be185d", bg: "#fdf2f8" },
    { label: "Grammar",    color: "#0891b2", bg: "#ecfeff" },
  ],
  2: [
    { label: "Vocabulary", color: "#059669", bg: "#ecfdf5" },
    { label: "Speaking",   color: "#059669", bg: "#d1fae5" },
    { label: "Listening",  color: "#065f46", bg: "#ecfdf5" },
  ],
};

// Nav links del aside — mismo para todos los períodos
export const asideNavLinks = [
  { id: "actividades", label: "Actividades",  icon: "📋" },
  { id: "progreso",    label: "Progreso",     icon: "📊" },
  { id: "recursos",    label: "Recursos",     icon: "📁" },
  { id: "logros",      label: "Logros",       icon: "🏆" },
];