/**
 * Formats a user's display name for privacy in leaderboards and public cards.
 * Returns full first name and first letter of last name with a dot.
 * Example: "Kanokpol Kulsri" -> "Kanokpol K."
 * Example: "John Doe" -> "John D."
 * Example: "Alex" -> "Alex"
 */
export function formatDisplayName(name) {
  if (!name || typeof name !== 'string') return 'Learner';
  const trimmed = name.trim();
  if (!trimmed) return 'Learner';

  const parts = trimmed.split(/\s+/);
  const rawFirst = parts[0];
  const firstName = rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1);

  if (parts.length === 1) return firstName;

  const lastPart = parts[parts.length - 1].replace(/\.+$/, '');
  const lastNameInitial = lastPart.charAt(0).toUpperCase();

  return `${firstName} ${lastNameInitial}.`;
}
