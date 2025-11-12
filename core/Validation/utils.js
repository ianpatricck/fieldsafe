/**
 * Returns 'true' if email format is valid.
 * This validation is following RFC 5322 standards.
 *
 * @param {string} email
 * @return {boolean}
 *
 */
export function email(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
