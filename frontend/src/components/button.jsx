import React from 'react';

/**
 * Botón reutilizable. Recibe `variant` para alternar estilos,
 * `type` (submit, button…) y cualquier otra prop que quieras pasar.
 */

export default function Button({
  type = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const base = 'px-4 py-2 rounded text-center transition-colors duration-200';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    // añade más variantes si lo necesitas
  };
  const cls = `${base} ${variants[variant] || ''} ${className}`;
  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>

  );
}