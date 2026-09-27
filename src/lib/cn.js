/** Joins class names, dropping falsy values. */
export const cn = (...parts) => parts.flat(Infinity).filter(Boolean).join(' ');
