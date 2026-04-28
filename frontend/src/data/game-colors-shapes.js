// Patrón reutilizable: mismo formato para cualquier tema/grado
// Solo cambia este archivo para tener el mismo juego con otro contenido

export const activityMeta = {
  topic: "Colors & Shapes",
  title: "Colores y Figuras",
  emoji: "🔺",
  color: "#7c3aed",
  gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
  lightBg: "#f5f3ff",
};

// ── Juego: Selecciona el significado correcto ──────────────────────────────
// word: palabra en inglés
// correct: respuesta correcta en español
// options: todas las opciones (incluye la correcta)
export const multipleChoiceQuestions = [
  {
    id: 1,
    word: "Red",
    emoji: "🟥",
    correct: "Rojo",
    options: ["Azul", "Rojo", "Verde", "Amarillo"],
  },
  {
    id: 2,
    word: "Blue",
    emoji: "🟦",
    correct: "Azul",
    options: ["Morado", "Negro", "Azul", "Gris"],
  },
  {
    id: 3,
    word: "Circle",
    emoji: "⭕",
    correct: "Círculo",
    options: ["Triángulo", "Círculo", "Cuadrado", "Rectángulo"],
  },
  {
    id: 4,
    word: "Triangle",
    emoji: "🔺",
    correct: "Triángulo",
    options: ["Círculo", "Rombo", "Triángulo", "Estrella"],
  },
  {
    id: 5,
    word: "Yellow",
    emoji: "🟨",
    correct: "Amarillo",
    options: ["Naranja", "Amarillo", "Café", "Rosado"],
  },
];

// ── Flashcards ─────────────────────────────────────────────────────────────
// front: lo que se muestra primero (inglés)
// back: lo que se revela al voltear (español + ejemplo)
export const flashcards = [
  {
    id: 1,
    front: { word: "Red", emoji: "🟥" },
    back:  { word: "Rojo", example: "The apple is red." },
  },
  {
    id: 2,
    front: { word: "Blue", emoji: "🟦" },
    back:  { word: "Azul", example: "The sky is blue." },
  },
  {
    id: 3,
    front: { word: "Yellow", emoji: "🟨" },
    back:  { word: "Amarillo", example: "The sun is yellow." },
  },
  {
    id: 4,
    front: { word: "Circle", emoji: "⭕" },
    back:  { word: "Círculo", example: "The wheel is a circle." },
  },
  {
    id: 5,
    front: { word: "Square", emoji: "🟫" },
    back:  { word: "Cuadrado", example: "The box is a square." },
  },
  {
    id: 6,
    front: { word: "Triangle", emoji: "🔺" },
    back:  { word: "Triángulo", example: "A pizza slice is a triangle." },
  },
];